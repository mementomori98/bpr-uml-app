
import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import getService from "./Services";
import {AppContext} from "./utils/AppContext";

export class AuthenticationService {

    private readonly auth = getAuth();
    private readonly context = getService(AppContext);

    public async login(username: string, password: string) {
        try {
            let res = await signInWithEmailAndPassword(this.auth, username, password);
            this.context.setAccessToken(await res.user.getIdToken());
        }
        catch (err) {
            throw err;
        }
    }

    public async loginGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            let res = await signInWithPopup(this.auth, provider)
            this.context.setAccessToken(await res.user.getIdToken());
        } catch (err) {
            throw err;
        }
    }

    public logout() {
        this.context.setAccessToken(null);
    }

    public isLoggedIn() {
        return this.context.getAccessToken() != null;
    }

}