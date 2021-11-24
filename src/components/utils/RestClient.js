import getService from "./ServiceFactory";
import { AppContext } from "./AppContext";
import "@roxi/routify/typings/runtime";
import { throwError } from "svelte-preprocess/dist/modules/errors";
import { redirectUrl } from "./redirectStore";
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
        if (response.status == 401) {
            redirectUrl.set('/login');
            return;
        }
        if (response.status == 500) {
            console.log("RestClient-get failed with 500");
            throwError("Failed on get request: 500");
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
            redirectUrl.set('/login');
            return;
        }
        return response.json();
    }
    async put(path, body) {
        let response = await fetch(`${this.baseUrl}/${path}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${this.context.getAccessToken()}`
            },
            body: JSON.stringify(body)
        });
        if (response.status == 401) {
            redirectUrl.set('/login');
            return;
        }
        return response.json();
    }
}
//# sourceMappingURL=RestClient.js.map