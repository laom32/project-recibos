export const environment = {
  production: true,
  baseUrl: 'https://kkwyj6emz0.execute-api.us-east-1.amazonaws.com/Prod/api/v1/',//local
  amplify: {
    Auth: {
      region: 'us-east-1',
      /* =====> PRODUCCIÓN <===== */
      userPoolId: '',
      userPoolWebClientId: ''
    }
  },
};
