import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth, { Tokens } from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';
import { AuthClientConfig, AuthService } from '@auth0/auth0-angular';

import myAppConfig from '../../config/my-app-config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  // oktaSignIn: any;
  costumeSingIn: any;

  // constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
  //   this.oktaSignIn = new OktaSignIn({
  //     logo: 'assets/images/logo.png',
  //     baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
  //     // baseUrl: myAppConfig.oidc.issuer.split('/authorize')[0],
  //     clientId: myAppConfig.oidc.clientId,
  //     redirectUri: myAppConfig.oidc.redirectUri,
  //     authParams: {
  //       pkce: true,
  //       issuer: myAppConfig.oidc.issuer,
  //       scopes: myAppConfig.oidc.scopes,
  //       // devMode: true,
  //       headers: {
  //         'Access-Control-Allow-Origin': '*',
  //       },
  //     },
  //   });
  // }

  // ngOnInit(): void {
  //   console.log('login.component.ts ngOnInit() - oktaSignIn:', this.oktaSignIn);
  //   this.oktaSignIn.remove();
  //   this.oktaSignIn.renderEl(
  //     {
  //       el: '#okta-sign-in-widget', // this name should be the same as div tag id in login.component.html
  //     },
  //     (response: any) => {
  //       if (response.status === 'SUCCESS') {
  //         this.oktaAuth.signInWithRedirect();
  //       }
  //     },
  //     (error: any) => {
  //       console.log('login.component.ts ngOnInit() - error:', error);
  //       throw error;
  //     }
  //   );
  // }

  /** The commented code above produces a cors error for the oktaAuth.signInWithRedirect() method */

  /** The following code works but uses default widget */
  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.loginWithRedirect();
  }
}
