// ** MUI Imports
import Box from '@mui/material/Box'

// ** Third Party Components
import { useKeenSlider } from 'keen-slider/react'

const HomeSlider = ({ direction }) => {
  // ** Hook
  const [ref] = useKeenSlider({
    rtl: direction === 'rtl',
    slides: {
      perView: 1,
      spacing: 2
    }
  })

  return (
    <Box ref={ref} className='keen-slider'>
      <Box className='keen-slider__slide'>
        <img src='/images/register-bg.png' alt='swiper 16' />
      </Box>
      <Box className='keen-slider__slide'>
        <img src='/images/register-bg.png' alt='swiper 16'/>
      </Box>
      <Box className='keen-slider__slide'>
        <img src='/images/register-bg.png' alt='swiper 16'/>
      </Box>
      <Box className='keen-slider__slide'>
        <img src='/images/register-bg.png' alt='swiper 16'/>
      </Box>
      <Box className='keen-slider__slide'>
        <img src='/images/register-bg.png' alt='swiper 16'/>
      </Box>
    </Box>
  )
}

export default HomeSlider
