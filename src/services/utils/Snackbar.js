import { Colors } from "../../components/ui/Colors";
import { Model } from "../Model";
export class Snackbar {
    constructor() {
        this.items = [];
    }
    add(item, color = Colors.Blue) {
        this.items.push(new SnackbarModel({ text: item, color: color }));
        this.callback();
        this.pop();
    }
    pop() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let item = this.items.shift();
                this.callback();
                resolve();
            }, 2000);
        });
    }
}
Snackbar.instance = new Snackbar();
export class SnackbarModel extends Model {
}
//# sourceMappingURL=Snackbar.js.map