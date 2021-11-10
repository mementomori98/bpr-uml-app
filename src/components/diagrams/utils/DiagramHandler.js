import getService from "../../utils/ServiceFactory";
import { Snackbar } from "../../utils/Snackbar";
import { BoxRepresentation } from "../boxes/Models";
import "../classes/Models";
export class DiagramHandler {
    constructor() {
        this.snackbar = getService(Snackbar);
        this.elements = [];
    }
    create(request) {
        this.elements.push(new BoxRepresentation({
            x: request.x,
            y: request.y,
            w: request.w,
            h: request.h,
            text: request.text,
            modelId: '',
            id: Math.random() + ''
        }));
    }
    move(id, x, y) {
        let box = this.elements.find(b => b.id == id);
        box.x = x;
        box.y = y;
        return true;
    }
}
//# sourceMappingURL=DiagramHandler.js.map