import { useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from "react-hot-toast";

const useToast = ({isSuccess, isError, data, error, reset, handleDialog, redirectUrl}) => {
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      toast(data?.message, {icon: '✅'});
      if(reset){
        reset();
      }
      if(redirectUrl){
        router.push(redirectUrl);
      }
      if(handleDialog){
        handleDialog(false)
      }
    }
    if (isError) {
      toast.error(error?.data?.message, {icon: '‼️', style:{color: 'red'} });
    }
  }, [isSuccess, isError]);
};

export default useToast;
