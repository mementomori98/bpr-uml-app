<script lang="ts">
    import Card from "../../ui/Card.svelte";
    import View from "../../ui/View.svelte";
    import Button from "../../ui/Button.svelte";
    import UserSettingsDialog from "../users/UserSettingsDialog.svelte";
    import EditProjectUsersDialog from "../users/EditProjectUsersDialog.svelte";
    import Checkbox from "../../ui/Checkbox.svelte";
    import CloseButton from "../../ui/CloseButton.svelte";
    import ListRowItem from "../../ui/ListRowItem.svelte";
    import ListRow from "../../ui/ListRow.svelte";
    import {goto, params} from "@roxi/routify";
    import ListScrollWrapper from "../../ui/ListScrollWrapper.svelte";
    import {User} from "../users/Models";

    let users = [
        new User({name: 'Ralu', email: 'ralu@bpr.com', status: 'Invited', role: 'Developer', canEdit: false, id: 1}),
        new User({name: 'Aron', email: 'aron@bpr.com', status: 'Active', role: 'Developer', canEdit: true, id: 2}),
        new User({
            name: 'Mate',
            email: 'mate@bpr.com',
            status: 'Invited',
            role: 'Product owner',
            canEdit: false,
            id: 3
        }),
        new User({name: 'Tony', email: 'aron@bpr.com', status: 'Active', role: 'Developer', canEdit: true, id: 4}),
        new User({
            name: 'Anne',
            email: 'mate@bpr.com',
            status: 'Invited',
            role: 'Product owner',
            canEdit: false,
            id: 5
        }),
        new User({name: 'Signe', email: 'aron@bpr.com', status: 'Active', role: 'Developer', canEdit: true, id: 6}),
        new User({
            name: 'Allan',
            email: 'mate@bpr.com',
            status: 'Invited',
            role: 'Product owner',
            canEdit: false,
            id: 7
        }),
    ].sort((u1, u2) => u1.name.localeCompare(u2.name));

    let addVisible: boolean = false;

    const checkChange = (e, user) => {
        console.log(user.name + " " + e.detail.state); //TODO

    }
</script>

<Card>
    <View>
        <svelte:fragment slot="header">Users in {$params.id}</svelte:fragment>
        <!-- TODO disabled if not product owner-->
        <ListScrollWrapper>
            <svelte:fragment slot="header">
                <ListRow isHeader>
                    <ListRowItem widthInPercentage={30}>Name</ListRowItem>
                    <ListRowItem widthInPercentage={30}>Email</ListRowItem>
                    <ListRowItem widthInPercentage={30}>Role</ListRowItem>
                    <ListRowItem center widthInPercentage={10}>Can edit</ListRowItem>
                </ListRow>
            </svelte:fragment>
            {#each users as user}
                <ListRow noFunction>
                    <ListRowItem widthInPercentage={30}>{user.name}</ListRowItem>
                    <ListRowItem widthInPercentage={30}>{user.email}</ListRowItem>
                    <ListRowItem widthInPercentage={30}>{user.role}</ListRowItem>
                    <ListRowItem center widthInPercentage={10}>
                        <Checkbox disabled bind:checked={user.canEdit}/>
                    </ListRowItem>
                </ListRow>
            {/each}
        </ListScrollWrapper>

        <svelte:fragment slot="actions"> <!-- TODO disabled if not product owner-->
            <Button on:click={() => addVisible = true}>Edit</Button>
        </svelte:fragment>
    </View>
</Card>

<EditProjectUsersDialog bind:visible={addVisible}/>

<style lang="scss">
  @import "../../ui/theme";

</style>