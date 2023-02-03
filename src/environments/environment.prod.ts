export const environment = {
  production: true,
  baseUrl: 'https://kkwyj6emz0.execute-api.us-east-1.amazonaws.com/Prod/api/v1/',//local
  amplify: {
    Auth: {
      region: 'us-east-1',
      /* =====> PRODUCCIÓN <===== */
      userPoolId: 'us-east-1_MKbBe6D8M',
      userPoolWebClientId: '1l1pbstd84fdhe8uro6u93qvvj'
    }
  },
};
