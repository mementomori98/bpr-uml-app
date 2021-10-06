export class User {
    public name: string;
    public email: string;
    public status: 'Invited' | 'Active';
    public role: 'Developer' | 'Admin' | 'Product owner';
    
    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}