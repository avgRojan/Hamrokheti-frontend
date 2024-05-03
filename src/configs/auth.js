export default {
  meEndpoint: '/auth/me',
  loginEndpoint: 'customauth/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  validateToken: 'customauth/validate',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
