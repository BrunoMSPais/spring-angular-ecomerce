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
  isAuthenticated: boolean | undefined = false;
  userFullName: string | null = null;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(
      (isAuthenticated) => (this.isAuthenticated = isAuthenticated)
    );
    this.getUserDetails();
  }

  getUserDetails() {
    if (this.isAuthenticated) {
      this.auth.user$.subscribe(
        (user) => (this.userFullName = user?.name as string)
      );
    }
  }

  logout() {
    this.auth.logout();
  }
}
