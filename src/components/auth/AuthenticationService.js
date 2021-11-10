import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import getService from "../utils/ServiceFactory";
import { AppContext } from "../utils/AppContext";
import { RestClient } from "../utils/RestClient";
export class AuthenticationService {
    constructor() {
        this.auth = getAuth();
        this.context = getService(AppContext);
        this.client = getService(RestClient);
    }
    async login(username, password) {
        try {
            let res = await signInWithEmailAndPassword(this.auth, username, password);
            this.context.setAccessToken(await res.user.getIdToken());
            await this.client.post('users', {});
        }
        catch (err) {
            throw err;
        }
    }
    async loginGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            let res = await signInWithPopup(this.auth, provider);
            this.context.setAccessToken(await res.user.getIdToken());
            await this.client.post('users', {});
        }
        catch (err) {
            throw err;
        }
    }
    logout() {
        this.context.setAccessToken(null);
    }
    isLoggedIn() {
        return this.context.getAccessToken() != null;
    }
}
//# sourceMappingURL=AuthenticationService.js.map