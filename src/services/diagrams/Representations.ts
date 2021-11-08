import {Model} from "../Model";

export class Representation<T> extends Model<T> {
    public id: string;
    public modelId: string;
    public x: number;
    public y: number;
    public w: number;
    public h: number;
}

export class BoxRepresentation extends Representation<BoxRepresentation> {
    public text: string;
}

export class ClassDiagramRepresentation extends Representation<ClassDiagramRepresentation> {
    public name: string;
    public fields: string[];
    public methods: string[];
}