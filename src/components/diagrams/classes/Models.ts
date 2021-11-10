import {Representation} from "../utils/Models";

export class ClassDiagramRepresentation extends Representation<ClassDiagramRepresentation> {
    public name: string;
    public fields: string[];
    public methods: string[];
}