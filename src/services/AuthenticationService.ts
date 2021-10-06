
import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";

export class AuthenticationService {

    private auth = getAuth();
    private tokenName = 'accessToken';

    public async login(username: string, password: string) {
        try {
            let res = await signInWithEmailAndPassword(this.auth, username, password);
            localStorage.setItem(this.tokenName, await res.user.getIdToken())
        }
        catch (err) {
            throw err;
        }
    }

    public async loginGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            let res = await signInWithPopup(this.auth, provider)
            localStorage.setItem(this.tokenName, await res.user.getIdToken());
        } catch (err) {
            throw err;
        }
    }

    public logout() {
        localStorage.removeItem(this.tokenName)
    }

    public isLoggedIn() {
        return localStorage.getItem(this.tokenName) != null;
    }

}