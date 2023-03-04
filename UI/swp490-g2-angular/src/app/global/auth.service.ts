import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { User, Client, AuthenticationRequest } from '../ngswag/client';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private _currentUser?: User;

  constructor(private $client: Client, private $router: Router) {}

  getCurrentUser(): Observable<User | undefined> {
    if (this._currentUser) return of(this._currentUser);

    return this.$client.getCurrentUser().pipe(
      switchMap((user) => {
        this._currentUser = user;
        return of(user);
      }),
      catchError(() => {
        this.logout(false);
        return of();
      })
    );
  }

  login(request: { email: string; password: string }) {
    return this.$client
      .login(
        new AuthenticationRequest({
          email: request.email,
          password: request.password,
        })
      )
      .pipe(
        switchMap((response) => {
          if (response.token) {
            localStorage.setItem(this.JWT_TOKEN, response.token);
          }
          return this.getCurrentUser();
        })
      );
  }

  logout(forceNavigate = true) {
    this._currentUser = undefined;
    localStorage.removeItem(this.JWT_TOKEN);

    if (forceNavigate) this.$router.navigate(['auth', 'login']);
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }
}
