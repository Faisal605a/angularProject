import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponseData{
    kind : String;
    idToken : String;
    email: String;
    refreshToken: String;
    expiresIn : String;
    localId: String;
    registered?: boolean
}
@Injectable({providedIn: 'root'})
export class AuthService{
user = new BehaviorSubject<User>(new User("","","",new Date()));

    constructor(private http: HttpClient){}

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
    private handleAuthentication (email : String,userId: String, token: String, expiresIn : number){
        const expirationDate = new Date(new Date().getTime() + +expiresIn *1000);
            const user = new User(email, userId, token, expirationDate);
            this.user.next(user);

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
}