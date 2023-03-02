import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Client } from "../ngswag/client";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate
{
    constructor(
        private $client: Client,
        private $auth: AuthService,
        private $router: Router,
    )
    { }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
    {
        const isAuthenticated = this.$auth.isLoggedIn();
        if (!isAuthenticated)
        {
            this.$router.navigate([""]);
        }

        return isAuthenticated;
    }

}
