import {Colors} from "../../components/utils/Colors";
import {Model} from "./Model";

export class Snackbar {

    public static instance = new Snackbar();

    public callback: () => void;

    public items: SnackbarModel[] = [];

    public add(item: string, color: Colors = Colors.Blue) {
        this.items.push(new SnackbarModel({text: item, color: color}));
        this.callback();
        this.pop();
    }

    private pop(): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let item = this.items.shift();
                this.callback();
                resolve();
            }, 2000)
        });
    }
}

export class SnackbarModel extends Model<SnackbarModel> {
    public text: string;
    public color: Colors;
}