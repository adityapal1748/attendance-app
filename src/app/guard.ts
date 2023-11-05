import { Injectable } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class CanActivateGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
       let a =  localStorage.getItem('username')
       if(!!a){         //checking if user is logged in
        return true
       }else{
           return false
       }
    }
}