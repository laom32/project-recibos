import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import Auth from '@aws-amplify/auth';

if (environment.production) {
  enableProdMode();
}

Auth.configure({
  region:environment.amplify.Auth.region,
   identityPoolRegion:environment.amplify.Auth.region,
   userPoolId:environment.amplify.Auth.userPoolId,
   userPoolWebClientId:environment.amplify.Auth.userPoolWebClientId,
 //  authenticationFlowType: environment.amplify.Auth.authenticationFlowType
});

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
