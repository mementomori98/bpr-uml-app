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
//# sourceMappingURL=AuthenticationService.js.map