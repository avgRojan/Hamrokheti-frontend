// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'
// ** Config
import authConfig from 'src/configs/auth'
import {useValidatedUserQuery} from "../redux/apps/users/userApi";
import toast from "react-hot-toast";

// ** Defaults
const defaultProvider = {
  user: null,
  loading: false,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)
  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        setLoading(true)

        await axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/${authConfig.validateToken}`, {
            token: storedToken
          })
          .then(async  response => {
            if(response.data.status === "SUCCESS"){
              setLoading(false)
              setUser({ ...response?.data?.userData })
            }
            else if(response.data.status === "FAILURE"){
              localStorage.removeItem('userData')
              localStorage.removeItem('accessToken')
              setUser(null)
              setLoading(false)
              if (authConfig.onTokenExpiration === 'logout' &&!router.pathname.includes('login')) {
                router.replace('/login')
              }
            }
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params, errorCallback) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/${authConfig.loginEndpoint}`, params)
      .then(async response => {
        const {data} = response;
        setLoading(true)
        if(data.status === "SUCCESS"){
          window.localStorage.setItem(authConfig.storageTokenKeyName, data.accessToken)
          const returnUrl = router.query.returnUrl
          setUser({ ...data?.userData })
          window.localStorage.setItem('userData', JSON.stringify(data?.userData))
          setLoading(false)
          let redirectURL = returnUrl && returnUrl !== '/home' ? returnUrl : '/home'

          if (data?.userData?.user_role === 'admin'){
            redirectURL = '/admin'
          }
          router.replace(redirectURL)
        }
      })
      .catch(err => {
        console.log(err)
        if (errorCallback) errorCallback(err)
        if(err?.response?.data?.status === "FAILURE"){
          setLoading(false)
          toast.error(err?.response?.data?.message)
          router.replace('/login')

        } else{
          toast.error('SOMETHING WENT WRONG!',{
            duration:5000
          })
          setLoading(false)
          router.replace('/login')
        }

      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
