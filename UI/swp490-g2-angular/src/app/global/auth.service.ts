import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { User, Client, AuthenticationRequest } from "../ngswag/client";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly JWT_TOKEN = "JWT_TOKEN";
  private _currentUser?: User;

  constructor(private $client: Client, private $router: Router) {}

  getCurrentUser(forceRefresh = false): Observable<User | undefined> {
    if (!forceRefresh && this._currentUser) return of(this._currentUser);

    return this.$client.getCurrentUser().pipe(
      switchMap((user) => {
        if (!user || !user.id) {
          this.logout(false);
          return of();
        }

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
          if (response.errorMessage) {
            throw new Error(response.errorMessage);
          }

          if (response.token) {
            localStorage.setItem(this.JWT_TOKEN, response.token);
          }

          return of(response);
        })
      );
  }

  logout(forceNavigateToLogin = true) {
    this._currentUser = undefined;
    localStorage.removeItem(this.JWT_TOKEN);

    if (forceNavigateToLogin) this.$router.navigate(["auth", "login"]);
    else this.$router.navigate([""]);
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }
}
