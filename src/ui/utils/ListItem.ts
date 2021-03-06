import {Model} from "../../components/utils/Model";
import {
    TeamToProject,
    UserToProject,
    UserToTeam,
    WorkspaceTeamsResponse,
    WorkspaceUsersResponse
} from "../../components/users/Models";
import * as events from "events";

export class ListItem extends Model<ListItem> {
    public _id: string;
    public name: string;
}

export function formList(list: any[]) {
    let pickList: ListItem[] = list.map(person => {
        return new ListItem({name: person.name, _id: person._id})
    });
    pickList = sortList(pickList)
    return pickList;
}

export function getItem(list: any[], id: string) {
    let item = list.filter(function (i) {
        return i._id == id;
    })[0]
    return item;
}

export function getTeamToProject(user: WorkspaceTeamsResponse, canEdit: boolean = true) {
    return new TeamToProject({
        name: user.name,
        _id: user._id,
        isEditor: canEdit,
    })
}

export function getUserToProject(user: WorkspaceUsersResponse, canEdit: boolean = true, isProjectManager: boolean = false) {
    return new UserToProject({
        name: user.name,
        email: user.email,
        _id: user._id,
        isEditor: canEdit,
        isProjectManager: isProjectManager,
    })
}

export function getUserToTeam(user: WorkspaceUsersResponse) {
    return new UserToTeam({
        name: user.name,
        email: user.email,
        _id: user._id,
    })
}

export function filterListById(l: any[], id: string) {
    let list = l.filter(function (item) {
        return item._id != id;
    });
    list = sortList(list)
    return list;
}

export function filterListByList(l: any[], ref: any[]) {
    let list = l.filter(function (item) {
        let result = ref.find(obj => {
            return obj._id === item._id
        })
        return result === undefined;
    });
    list = sortList(list)
    return list;
}

export function sortList(list: any[]) {
    return list.sort((u1, u2) => u1.name?.localeCompare(u2.name));
}

export function sortUserList(list: any[]) {
    return list.sort((u1, u2) => u1.user?.name.localeCompare(u2.user?.name));
}

export function checkIfEmpty(list: any[]) {
    if(list.length > 1) return false
    return list
        && Object.keys(list[0]).length === 0
        && Object.getPrototypeOf(list[0]) === Object.prototype
}