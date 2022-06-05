import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service.component";


@Component({
    selector: "app-auth",
    templateUrl: './auth.component.html'
})
export class AuthComponent{
isLoginMode = true;
isLoading = true;
error : string= "";
@ViewChild('f') ShoppingForm: NgForm | undefined;
    
    constructor(private authService : AuthService,private  router: Router){

    }
    
    onSwitchMode(){
        this.isLoginMode=!this.isLoginMode;
    }
        Submit( NgForm : NgForm){
            let Sub : Observable<AuthResponseData> ;

            if(!NgForm.valid){
                return 
            }
            const form = NgForm.value;
                this.isLoading=false
                if(!this.isLoginMode)
                    Sub= this.authService.signup(form.email, form.Password);
                
                else
                    Sub=this.authService.signIn(form.email, form.Password);

            Sub.subscribe(respnseData=>{
                console.log(respnseData);
                this.router.navigate(['/recipes'])
            }, error=>{
                console.log(error)
                this.error=error.error.error.message;
            })
           this.isLoading=true;
           NgForm.reset();

        }
}

