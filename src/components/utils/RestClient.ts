import getService from "./ServiceFactory";
import {AppContext} from "./AppContext";
import {context} from "@roxi/routify/typings/runtime";
import {throwError} from "svelte-preprocess/dist/modules/errors";
import {redirectUrl} from "./redirectStore";

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
        if(response.status == 401) {
            redirectUrl.set('/login');
            return;
        }

        if(response.status == 500) {
            console.log("RestClient-get failed with 500")
            throwError("Failed on get request: 500")
            return;
        }

        return response.json();
    }

    public async delete(path: string) {
        let response = await fetch(`${this.baseUrl}/${path}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${this.context.getAccessToken()}`
            }
        });

        return response.json();
    }

    public async deleteByObj(path: string, body: object) {
        let response = await fetch(`${this.baseUrl}/${path}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.context.getAccessToken()}`
            },
            body: JSON.stringify(body)
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
        if(response.status == 401) {
            redirectUrl.set('/login');
            return;
        }
        return response.json();
    }

    public async put(path: string, body: object) {
        let response = await fetch(`${this.baseUrl}/${path}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${this.context.getAccessToken()}`
            },
            body: JSON.stringify(body)
        });
        if(response.status == 401) {
            redirectUrl.set('/login');
            return;
        }
        return response.json();
    }

}