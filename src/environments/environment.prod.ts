export const environment = {
  production: false,
  baseUrl: 'https://kkwyj6emz0.execute-api.us-east-1.amazonaws.com/Prod/api/v1/',//local
  amplify: {
    Auth: {
      region: 'us-east-1',
      /* =====> PRODUCCIÓN <===== */
      userPoolId: 'us-east-1_MKbBe6D8M',
      userPoolWebClientId: '3mkjm5j3jqpd4cs8nfo0ka6gk7'
    }
  },
};
