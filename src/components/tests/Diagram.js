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
        box.x = x;
        box.y = y;
        return true;
    }
}
//# sourceMappingURL=Diagram.js.map