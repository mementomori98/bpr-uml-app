import { Model } from "../../components/utils/Model";
import { UserToProject } from "../../components/users/Models";
import "events";
export class ListItem extends Model {
}
export function formList(list) {
    let pickList = list.map(person => {
        return new ListItem({ name: person.name, _id: person._id });
    });
    pickList = sortList(pickList);
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
export function filterListById(l, id) {
    let list = l.filter(function (item) {
        return item._id != id;
    });
    list = sortList(list);
    return list;
}
export function filterListByList(l, ref) {
    let list = l.filter(function (item) {
        let result = ref.find(obj => {
            return obj._id === item._id;
        });
        return result === undefined;
    });
    list = sortList(list);
    return list;
}
export function sortList(list) {
    return list.sort((u1, u2) => { var _a; return (_a = u1.name) === null || _a === void 0 ? void 0 : _a.localeCompare(u2.name); });
}
export function sortUserList(list) {
    return list.sort((u1, u2) => { var _a; return (_a = u1.user[0].name) === null || _a === void 0 ? void 0 : _a.localeCompare(u2.user[0].name); });
}
//# sourceMappingURL=ListItem.js.map