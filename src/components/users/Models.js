import { Model } from "../utils/Model";
export class User {
    constructor(init) {
        Object.assign(this, init);
    }
}
//+++++++++++++++++++++
export class UserInvitationRequest {
    constructor(init) {
        Object.assign(this, init);
    }
}
export class WorkspaceUsersResponse extends Model {
}
//+++++++++++++++++++++
export class UserToProject {
    constructor(init) {
        Object.assign(this, init);
    }
}
export class UserToTeam {
    constructor(init) {
        Object.assign(this, init);
    }
}
//# sourceMappingURL=Models.js.map