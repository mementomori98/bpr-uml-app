<script lang="ts">
    import Card from "../../components/ui/Card.svelte";
    import {User} from "../users/User";
    import View from "../../components/ui/View.svelte";
    import Button from "../../components/ui/Button.svelte";
    import InviteUserDialog from "../users/InviteUserDialog.svelte";
    import UserSettingsDialog from "../users/UserSettingsDialog.svelte";
    import ListRowItem from "../../components/ui/ListRowItem.svelte";
    import ListRow from "../../components/ui/ListRow.svelte";
    import {onMount} from "svelte";
    import getService from "../utils/Services";
    import {WorkspaceService} from "./WorkspaceService";
    import {AppContext} from "../utils/AppContext";
    import {UserService} from "../users/UserService";

    const userService = getService(UserService);
    const appContext = getService(AppContext);
    import ListScrollWrapper from "../../components/ui/ListScrollWrapper.svelte";

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
        <ListScrollWrapper>
            <svelte:fragment slot="header">
                <ListRow isHeader>
                    <ListRowItem widthInPercentage={30}>Name</ListRowItem>
                    <ListRowItem widthInPercentage={30}>Email</ListRowItem>
                    <ListRowItem center widthInPercentage={20}>Status</ListRowItem>
                    <ListRowItem right widthInPercentage={20}>Role</ListRowItem>
                </ListRow>
            </svelte:fragment>
            {#each users as user}
                <ListRow noBorder={user === users[users.length-1]} on:click={() => handleClick(user)}>
                    <ListRowItem widthInPercentage={30}>{user.name}</ListRowItem>
                    <ListRowItem widthInPercentage={30}>{user.email}</ListRowItem>
                    <ListRowItem center widthInPercentage={20}>{user.status}</ListRowItem>
                    <ListRowItem right widthInPercentage={20}>{user.role}</ListRowItem>
                </ListRow>
            {/each}
        </ListScrollWrapper>

        <svelte:fragment slot="actions">
            <Button on:click={() => inviteVisible = true}>Invite</Button>
        </svelte:fragment>
    </View>
</Card>
<InviteUserDialog bind:visible={inviteVisible}/>
<UserSettingsDialog bind:visible={itemSettingsVisible} user={chosenUser}/> <!-- TODO should pass id-->

<style lang="scss">
  @import "../../components/theme";

</style>
