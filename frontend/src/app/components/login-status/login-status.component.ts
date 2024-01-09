import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css',
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean = false;
  userFullName: string = '';

  storage: Storage = sessionStorage;

  constructor(
    private oktaAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
  ) {}

  ngOnInit(): void {
    // Subscribe to authentication state changes
    this.oktaAuthService.authState$.subscribe((result) => {
      this.isAuthenticated = result.isAuthenticated!;
      this.getUserDetails();
    });
  }

  getUserDetails() {
    if (this.isAuthenticated) {
      this.oktaAuth.getUser().then((res) => {
        // Fetch the logged in user details (user's claims)
        this.userFullName = res.name!;

        // retrieve the user's email from authentication response
        const theEmail: string = res.email!;

        // store the user's email in browser's local storage
        this.storage.setItem('userEmail', JSON.stringify(theEmail));
      });
    }
  }

  logout() {
    // Terminates the session with Okta and removes current tokens.
    this.oktaAuth.signOut();
  }
}
