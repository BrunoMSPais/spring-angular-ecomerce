import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpInterceptor,
} from '@angular/common/http';
import OktaAuth from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';
import { Inject, Injectable } from '@angular/core';
import { Observable, from, lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Promise<HttpEvent<any>> {
    // Only add an access token for secured endpoints
    const theEndPoint = environment.luv2shopApiUrl + '/orders';
    console.log('theEndPoint: ' + theEndPoint);
    const securedEndpoints = [theEndPoint];

    if (securedEndpoints.some((url) => request.urlWithParams.includes(url))) {
      // get the access token
      const accessToken = this.oktaAuth.getAccessToken();

      // clone the request and add new header with access token
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
    }

    return await lastValueFrom(next.handle(request));
  }
}
