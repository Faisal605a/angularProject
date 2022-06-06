import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import {  Observable } from "rxjs";
import { take, tap } from "rxjs/operators";
import { map } from "rxjs/operators" 
import { AuthService } from "./auth.service.component";

@Injectable({ providedIn :'root'})
export class AuthGuard implements CanActivate{
 

    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        return this.authService.user.pipe(
            take(1),
            map ( user =>{

            const isAuth= user.email.length>1 
            if(isAuth){
                return true;
            }
            return this.router.createUrlTree(['/auth']);
        })
        //, 
        // tap(isAuth =>{
        //     if(!isAuth){
        //         this.router.navigate(['/auth']);
        //     }
        //})
        
        )
    }
}