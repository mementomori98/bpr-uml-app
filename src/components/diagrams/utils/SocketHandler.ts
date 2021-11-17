import {io} from "socket.io-client";
import getService from "../../utils/ServiceFactory";
import {AppContext} from "../../utils/AppContext";
import type {Representation} from "./Models";
import {CreateModelRequest} from "./Models";

export class SocketHandler {

    private readonly appContext = getService(AppContext);

    private socket;

    private addListener<T>(eventName: string, callback: (t: T) => void) {
        this.socket.on(eventName, e => callback(JSON.parse(e)));
    }

    public connect() {
        // @ts-ignore
        this.socket = io.connect('https://bpr-uml-socket-server.herokuapp.com/', {
            extraHeaders: {
                Authorization: `Bearer ${this.appContext.getAccessToken()}`
            }
        });
    }

    public addConnectionResponseListener(callback: () => void) {
        this.addListener<ConnectionResponse>('connection_response', x => callback());
    }

    public addDiagramJoinedListener(callback: (content: Array<Representation<any, any>>) => void) {
        this.addListener<Array<Representation<any, any>>>('all_diagram_models', callback);
    }

    public addUserJoinedListener(callback: (user: UserResponse) => void) {
        this.addListener<UserResponse>('user_joined', callback);
    }

    public addDiagramNotFoundListener(callback: () => void) {
        this.addListener<any>('diagram_not_found', x => callback());
    }

    public addModelCreatedListener(callback: (representation: Representation<any, any>) => void) {
        this.addListener<Representation<any, any>>('model_created', callback);
    }

    public addModelFailedListener(callback: () => void) {
        this.addListener<any>('create_model_error', x => callback());
    }

    public joinDiagram(request: JoinDiagramRequest) {
        this.socket.emit('join_diagram', request);
    }

    public createModel(modelRequest: CreateModelRequest<any>, representationRequest: CreateRepresentationRequest<any>) {

}

}

export class ConnectionResponse {
    public success: boolean;
}

export class UserResponse {
    public id: string;
    public name: string;
}

export class JoinDiagramRequest {
    public diagramId: string;
}