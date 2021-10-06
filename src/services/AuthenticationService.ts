import getService from "./Services";

export class AuthenticationService {

    public static readonly key = {}

    public login(username: string, password: string) {
        localStorage.setItem('auth', 'true');
    }

    public logout() {
        localStorage.removeItem('auth')
    }

    public isLoggedIn() {
        return localStorage.getItem('auth') != null;
    }

}