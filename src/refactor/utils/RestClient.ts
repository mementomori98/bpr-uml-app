import getService from "./Services";
import {AppContext} from "./AppContext";
import {context} from "@roxi/routify/typings/runtime";

export class RestClient {

    private readonly context = getService(AppContext);

    private baseUrl: string;

    constructor(baseUrl?: string) {
        this.baseUrl = baseUrl ?? '';
    }

    public async get(path: string) {
        let response = await fetch(`${this.baseUrl}/${path}`, {
            headers: {
                'Authorization': `Bearer ${this.context.getAccessToken()}`
            }
        });
        return response.json();
    }

    public async post(path: string, body: object) {
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