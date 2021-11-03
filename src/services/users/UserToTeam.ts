export class UserToTeam {
    public name: string;
    public email: string;
    public id: number;

    public constructor(init?: Partial<UserToTeam>) {
        Object.assign(this, init);
    }
}