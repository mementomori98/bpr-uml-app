import getService from "../Services";
import { AppContext } from "./AppContext";
import "@roxi/routify/typings/runtime";
export class RestClient {
    constructor(baseUrl) {
        this.context = getService(AppContext);
        this.baseUrl = baseUrl !== null && baseUrl !== void 0 ? baseUrl : '';
    }
    async get(path) {
        let response = await fetch(`${this.baseUrl}/${path}`, {
            headers: {
                'Authorization': `Bearer ${this.context.getAccessToken()}`
            }
        });
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
        return response.json();
    }
}
//# sourceMappingURL=RestClient.js.map