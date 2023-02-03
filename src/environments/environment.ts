// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://kkwyj6emz0.execute-api.us-east-1.amazonaws.com/Prod/api/v1/',//api
  // baseUrl: 'https://localhost:55084/api/v1/',//local
  amplify: {
    Auth: {
      region: 'us-east-1',
      /* =====> PRODUCCIÓN <===== */
      userPoolId: 'us-east-1_MKbBe6D8M',
      userPoolWebClientId: '1l1pbstd84fdhe8uro6u93qvvj'
    }
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
