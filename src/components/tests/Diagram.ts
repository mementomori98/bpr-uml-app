import {Box} from "./Box";

export class Diagram {
    public elements: Array<Box>
    private static error: number = 0;

    constructor() {
        this.elements = [
            new Box(100, 100, 50, 100),
            new Box(500, 100, 150, 100),
        ];
    }

    public move(id: number, x: number, y: number): boolean {
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