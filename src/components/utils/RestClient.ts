import getService from "./ServiceFactory";
import {AppContext} from "./AppContext";
import {context} from "@roxi/routify/typings/runtime";
import {goto} from "@roxi/routify";
import {throwError} from "svelte-preprocess/dist/modules/errors";

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
            console.log("RestClient-get failed with 401")
            throwError("Failed on get request: 401")
            return;
        }

        if(response.status == 500) {
            console.log("RestClient-get failed with 500")
            throwError("Failed on get request: 500")
            return;
        }

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
            $goto('/login')
            return;
        }
        return response.json();
    }

    public async put(path: string, body: object) {
        let response = await fetch(`${this.baseUrl}/${path}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.context.getAccessToken()}`
            },
            body: JSON.stringify(body)
        });
        if(response.status == 401) {
            $goto('/login')
            return;
        }
        return response.json();
    }

}