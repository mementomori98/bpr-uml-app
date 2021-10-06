import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
export class AuthenticationService {
    constructor() {
        this.auth = getAuth();
        this.tokenName = 'accessToken';
    }
    async login(username, password) {
        try {
            let res = await signInWithEmailAndPassword(this.auth, username, password);
            localStorage.setItem(this.tokenName, await res.user.getIdToken());
        }
        catch (err) {
            throw err;
        }
    }
    async loginGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            let res = await signInWithPopup(this.auth, provider);
            localStorage.setItem(this.tokenName, await res.user.getIdToken());
        }
        catch (err) {
            throw err;
        }
    }
    logout() {
        localStorage.removeItem(this.tokenName);
    }
    isLoggedIn() {
        return localStorage.getItem(this.tokenName) != null;
    }
}
//# sourceMappingURL=AuthenticationService.js.map