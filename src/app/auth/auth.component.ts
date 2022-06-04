import { Component } from "@angular/core";


@Component({
    selector: 'app-auth',
    templateUrl : './auth.component.html'
})
export class AuthComponent{
    isLoginMode = true;
    isLoading = false;
    error = null;
}