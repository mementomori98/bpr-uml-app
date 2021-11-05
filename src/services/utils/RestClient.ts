import getService from "../Services";
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
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.context.getAccessToken()}`
            },
        });
        return response.json();
    }

    public async post(path: string, body: object) {
        let response = await fetch(`${this.baseUrl}/${path}/`, {
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

    private async postData(url = '', data = {}, token: string) {
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
        return response.json();
    }

}