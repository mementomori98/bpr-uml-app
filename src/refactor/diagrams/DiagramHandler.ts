import {BoxRepresentation, ClassDiagramRepresentation, Representation} from "./Representations";
import getService from "../utils/Services";
import {Snackbar} from "../utils/Snackbar";

export class DiagramHandler {

    private readonly snackbar = getService(Snackbar);

    public elements: Array<Representation<any>>

    constructor() {
        this.elements = [
            new BoxRepresentation({x: 10, y: 20, w: 150, h: 100, id: '1', text: 'Hello World'}),
            new BoxRepresentation({x: 150, y: 40, w: 150, h: 100, id: '2', text: 'Hey'}),
            new ClassDiagramRepresentation({x: 350, y: 40, w: 250, h: 300, id: '3', fields: ['hello', 'world'], methods: ['world', 'hello'], name: 'ClassName'}),
        ];
    }

    public move(id: string, x: number, y: number): boolean {
        let box = this.elements.find(b => b.id == id);
        box.x = x;
        box.y = y;

        return true;
    }
}