import getService from "../../utils/ServiceFactory";
import {Snackbar} from "../../utils/Snackbar";
import type {Representation} from "./Models";
import {BoxRepresentation, CreateBoxRequest} from "../boxes/Models";
import {ClassDiagramRepresentation} from "../classes/Models";

export class DiagramHandler {

    private readonly snackbar = getService(Snackbar);

    public elements: Array<Representation<any>> = [];

    public create(request: CreateBoxRequest) {
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

    public move(id: string, x: number, y: number): boolean {
        let box = this.elements.find(b => b.id == id);
        box.x = x;
        box.y = y;

        return true;
    }
}