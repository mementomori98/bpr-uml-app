import { Box } from "./Box";
export class Diagram {
    constructor() {
        this.elements = [
            new Box(100, 100, 50, 100),
            new Box(500, 100, 150, 100),
        ];
    }
    move(id, x, y) {
        let box = this.elements.find(b => b.id == id);
        Diagram.error++;
        if ((Diagram.error % 4) == 0) {
            return false;
        }
        box.x = x;
        box.y = y;
        return true;
    }
}
Diagram.error = 0;
//# sourceMappingURL=Diagram.js.map