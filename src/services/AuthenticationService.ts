export class AuthenticationService {

    private loggedIn: boolean = true;

    public login(username: string, password: string) {
        this.loggedIn = true;
    }

    public logout() {
        this.loggedIn = false;
    }

    public isLoggedIn() {
        return this.loggedIn;
    }

}