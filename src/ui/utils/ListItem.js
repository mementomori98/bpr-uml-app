import { Model } from "../../components/utils/Model";
import { UserToProject } from "../../components/users/Models";
import "events";
export class ListItem extends Model {
}
export function formList(list) {
    let pickList = list.map(person => {
        return new ListItem({ name: person.name, _id: person._id });
    }).sort((u1, u2) => u1.name.localeCompare(u2.name));
    return pickList;
}
export function getItem(list, id) {
    let item = list.filter(function (i) {
        return i._id == id;
    })[0];
    return item;
}
export function getUserToProject(user, canEdit = true) {
    return new UserToProject({
        name: user.name,
        email: user.email,
        _id: user._id,
        isEditor: canEdit,
    });
}
export function filterPickList(pickList, id) {
    let list = pickList.filter(function (item) {
        return item._id != id;
    }).sort((u1, u2) => u1.name.localeCompare(u2.name));
    return list;
}
//# sourceMappingURL=ListItem.js.map