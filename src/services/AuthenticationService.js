export class AuthenticationService {
    constructor() {
        this.loggedIn = true;
    }
    login(username, password) {
        this.loggedIn = true;
    }
    logout() {
        this.loggedIn = false;
    }
    isLoggedIn() {
        return this.loggedIn;
    }
}
//# sourceMappingURL=AuthenticationService.js.map