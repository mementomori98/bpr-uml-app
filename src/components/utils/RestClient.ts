import getService from "./ServiceFactory";
import {AppContext} from "./AppContext";
import {context} from "@roxi/routify/typings/runtime";
import {goto} from "@roxi/routify";

export class RestClient {

    private readonly context = getService(AppContext);

    private baseUrl: string;

    constructor(baseUrl?: string) {
        this.baseUrl = baseUrl ?? '';
    }

    public async get(path: string) {
        console.log("heyyy")
        let response = await fetch(`${this.baseUrl}/${path}`, {
            headers: {
                'Authorization': `Bearer ${this.context.getAccessToken()}`
            }
        });
        console.log(response);
        if(response.status == 401) {
            $goto('/login')
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

}