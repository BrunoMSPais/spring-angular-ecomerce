export default {
  oidc: {
    clientId: '', // client id from okta
    issuer: 'https://.../oauth2/default', // issuer from okta
    redirectUri: 'ghttp://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email'],
  },
};
