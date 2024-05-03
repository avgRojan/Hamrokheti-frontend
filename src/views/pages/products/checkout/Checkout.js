// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Divider from '@mui/material/Divider'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiStepper from '@mui/material/Stepper'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Step Components

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'
import StepCart from "./StepCart";
import StepAddress from "./StepAddress";

const steps = [
  {
    title: 'Cart',
    icon: (
      <svg id='wizardCart' width={60} height={60} viewBox='0 0 58 54' xmlns='http://www.w3.org/2000/svg'>
        <g fillRule='nonzero'>
          <path d='M57.927 34.29V16.765a4 4 0 0 0-4-4h-4.836a.98.98 0 1 0 0 1.963h3.873a3 3 0 0 1 3 3v15.6a3 3 0 0 1-3 3H14.8a4 4 0 0 1-4-4v-14.6a3 3 0 0 1 3-3h3.873a.98.98 0 1 0 0-1.963H10.8V4.909a.98.98 0 0 0-.982-.982H7.715C7.276 2.24 5.752.982 3.927.982A3.931 3.931 0 0 0 0 4.909a3.931 3.931 0 0 0 3.927 3.927c1.825 0 3.35-1.256 3.788-2.945h1.121v38.29a.98.98 0 0 0 .982.983h6.903c-1.202.895-1.994 2.316-1.994 3.927A4.915 4.915 0 0 0 19.637 54a4.915 4.915 0 0 0 4.908-4.91c0-1.61-.79-3.03-1.994-3.926h17.734c-1.203.895-1.994 2.316-1.994 3.927A4.915 4.915 0 0 0 43.2 54a4.915 4.915 0 0 0 4.91-4.91c0-1.61-.792-3.03-1.995-3.926h5.921a.98.98 0 1 0 0-1.964H10.8v-4.91h43.127a4 4 0 0 0 4-4zm-54-27.417a1.966 1.966 0 0 1-1.963-1.964c0-1.083.88-1.964 1.963-1.964.724 0 1.35.398 1.691.982h-.709a.98.98 0 1 0 0 1.964h.709c-.34.584-.967.982-1.69.982zm15.71 45.163a2.949 2.949 0 0 1-2.946-2.945 2.949 2.949 0 0 1 2.945-2.946 2.95 2.95 0 0 1 2.946 2.946 2.949 2.949 0 0 1-2.946 2.945zm23.563 0a2.949 2.949 0 0 1-2.945-2.945 2.949 2.949 0 0 1 2.945-2.946 2.949 2.949 0 0 1 2.945 2.946 2.949 2.949 0 0 1-2.945 2.945z' />
          <path d='M33.382 27.49c7.58 0 13.745-6.165 13.745-13.745C47.127 6.165 40.961 0 33.382 0c-7.58 0-13.746 6.166-13.746 13.745 0 7.58 6.166 13.746 13.746 13.746zm0-25.526c6.497 0 11.782 5.285 11.782 11.781 0 6.497-5.285 11.782-11.782 11.782S21.6 20.242 21.6 13.745c0-6.496 5.285-11.781 11.782-11.781z' />
          <path d='M31.77 19.41c.064.052.136.083.208.117.03.015.056.039.086.05a.982.982 0 0 0 .736-.027c.049-.023.085-.066.13-.095.07-.046.145-.083.202-.149l.02-.021.001-.001.001-.002 7.832-8.812a.98.98 0 1 0-1.467-1.304l-7.222 8.126-5.16-4.3a.983.983 0 0 0-1.258 1.508l5.892 4.91z' />
        </g>
      </svg>
    )
  },
  {
    title: 'Address',
    icon: (
      <svg id='wizardCheckoutAddress' width={60} height={60} viewBox='0 0 54 54' xmlns='http://www.w3.org/2000/svg'>
        <g fillRule='nonzero'>
          <path d='M54 7.2V4a4 4 0 0 0-4-4H4a4 4 0 0 0-4 4v3.2h1.8v36H.9a.9.9 0 1 0 0 1.8h25.2v1.8c0 .042.019.08.024.12A3.596 3.596 0 0 0 23.4 50.4c0 1.985 1.615 3.6 3.6 3.6s3.6-1.615 3.6-3.6a3.596 3.596 0 0 0-2.724-3.48c.005-.04.024-.078.024-.12V45h25.2a.9.9 0 1 0 0-1.8h-.9v-36H54zM28.8 50.4c0 .993-.807 1.8-1.8 1.8s-1.8-.807-1.8-1.8.807-1.8 1.8-1.8 1.8.807 1.8 1.8zM5.4 1.8h43.2a3.6 3.6 0 0 1 3.6 3.6H1.8a3.6 3.6 0 0 1 3.6-3.6zm43 41.4H5.6a2 2 0 0 1-2-2v-32a2 2 0 0 1 2-2h42.8a2 2 0 0 1 2 2v32a2 2 0 0 1-2 2z' />
          <path d='M45 36.9H31.5a.9.9 0 1 0 0 1.8H45a.9.9 0 1 0 0-1.8zM9 32.4h9a.9.9 0 1 0 0-1.8H9a.9.9 0 1 0 0 1.8zM27 32.4h13.5a.9.9 0 1 0 0-1.8H27a.9.9 0 1 0 0 1.8zM21.861 30.861a.926.926 0 0 0-.261.639c0 .234.099.468.261.639a.946.946 0 0 0 .639.261.946.946 0 0 0 .639-.261.946.946 0 0 0 .261-.639.945.945 0 0 0-.261-.639c-.333-.333-.945-.333-1.278 0zM27 36.9H13.5a.9.9 0 1 0 0 1.8H27a.9.9 0 1 0 0-1.8zM9 38.7a.946.946 0 0 0 .639-.261.946.946 0 0 0 .261-.639.906.906 0 0 0-.261-.63c-.333-.342-.936-.342-1.278-.009a.945.945 0 0 0-.261.639c0 .234.099.468.261.639A.946.946 0 0 0 9 38.7zM44.361 30.861a.926.926 0 0 0-.261.639c0 .234.099.468.261.639A.946.946 0 0 0 45 32.4a.946.946 0 0 0 .639-.261.946.946 0 0 0 .261-.639.945.945 0 0 0-.261-.639c-.333-.333-.936-.333-1.278 0zM45 18H31.5a.9.9 0 1 0 0 1.8H45a.9.9 0 1 0 0-1.8zM45 24.3h-9a.9.9 0 1 0 0 1.8h9a.9.9 0 1 0 0-1.8zM27 26.1h1.8a.9.9 0 1 0 0-1.8H27a.9.9 0 1 0 0 1.8zM27 13.5h13.5a.9.9 0 1 0 0-1.8H27a.9.9 0 1 0 0 1.8zM45 13.5a.946.946 0 0 0 .639-.261.906.906 0 0 0 .261-.639.905.905 0 0 0-.261-.639c-.342-.333-.945-.333-1.278 0a.945.945 0 0 0-.261.639c0 .234.099.468.261.639A.946.946 0 0 0 45 13.5zM27.261 18.261A.926.926 0 0 0 27 18.9c0 .234.099.468.261.639a.946.946 0 0 0 .639.261.946.946 0 0 0 .639-.261.946.946 0 0 0 .261-.639.926.926 0 0 0-.261-.639.942.942 0 0 0-1.278 0zM31.761 24.561a.945.945 0 0 0-.261.639c0 .234.099.468.261.639a.946.946 0 0 0 .639.261.946.946 0 0 0 .639-.261.946.946 0 0 0 .261-.639.945.945 0 0 0-.261-.639c-.333-.333-.945-.333-1.278 0zM22.5 11.7H8.1v14.4h14.4V11.7zm-1.8 12.6H9.9V13.5h10.8v10.8z' />
        </g>
      </svg>
    )
  }
]

const Stepper = styled(MuiStepper)(({ theme }) => ({
  margin: 'auto',
  maxWidth: 800,
  justifyContent: 'space-around',
  '& .MuiStep-root': {
    cursor: 'pointer',
    textAlign: 'center',
    '&:not(:last-child)': {
      paddingBottom: theme.spacing(8)
    },
    '&.Mui-completed + svg': {
      color: theme.palette.primary.main
    },
    '& + svg': {
      display: 'none',
      color: theme.palette.text.disabled
    },
    '& .MuiStepLabel-label': {
      display: 'flex',
      cursor: 'pointer',
      alignItems: 'center',
      svg: {
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(0.75),
        fill: theme.palette.text.primary
      },
      '&.Mui-active, &.Mui-completed': {
        '& .MuiTypography-root': {
          color: theme.palette.primary.main
        },
        '& svg': {
          fill: theme.palette.primary.main
        }
      }
    },
    '& .step-title': {
      fontWeight: 400
    },
    [theme.breakpoints.up('md')]: {
      paddingBottom: '0 !important',
      '& + svg': {
        display: 'block'
      },
      '& .MuiStepLabel-label': {
        display: 'block'
      }
    }
  }
}))

const CheckoutWizard = () => {
  // ** States
  const [activeStep, setActiveStep] = useState(0)

  // ** Hooks & Var
  const { settings } = useSettings()
  const smallScreen = useMediaQuery(theme => theme.breakpoints.down('md'))
  const { direction } = settings

  // Handle Stepper
  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return <StepCart handleNext={handleNext} />
      case 1:
        return <StepAddress handleNext={handleNext} />
      default:
        return null
    }
  }

  const renderContent = () => {
    return getStepContent(activeStep)
  }

  return (
    <Card>
      <CardContent sx={{ py: 11.5 }}>
        <StepperWrapper>
          <Stepper
            activeStep={activeStep}
            connector={
              !smallScreen ? (
                <Icon fontSize='1.5rem' icon={direction === 'ltr' ? 'tabler:chevron-right' : 'tabler:chevron-left'} />
              ) : null
            }
          >
            {steps.map((step, index) => {
              return (
                <Step key={index} onClick={() => setActiveStep(index)} sx={{}}>
                  <StepLabel icon={<></>}>
                    {step.icon}
                    <Typography className='step-title'>{step.title}</Typography>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>

      <Divider sx={{ m: '0 !important' }} />

      <CardContent>{renderContent()}</CardContent>
    </Card>
  )
}

export default CheckoutWizard
