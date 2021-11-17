import {Model} from "../../components/utils/Model";
import {User, UserToProject, WorkspaceUsersResponse} from "../../components/users/Models";
import * as events from "events";

export class ListItem extends Model<ListItem> {
    public _id: string;
    public name: string;
}

export function formList(list: any[]){
      let pickList: ListItem[] = list.map(person => {
          return new ListItem({name: person.name, _id: person._id})
      }).sort((u1, u2) => u1.name.localeCompare(u2.name));
        return pickList;
}

export function getItem( list: any[], id: string)  {
    let item = list.filter(function (i) {
        return i._id == id;
    })[0]
    return item;
}

export function getUserToProject( user: WorkspaceUsersResponse, canEdit: boolean = true)  {
    return new UserToProject({
        name: user.name,
        email: user.email,
        _id: user._id,
        isEditor: canEdit,
    })
}

export function filterPickList(pickList: any[], id: string)  {
    let list = pickList.filter(function (item) {
        return item._id != id;
    }).sort((u1, u2) => u1.name.localeCompare(u2.name));
    return list;
}
