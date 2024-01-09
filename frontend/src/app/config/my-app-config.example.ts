export default {
  oidc: {
    clientId: '', // client id from okta
    issuer: 'https://{client_domain}/oauth2/default', // issuer from okta ('https://' + client_domain + '/oauth2/default')
    redirectUri: 'ghttp://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email'],
  },
};
