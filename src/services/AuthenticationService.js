import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import getService from "./Services";
import { AppContext } from "./utils/AppContext";
export class AuthenticationService {
    constructor() {
        this.auth = getAuth();
        this.context = getService(AppContext);
    }
    async login(username, password) {
        try {
            let res = await signInWithEmailAndPassword(this.auth, username, password);
            this.context.accessToken = await res.user.getIdToken();
        }
        catch (err) {
            throw err;
        }
    }
    async loginGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            let res = await signInWithPopup(this.auth, provider);
            this.context.accessToken = await res.user.getIdToken();
        }
        catch (err) {
            throw err;
        }
    }
    logout() {
        this.context.accessToken = null;
    }
    isLoggedIn() {
        return this.context.accessToken != null;
    }
}
//# sourceMappingURL=AuthenticationService.js.map