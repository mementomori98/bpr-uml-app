export class DataListItem {

    public id: number;
    public name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

function formList(list: []){
    /*  let pickList: DataListItem[] = list.sort((u1, u2) => u1.name.localeCompare(u2.name)).map(person => {
          return new DataListItem(person.id, person.name)
      });*/

}