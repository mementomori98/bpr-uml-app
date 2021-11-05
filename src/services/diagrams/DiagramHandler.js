import { BoxRepresentation } from "./Representations";
import getService from "../Services";
import { Snackbar } from "../utils/Snackbar";
export class DiagramHandler {
    constructor() {
        this.snackbar = getService(Snackbar);
        this.elements = [
            new BoxRepresentation({ x: 10, y: 20, w: 50, h: 100, id: '1' }),
            new BoxRepresentation({ x: 150, y: 40, w: 150, h: 100, id: '2' }),
            new BoxRepresentation({ x: 350, y: 40, w: 150, h: 100, id: '3' }),
        ];
    }
    move(id, x, y) {
        let box = this.elements.find(b => b.id == id);
        box.x = x;
        box.y = y;
        this.snackbar.add(`Moved to ${Math.floor(x)}:${Math.floor(y)}`);
        return true;
    }
}
//# sourceMappingURL=DiagramHandler.js.map