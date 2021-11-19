import { writable } from "svelte/store";
import { io } from "socket.io-client";
import getService from "../../utils/ServiceFactory";
import { AppContext } from "../../utils/AppContext";
const key = {};
const createDiagramStore = (diagramId) => {
    // imports
    const appContext = getService(AppContext);
    let diagram = {
        representations: [],
        users: [],
    };
    const { set, subscribe } = writable(diagram);
    const notify = () => set(diagram);
    // @ts-ignore
    const socket = io.connect('https://bpr-uml-socket-server.herokuapp.com/', {
        extraHeaders: { Authorization: `Bearer ${appContext.getAccessToken()}` }
    });
    // all socket listeners
    // response to connect
    socket.on('connection_response', e => {
        console.log('connection_response: ' + e);
        socket.emit('join_diagram', { diagramId: diagramId });
    });
    // response to join_diagram
    socket.on('all_diagram_models', e => {
        diagram.representations = JSON.parse(e);
        notify();
    });
    // response to join_diagram
    socket.on('user_joined', e => {
        console.log(e);
        diagram.users.push(e);
        notify();
    });
    // response to join_diagram
    socket.on('diagram_not_found', e => {
        console.log('diagram_not_found: ' + e);
    });
    // response to create_model
    socket.on('model_created', e => {
        diagram.representations.push(JSON.parse(e));
        notify();
    });
    // response to create_model
    socket.on('create_model_error', e => {
        console.log(`create_model_error ${e}`);
    });
    socket.on('model_updated', e => {
        console.log(e);
        let rep = JSON.parse(e);
        const index = diagram.representations.findIndex(r => r._id === rep._id);
        diagram.representations[index] = rep;
        notify();
    });
    socket.on('update_model_error', e => {
        console.log(`update_model_error ${e}`);
    });
    // general error message from server
    socket.on('message', e => {
        console.log('socket io message:');
        console.log(e);
    });
    return {
        subscribe,
        createModel: (model, representation) => {
            socket.emit('create_model', model, representation);
        },
        updateRepresentation: (request) => {
            socket.emit('update_model_representation', request);
        },
    };
};
export { key, createDiagramStore };
//# sourceMappingURL=diagramStore.js.map