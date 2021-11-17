import { io } from "socket.io-client";
import getService from "../../utils/ServiceFactory";
import { AppContext } from "../../utils/AppContext";
import "./Models";
export class SocketHandler {
    constructor() {
        this.appContext = getService(AppContext);
    }
    addListener(eventName, callback) {
        this.socket.on(eventName, e => callback(JSON.parse(e)));
    }
    connect() {
        // @ts-ignore
        this.socket = io.connect('https://bpr-uml-socket-server.herokuapp.com/', {
            extraHeaders: {
                Authorization: `Bearer ${this.appContext.getAccessToken()}`
            }
        });
    }
    addConnectionResponseListener(callback) {
        this.addListener('connection_response', x => callback());
    }
    addDiagramJoinedListener(callback) {
        this.addListener('all_diagram_models', callback);
    }
    addUserJoinedListener(callback) {
        this.addListener('user_joined', callback);
    }
    addDiagramNotFoundListener(callback) {
        this.addListener('diagram_not_found', x => callback());
    }
    addModelCreatedListener(callback) {
        this.addListener('model_created', callback);
    }
    addModelFailedListener(callback) {
        this.addListener('create_model_error', x => callback());
    }
    joinDiagram(request) {
        this.socket.emit('join_diagram', request);
    }
    createModel(modelRequest, representationRequest) {
    }
}
export class ConnectionResponse {
}
export class UserResponse {
}
export class JoinDiagramRequest {
}
//# sourceMappingURL=SocketHandler.js.map