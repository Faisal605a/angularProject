
export class AuthServiceComponent{




    private handleAuthentication(
        email: string,
        userId: string ,
        token: string,
        expiresIn: number
    )  {
        const expriationDate = new Date(new Date().getTime() + expiresIn * 1000 );
        const user = new User(email, userId, token, expriationDate);
        this.user.next(user);
    }


}