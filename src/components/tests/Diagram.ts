import {Box} from "./Box";

export class Diagram {
    public elements: Array<Box>

    constructor() {
        this.elements = [
            new Box(100, 100, 50, 100),
            new Box(500, 100, 150, 100),
        ];
    }

    public move(id: bigint, x: number, y: number): boolean {
        let box = this.elements.find(b => b.id == id);
        box.x = x;
        box.y = y;
        return true;
    }
}