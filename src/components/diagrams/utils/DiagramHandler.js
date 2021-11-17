import getService from "../../utils/ServiceFactory";
import { Snackbar } from "../../utils/Snackbar";
import { BoxRepresentation } from "../boxes/Models";
import { io } from "socket.io-client";
import { AppContext } from "../../utils/AppContext";
import "../../../ui/utils/Colors";
export class DiagramHandler {
    constructor(callback) {
        this.snackbar = getService(Snackbar);
        this.appContext = getService(AppContext);
        this.callback = () => { };
        this.elements = [];
        this.callback = callback;
        // @ts-ignore
        this.socket = io.connect('https://bpr-uml-socket-server.herokuapp.com/', {
            extraHeaders: {
                Authorization: `Bearer ${this.appContext.getAccessToken()}`
            }
        });
        this.socket.on('representation_created', e => {
            e = JSON.parse(e);
            let boxRepresentation = new BoxRepresentation({
                x: e['x'],
                y: e.y,
                w: e.w,
                h: e.h,
                text: this.modelStash.text,
                modelId: this.modelStash.modelId,
                _id: e._id,
            });
            this.elements.push(boxRepresentation);
            this.callback();
        });
        this.socket.on('model_created', e => {
            e = JSON.parse(e);
            this.modelStash = e;
        });
        this.socket.on('connect', () => {
            this.snackbar.add('connected');
            this.socket.emit('join_diagram', {
                diagramId: '6184efa95faef251e252c331'
            });
        });
        this.socket.on('disconnect', () => this.snackbar.add('disconnected'));
    }
    create(request) {
        this.socket.emit('create_model', {
            "type": "textBox",
            "text": request.text,
            "path": ""
        }, {
            "x": request.x,
            "y": request.y,
            "w": request.w,
            "h": request.h
        });
    }
    move(id, x, y) {
        let box = this.elements.find(b => b._id == id);
        box.x = x;
        box.y = y;
        return true;
    }
}
/*
let socket = io.connect('https://bpr-uml-socket-server.herokuapp.com/', {
        extraHeaders: {
            Authorization: `Bearer ${appContext.getAccessToken()}`
        }
    })

    socket.on("connect", () => {
        snackbar.add('connected');

        socket.emit('join_diagram', {
            diagramId: '6184efa95faef251e252c331'
        });
    });

    socket.on("disconnect", () => {
        snackbar.add('disconnected')
    });

    socket.on('user_joined', e => {
        snackbar.add(e.id + ' | ' + e.name + ' joined');
    });

    socket.on('model_created', e => {
        snackbar.add(JSON.stringify(e));
    });

    socket.on('representation_created', async e => {
        await new Promise(r => setTimeout(r, 4000));
        snackbar.add(JSON.stringify(e));
    });
 */ 
//# sourceMappingURL=DiagramHandler.js.map