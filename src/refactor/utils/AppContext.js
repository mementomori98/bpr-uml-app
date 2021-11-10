export class AppContext {
    setAccessToken(accessToken) {
        this.setValue('accessToken', accessToken);
    }
    getAccessToken() {
        return this.getValue('accessToken');
    }
    setWorkspaceId(workspaceId) {
        this.setValue('workspaceId', workspaceId);
    }
    getWorkspaceId() {
        return this.getValue('workspaceId');
    }
    setValue(name, value) {
        localStorage.setItem(name, value);
        if (value == null)
            localStorage.removeItem(name);
    }
    getValue(name) {
        return localStorage.getItem(name);
    }
}
AppContext.instance = new AppContext();
//# sourceMappingURL=AppContext.js.map