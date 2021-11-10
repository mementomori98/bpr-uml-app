export class UserToProject {
    public name: string;
    public email: string;
    public role: 'Developer' | 'Scrum Master' | 'Product owner';
    public canEdit: boolean;
    public id: number;

    public constructor(init?: Partial<UserToProject>) {
        Object.assign(this, init);
    }
}