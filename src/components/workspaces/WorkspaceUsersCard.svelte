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
    import {WorkspaceService} from "./WorkspaceService";
    import {AppContext} from "../utils/AppContext";
    import {UserService} from "../users/UserService";

    const userService = getService(UserService);
    const appContext = getService(AppContext);
    import ListScrollWrapper from "../../ui/ListScrollWrapper.svelte";
    import {User, UserInvitationRequest, WorkspaceUsersResponse} from "../users/Models";

    let users: WorkspaceUsersResponse[] = [];

    let inviteVisible: boolean = false;
    let itemSettingsVisible: boolean = false;
    let chosenUser: User = null;

    onMount(async () => {
        const res = await userService.getWorkspaceUsers(appContext.getWorkspaceId());
        users = res.sort((u1, u2) => u1.name.localeCompare(u2.name)); //TODO should merge it with the invited ones, and show them by status on the separate column
    })

    const handleClick = async (user) => {
        // todo
        itemSettingsVisible = true
        chosenUser = user
    }
</script>

<Card>
    <View>
        <svelte:fragment slot="header">Users</svelte:fragment>
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
                <ListRow on:click={() => handleClick(user)}>
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
  @import "../../ui/theme";

</style>
