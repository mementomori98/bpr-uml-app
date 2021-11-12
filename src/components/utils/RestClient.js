import getService from "./ServiceFactory";
import { AppContext } from "./AppContext";
import "@roxi/routify/typings/runtime";
import "@roxi/routify";
export class RestClient {
    constructor(baseUrl) {
        this.context = getService(AppContext);
        this.baseUrl = baseUrl !== null && baseUrl !== void 0 ? baseUrl : '';
    }
    async get(path) {
        console.log("heyyy");
        let response = await fetch(`${this.baseUrl}/${path}`, {
            headers: {
                'Authorization': `Bearer ${this.context.getAccessToken()}`
            }
        });
        console.log(response);
        if (response.status == 401) {
            $goto('/login');
            return;
        }
        return response.json();
    }
    async post(path, body) {
        let response = await fetch(`${this.baseUrl}/${path}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.context.getAccessToken()}`
            },
            body: JSON.stringify(body)
        });
        if (response.status == 401) {
            $goto('/login');
            return;
        }
        return response.json();
    }
}
//# sourceMappingURL=RestClient.js.map