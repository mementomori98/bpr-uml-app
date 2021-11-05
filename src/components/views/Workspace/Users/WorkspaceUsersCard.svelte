<script lang="ts">
    import Card from "../../../ui/Card.svelte";
    import {User} from "../../../../services/users/User";
    import View from "../../../ui/View.svelte";
    import Button from "../../../ui/Button.svelte";
    import InviteUserDialog from "./InviteUserDialog.svelte";
    import UserSettingsDialog from "./UserSettingsDialog.svelte";
    import ListRowItem from "../../../ui/ListRowItem.svelte";
    import ListRow from "../../../ui/ListRow.svelte";
    import {onMount} from "svelte";
    import getService from "../../../../services/Services";
    import {WorkspaceService} from "../../../../services/Workspaces/WorkspaceService";
    import {AppContext} from "../../../../services/utils/AppContext";
    import {UserService} from "../../../../services/users/UserService";

    const userService = getService(UserService);
    const appContext = getService(AppContext);

    let users = [
        new User({name: 'IMPLEMENT ME', email: 'IMPLEMENT ME', status: 'Invited', role: 'Developer'}),
        new User({name: 'IMPLEMENT ME', email: 'IMPLEMENT ME', status: 'Invited', role: 'Developer'}),
        new User({name: 'IMPLEMENT ME', email: 'IMPLEMENT ME', status: 'Invited', role: 'Developer'}),
        new User({name: 'IMPLEMENT ME', email: 'IMPLEMENT ME', status: 'Invited', role: 'Developer'}),
        new User({name: 'IMPLEMENT ME', email: 'IMPLEMENT ME', status: 'Invited', role: 'Admin'}),
    ].sort((u1, u2) => u1.name.localeCompare(u2.name));

    let inviteVisible: boolean = false;
    let itemSettingsVisible: boolean = false;
    let chosenUser: User = null;

    onMount(async () => {
        const res = await userService.getWorkspaceUsers(appContext.getWorkspaceId());
        console.log(res)
    })

    const handleClick = (user) => {
        // todo
        itemSettingsVisible = true
        chosenUser = user
    }
</script>

<Card>
    <View>
        <svelte:fragment slot="header">Users</svelte:fragment>
        <svelte:fragment slot="header-actions"></svelte:fragment>
        <ListRow isHeader>
            <ListRowItem widthInPercentage={20}>Name</ListRowItem>
            <ListRowItem widthInPercentage={30}>Email</ListRowItem>
            <ListRowItem widthInPercentage={20}>Status</ListRowItem>
            <ListRowItem widthInPercentage={30}>Role</ListRowItem>
        </ListRow>
        {#each users as user}
            <ListRow on:click={() => handleClick(user)}>
                <ListRowItem widthInPercentage={20}>{user.name}</ListRowItem>
                <ListRowItem widthInPercentage={30}>{user.email}</ListRowItem>
                <ListRowItem widthInPercentage={20}>{user.status}</ListRowItem>
                <ListRowItem widthInPercentage={30}>{user.role}</ListRowItem>
            </ListRow>
        {/each}
        <svelte:fragment slot="actions">
            <Button on:click={() => inviteVisible = true}>Invite</Button>
        </svelte:fragment>
    </View>
</Card>
<InviteUserDialog bind:visible={inviteVisible}/>
<UserSettingsDialog bind:visible={itemSettingsVisible} user={chosenUser}/> <!-- TODO should pass id-->

<style lang="scss">
  @import "../../../theme";

</style>