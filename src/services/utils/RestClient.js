import getService from "../Services";
import { AppContext } from "./AppContext";
import "@roxi/routify/typings/runtime";
export class RestClient {
    constructor(baseUrl) {
        this.context = getService(AppContext);
        this.baseUrl = baseUrl !== null && baseUrl !== void 0 ? baseUrl : '';
    }
    async get(path) {
        let response = await fetch(`${this.baseUrl}/${path}`);
        return response.json();
    }
    async post(path, body) {
        let response = await fetch(`${this.baseUrl}/${path}`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.context.getAccessToken()}`
            },
            body: JSON.stringify(body)
        });
        return response.text();
    }
    async postData(url = '', data = {}, token) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.context.getAccessToken()}`
            }, body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.text(); // parses JSON response into native JavaScript objects
    }
}
//# sourceMappingURL=RestClient.js.map