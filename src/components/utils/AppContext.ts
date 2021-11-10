export class AppContext {

    public static instance = new AppContext();

    public setAccessToken(accessToken: string) {
        this.setValue('accessToken', accessToken);
    }

    public getAccessToken() {
        return this.getValue('accessToken');
    }

    public setWorkspaceId(workspaceId: string) {
        this.setValue('workspaceId', workspaceId);
    }

    public getWorkspaceId() {
        return this.getValue('workspaceId');
    }

    private setValue(name, value) {
        localStorage.setItem(name, value);
        if (value == null)
            localStorage.removeItem(name);
    }

    private getValue(name) {
        return localStorage.getItem(name);
    }

}