import {Model} from "../../utils/Model";

export class Representation<T> extends Model<T> {
    public id: string;
    public modelId: string;
    public x: number;
    public y: number;
    public w: number;
    public h: number;
}

export class DiagramModel<T> extends Model<T> {
    public id: string;
    public type: string;
}

export class CreateModelRequest<T> extends Model<T> {
    public x: number;
    public y: number;
    public w: number;
    public h: number;
}