import "./Services";
export class AuthenticationService {
    login(username, password) {
        localStorage.setItem('auth', 'true');
    }
    logout() {
        localStorage.removeItem('auth');
    }
    isLoggedIn() {
        return localStorage.getItem('auth') != null;
    }
}
AuthenticationService.key = {};
//# sourceMappingURL=AuthenticationService.js.map