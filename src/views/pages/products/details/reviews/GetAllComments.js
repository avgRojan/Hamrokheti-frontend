import {useGetAllCommentsQuery} from "../../../../../redux/apps/products/api";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useAuth} from "../../../../../hooks/useAuth";
import Collapse from "@mui/material/Collapse";
import {useState} from "react";
import CreateCommentReplies from "./CreateCommentReplies";
import Badge from "@mui/material/Badge";
import {Pagination} from "@mui/lab";

const GetAllComments= () => {
  const {data, isLoading} = useGetAllCommentsQuery()
  const {user} = useAuth()
  const [expanded, setExpanded] = useState({});
  const [replyExpanded, setReplyExpanded] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 2

  const handleExpand = (commentId) => {
    setExpanded(prevExpanded => ({
      ...prevExpanded,
      [commentId]: !prevExpanded[commentId]
    }));
  };

  const handleReplyExpand = (commentId) => {
    setReplyExpanded(prevExpanded => ({
      ...prevExpanded,
      [commentId]: !prevExpanded[commentId]
    }));
  };


  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = data?.slice(indexOfFirstComment, indexOfLastComment);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
     <Card>
       <CardHeader title={<Typography variant={'h5'}>All Comments...</Typography>} />
       <CardContent>
         {currentComments?.length > 0 ? currentComments?.map(comment => (
           <Card key={comment.id} style={{ marginBottom: '15px' }}>
             <CardContent>
               <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                 <Avatar alt={comment.username} src={comment.profile_image} />
                 <Typography variant="subtitle1" style={{ marginLeft: '10px' }}>
                   {comment.username}
                 </Typography>
               </div>
               <Box sx={{
                 display: 'flex',
                 justifyContent: 'space-between'
               }}>
                 <Typography variant="body1">
                   {comment.text}
                 </Typography>
                 <Box sx={{
                   gap: 4,
                   display: 'flex',
                   alignItems: 'center'
                 }}>
                     <Button
                       sx={{
                         position: 'relative'
                       }}
                       onClick={() => handleExpand(comment.id)}
                       variant="outlined"
                       size="small"
                       color="primary">
                       {expanded[comment.id] ? 'Hide Replies' : 'View Replies'}
                       <Badge
                         color="secondary"
                         badgeContent={comment?.replies?.length}
                         style={{
                           position: 'absolute',
                           top: '-1px',
                           right: '-3px'
                         }} />
                     </Button>
                   {comment?.farmer === user?.username &&
                     <Button
                       onClick={() => handleReplyExpand(comment.id)}
                       variant="outlined"
                       size="small"
                       color="primary">
                       {replyExpanded[comment.id] ? 'Hide Reply' : 'Reply'}

                     </Button>}
                 </Box>

               </Box>
               <Typography variant="caption" color="textSecondary">
                 {dayjs(comment.created_at).format('YYYY-MM-DD hh:mm:ss A')}
               </Typography>

               <Collapse in={expanded[comment.id]} timeout="auto" unmountOnExit>
                 <div style={{ marginTop: '10px' }}>
                   {comment?.replies?.map(reply => (
                     <div key={reply.id} style={{ marginBottom: '10px' }}>
                       <div style={{ display: 'flex', alignItems: 'center' }}>
                         <Avatar alt={reply.username} src={reply?.profile_image} />
                         <Typography variant="subtitle2" style={{ marginLeft: '10px' }}>
                           {reply?.username}
                         </Typography>
                       </div>
                       <Typography variant="body2" style={{ marginLeft: '40px', fontSize:14}}>
                         {reply?.text}
                       </Typography>
                       <Typography variant="caption" color="textSecondary" style={{ marginLeft: '40px' }}>
                         {dayjs(reply.created_at).format('YYYY-MM-DD HH:mm:ss A')}
                       </Typography>
                     </div>
                   ))}
                 </div>
               </Collapse>

               <Collapse in={replyExpanded[comment.id]} timeout="auto" unmountOnExit>
                 <div style={{ marginTop: '10px' }}>
                      <CreateCommentReplies comment={comment.id} />
                 </div>
               </Collapse>
             </CardContent>
           </Card>
         ))
         : <Typography>No Comments</Typography>
         }
         <Box sx={{
           display: 'flex',
           justifyContent: 'center',
           marginTop: '20px'
         }}>
           <Pagination
             count={Math.ceil(data?.length / commentsPerPage)}
             variant="outlined"
             shape="rounded"
             onChange={(event, page) => paginate(page)}
           />
         </Box>

       </CardContent>
     </Card>
    </>
  );
}

export default GetAllComments;
