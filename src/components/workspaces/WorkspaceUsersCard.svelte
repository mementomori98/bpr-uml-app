<script lang="ts">
    import Card from "../../ui/Card.svelte";
    import View from "../../ui/View.svelte";
    import Button from "../../ui/Button.svelte";
    import InviteUserDialog from "../users/InviteUserDialog.svelte";
    import UserSettingsDialog from "../users/UserSettingsDialog.svelte";
    import ListRowItem from "../../ui/ListRowItem.svelte";
    import ListRow from "../../ui/ListRow.svelte";
    import {onMount} from "svelte";
    import getService from "../utils/ServiceFactory";
    import {AppContext} from "../utils/AppContext";
    import {UserService} from "../users/UserService";

    const userService = getService(UserService);
    const appContext = getService(AppContext);
    let hasPermission: boolean = false;
    import ListScrollWrapper from "../../ui/ListScrollWrapper.svelte";
    import {WorkspaceUsersResponse} from "../users/Models";
    import Checkbox from "../../ui/Checkbox.svelte";
    import {ListItem} from "../../ui/utils/ListItem";

    let users: WorkspaceUsersResponse[] = [];

    let inviteVisible: boolean = false;
    let itemSettingsVisible: boolean = false;
    let chosenUser: WorkspaceUsersResponse = null;
    let child;

    onMount(async () => {
        hasPermission = await userService.validateWorkspacePermissions('MANAGE_WORKSPACE')
        await fetch()
    })

    const fetch = async () => {
        const res = await userService.getWorkspaceUsers(appContext.getWorkspaceId());
        users = res.sort((u1, u2) => u1.name.localeCompare(u2.name));
    }

    const handleClick = async (user) => {
        chosenUser = user
        itemSettingsVisible = true
        child.open(user.permissions)
    }
</script>

<Card>
    <View>
        <svelte:fragment slot="header">Users</svelte:fragment>
        <ListScrollWrapper>
            <svelte:fragment slot="header">
                <ListRow isHeader>
                    <ListRowItem widthInPercentage={36}>Name</ListRowItem>
                    <ListRowItem widthInPercentage={36}>Email</ListRowItem>
                    <ListRowItem center widthInPercentage={12}>Edit Teams</ListRowItem>
                    <ListRowItem center widthInPercentage={12}>Edit Perms</ListRowItem>
                    <ListRowItem center widthInPercentage={12}>Edit Works</ListRowItem>
                </ListRow>
            </svelte:fragment>
            {#each users as user}
                <ListRow on:click={() => handleClick(user)}>
                    <ListRowItem widthInPercentage={36}>{user.name}</ListRowItem>
                    <ListRowItem widthInPercentage={36}>{user.email}</ListRowItem>
                    <ListRowItem center widthInPercentage={12}>
                        <Checkbox disabled={true} checked={user.permissions.includes("MANAGE_TEAMS")}
                                  on:checkChange={e => console.log(e.detail.state) }/><!-- user.permissions..... -->
                    </ListRowItem>
                    <ListRowItem center widthInPercentage={12}>
                        <Checkbox disabled={true} checked={user.permissions.includes("MANAGE_PERMISSIONS")}
                                  on:checkChange={e => console.log(e.detail.state) }/>
                    </ListRowItem>
                    <ListRowItem center widthInPercentage={12}>
                        <Checkbox disabled={true} checked={user.permissions.includes("MANAGE_WORKSPACE")}
                                  on:checkChange={e => console.log(e.detail.state) }/>
                    </ListRowItem>
                </ListRow>
            {/each}
        </ListScrollWrapper>

        <svelte:fragment slot="actions">
            {#if hasPermission}
                <Button on:click={() => inviteVisible = true}>Invite</Button>
            {/if}
        </svelte:fragment>
    </View>
</Card>
<InviteUserDialog bind:visible={inviteVisible}/>
<UserSettingsDialog bind:this={child} on:delete={fetch} on:submit={fetch} bind:visible={itemSettingsVisible}
                    user={chosenUser}/>

<style lang="scss">
  @import "../../ui/theme";

</style>
