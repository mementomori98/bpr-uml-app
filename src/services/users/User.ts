export class User {
    public name: string;
    public email: string;
    public status: 'Invited' | 'Active';
    public role: 'Developer' | 'Admin' | 'Product owner';
    public canEdit: boolean;
    public id: number;
    
    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}