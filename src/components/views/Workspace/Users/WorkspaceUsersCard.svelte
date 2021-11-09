<script lang="ts">
    import Card from "../../../ui/Card.svelte";
    import {User} from "../../../../services/users/User";
    import View from "../../../ui/View.svelte";
    import Button from "../../../ui/Button.svelte";
    import InviteUserDialog from "./InviteUserDialog.svelte";
    import UserSettingsDialog from "./UserSettingsDialog.svelte";
    import ListRowItem from "../../../ui/ListRowItem.svelte";
    import ListRow from "../../../ui/ListRow.svelte";
    import ListScrollWrapper from "../../../ui/ListScrollWrapper.svelte";

    let users = [
        new User({name: 'Ralu', email: 'ralu@bpr.com', status: 'Invited', role: 'Developer'}),
        new User({name: 'Aron', email: 'aron@bpr.com', status: 'Active', role: 'Developer'}),
        new User({name: 'Zoli', email: 'zoli@bpr.com', status: 'Active', role: 'Developer'}),
        new User({name: 'Mate', email: 'mate@bpr.com', status: 'Invited', role: 'Developer'}),
        new User({name: 'Allan', email: 'allan@bpr.com', status: 'Active', role: 'Admin'}),
    ].sort((u1, u2) => u1.name.localeCompare(u2.name));

    let inviteVisible: boolean = false;
    let itemSettingsVisible: boolean = false;
    let chosenUser: User = null;


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
  @import "../../../theme";

</style>