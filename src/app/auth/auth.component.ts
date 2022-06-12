import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { alertComponent } from "../Shared/alert/alert.component";
import { PlaceholderDirective } from "../Shared/PlaceHolder/PlaceHolder.component";
import { AuthResponseData, AuthService } from "./auth.service.component";


@Component({
    selector: "app-auth",
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
isLoginMode = true;
isLoading = true;
error : string= "";
    @ViewChild(PlaceholderDirective, { static: false })
    alertHost!: PlaceholderDirective;

   // private closeSub: Subscription = new Subscription;

    
    constructor(
        private authService : AuthService,
        private  router: Router,
        private componentFactoryResolver: ComponentFactoryResolver){

    }
    ngOnDestroy(): void {
        // if(this.closeSub){
        //     this.closeSub.unsubscribe();
            
        // }

    }
    
    onHandelError(){
        this.error="";
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
                //this.showErrorAlert(error.error.error.message);
                this.error=error.error.error.message;
            })
           
           this.isLoading=true;
           NgForm.reset();

        }

        // private showErrorAlert(message: string){
        //     const alertcompFactory=this.componentFactoryResolver.resolveComponentFactory(alertComponent);

        //     const hostviewContinerRef =this.alertHost?.viewContinerRef;
        //     hostviewContinerRef?.clear();

        //    const alertRef= hostviewContinerRef?.createComponent (alertcompFactory);
        //    alertRef.instance.message =message;
        //    this.closeSub=alertRef.instance.close.subscribe(() => {
        //         this.closeSub.unsubscribe();
        //         hostviewContinerRef.clear();
        //    });
       
        // }
}

