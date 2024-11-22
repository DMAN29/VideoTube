import { NgModule, Inject, PLATFORM_ID } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';
import { isPlatformBrowser } from '@angular/common';

@NgModule({
    imports: [
        AuthModule.forRoot({
            config: {
                authority: 'https://dev-qo7th3db6kbw44xj.us.auth0.com',
                redirectUrl: isPlatformBrowser(PLATFORM_ID) ? window.location.origin : 'http://localhost:4200'
,
                clientId: '4wj06aO5AnlFAH8dRRQsyIYAdgFv3q52',
                scope: 'openid profile offline_access',
                responseType: 'code',
                silentRenew: true,
                useRefreshToken: true,
            }
        })
    ],
    exports: [AuthModule],
})
export class AuthConfigModule {}
