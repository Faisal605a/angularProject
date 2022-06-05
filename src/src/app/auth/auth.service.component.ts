import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {  Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponseData{
    kind : string;
    idToken : string;
    email: string;
    refreshToken: string;
    expiresIn : string;
    localId: string;
    registered?: boolean
}
@Injectable({providedIn: 'root'})
export class AuthService{
user = new BehaviorSubject<User>(new User("","","",new Date()));

    constructor(private http: HttpClient, private router: Router){}

    signup(email : String , password : String){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAXYlyyDy7VsXeRnM9Jzf0bLsljKVaKr14', 
        {
            email : email,
            password : password,
            returnSecureToken: true
        })
        .pipe(tap(resData =>{
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)}))

    }
    private handleAuthentication (email : string,userId: string, token: string, expiresIn : number){
        const expirationDate = new Date(new Date().getTime() + +expiresIn *1000);
            const user = new User(email, userId, token, expirationDate);
            // console.log("!!2"+user.email);
            this.user.next(user);
            localStorage.setItem("userData",JSON.stringify(user));

    }
    signIn(email : String , password : String){
        return this.http.post<AuthResponseData>( 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAXYlyyDy7VsXeRnM9Jzf0bLsljKVaKr14', {
            email : email,
            password : password,
            returnSecureToken: true
        })
        .pipe(tap(resData =>{
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)}))

    
        }
    autoLogin(){
        const userData: {
            email: string,
            id: string,
            _token: string
            _tokenExpirationDate : string
        } = JSON.parse(localStorage.getItem("userData")!);
        if(!userData){
            return
        }
        const loadedUser = new User(
            userData.email,
             userData.id,
             userData._token,
             new Date(userData._tokenExpirationDate))

             if(loadedUser.token){
                 this.user.next(loadedUser)
             }
    }
        singOut(){
            this.user.next(new User("","","",new Date()));
            this.router.navigate(['/auth']);    

        }
    }