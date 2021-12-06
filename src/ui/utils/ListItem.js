import { Model } from "../../components/utils/Model";
import { TeamToProject, UserToProject, UserToTeam } from "../../components/users/Models";
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
export function getTeamToProject(user, canEdit = true) {
    return new TeamToProject({
        name: user.name,
        _id: user._id,
        isEditor: canEdit,
    });
}
export function getUserToProject(user, canEdit = true, isProjectManager = true) {
    return new UserToProject({
        name: user.name,
        email: user.email,
        _id: user._id,
        isEditor: canEdit,
        isProjectManager: isProjectManager,
    });
}
export function getUserToTeam(user) {
    return new UserToTeam({
        name: user.name,
        email: user.email,
        _id: user._id,
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
    return list.sort((u1, u2) => { var _a, _b; return (_a = u1.user) === null || _a === void 0 ? void 0 : _a.name.localeCompare((_b = u2.user) === null || _b === void 0 ? void 0 : _b.name); });
}
export function checkIfEmpty(list) {
    if (list.length > 1)
        return false;
    return list
        && Object.keys(list[0]).length === 0
        && Object.getPrototypeOf(list[0]) === Object.prototype;
}
//# sourceMappingURL=ListItem.js.map