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
    console.log('connecting');
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
    socket.on('disconnect', e => {
        console.log('disconnect');
    });
    // response to join_diagram
    socket.on('all_diagram_models', e => {
        diagram.representations = JSON.parse(e);
        notify();
    });
    // response to join_diagram
    socket.on('user_joined', e => {
        console.log(e);
        // diagram.users.push(e);
        // notify();
    });
    // response to join_diagram
    socket.on('error', e => {
        console.log('error: ' + JSON.stringify(e));
    });
    // response to create_model
    socket.on('model_added', e => {
        console.log('model added: ' + e);
        diagram.representations.push(JSON.parse(e));
        notify();
    });
    socket.on('model_rep_updated', e => {
        console.log('model_rep_updated: ' + e);
        let rep = JSON.parse(e);
        const index = diagram.representations.findIndex(r => r._id === rep._id);
        diagram.representations[index] = rep;
        notify();
    });
    socket.on('model_updated', e => {
        console.log('model_updated: ' + e);
        let model = JSON.parse(e);
        diagram.representations.filter(r => r.modelId === model._id).forEach(r => {
            r.model = model;
        });
        notify();
    });
    // general error message from server
    socket.on('message', e => {
        console.log('socket io message:');
        console.log(e);
    });
    return {
        subscribe,
        joinDiagram: diagramId => {
            socket.emit('join_diagram', { diagramId: diagramId });
        },
        createModel: (model, representation) => {
            console.log('creating model');
            socket.emit('create_model', model, representation);
        },
        updateRepresentation: (request) => {
            console.log('updating representation');
            socket.emit('update_model_representation', request);
        },
        addModel: (modelId, representation) => {
            console.log('adding model');
            socket.emit('add_model', { modelId: modelId }, representation);
        },
        updateAttribute: (request) => {
            console.log('updating attribute');
            console.log({
                modelId: request.modelId
            });
            console.log({ kind: request.kind, value: request.value });
            socket.emit('update_model_attribute', {
                modelId: request.modelId
            }, {
                kind: request.kind,
                value: request.value,
                _id: request.attributeId
            });
        }
    };
};
export { key, createDiagramStore };
//# sourceMappingURL=diagramStore.js.map