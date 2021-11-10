
import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import getService from "../../refactor/utils/ServiceFactory";
import {AppContext} from "../../refactor/utils/AppContext";
import {RestClient} from "../../refactor/utils/RestClient";


export class AuthenticationService {

    private readonly auth = getAuth();
    private readonly context = getService(AppContext);
    private readonly client = getService(RestClient);

    public async login(username: string, password: string) {
        try {
            let res = await signInWithEmailAndPassword(this.auth, username, password);
            this.context.setAccessToken(await res.user.getIdToken());
            await this.client.post('users', {});
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
            await this.client.post('users', {});
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