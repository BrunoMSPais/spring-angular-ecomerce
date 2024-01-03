import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css',
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean = false;
  userFullName: string | null = null;

  storage: Storage = sessionStorage;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      this.getUserDetails();
    });
  }

  getUserDetails() {
    this.auth.user$.subscribe((res) => {
      // Fetch the logged in user details (user's claims)
      this.userFullName = res?.name as string;

      // retrieve the user's email from authentication response
      const theEmail: string = res?.email as string;

      // store the user's email in browser's local storage
      this.storage.setItem('userEmail', JSON.stringify(theEmail));
    });
  }

  logout() {
    this.auth.logout();
  }
}
