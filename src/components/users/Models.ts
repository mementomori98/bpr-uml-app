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

export class UserToTeam {
    public name: string;
    public email: string;
    public id: number;

    public constructor(init?: Partial<UserToTeam>) {
        Object.assign(this, init);
    }
}