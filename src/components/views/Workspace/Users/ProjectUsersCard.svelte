<script lang="ts">
    import Card from "../../../ui/Card.svelte";
    import {User} from "../../../../services/users/User";
    import View from "../../../ui/View.svelte";
    import Button from "../../../ui/Button.svelte";
    import UserSettingsDialog from "./UserSettingsDialog.svelte";
    import InviteProjectUserDialog from "./InviteProjectUserDialog.svelte";
    import Checkbox from "../../../ui/Checkbox.svelte";
    import CloseButton from "../../../ui/CloseButton.svelte";
    import ListRowItem from "../../../ui/ListRowItem.svelte";
    import ListRow from "../../../ui/ListRow.svelte";
    import {goto, params} from "@roxi/routify";
    import ListScrollWrapper from "../../../ui/ListScrollWrapper.svelte";

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

    const removeUserFromProject = (user) => {
        alert(user.name + " to be removed from project") //TODO implement & if(product owner)
    }
</script>

<Card>
    <View>
        <svelte:fragment slot="header">Users in {$params.id}</svelte:fragment>
        <!-- TODO disabled if not product owner-->
        <svelte:fragment slot="header-actions"></svelte:fragment>
        <ListScrollWrapper>
            <svelte:fragment slot="header">
                <ListRow isHeader>
                    <ListRowItem widthInPercentage={20}>Name</ListRowItem>
                    <ListRowItem widthInPercentage={30}>Email</ListRowItem>
                    <ListRowItem widthInPercentage={33}>Role</ListRowItem>
                    <ListRowItem widthInPercentage={10}>Can edit</ListRowItem>
                    <ListRowItem widthInPercentage={7}>Kick</ListRowItem>
                </ListRow>
            </svelte:fragment>
            {#each users as user}
                <ListRow noBorder={user === users[users.length-1]} noFunction>
                    <ListRowItem widthInPercentage={20}>{user.name}</ListRowItem>
                    <ListRowItem widthInPercentage={30}>{user.email}</ListRowItem>
                    <ListRowItem widthInPercentage={33}>{user.role}</ListRowItem>
                    <ListRowItem widthInPercentage={10}>
                        <Checkbox bind:checked={user.canEdit} on:checkChange={e => checkChange(e, user)}/>
                        <!-- TODO disabled if not product owner--></ListRowItem>
                    <ListRowItem widthInPercentage={7}>
                        <CloseButton on:click={() => removeUserFromProject(user)}/>
                        <!-- TODO disabled if not product owner--></ListRowItem>
                </ListRow>
            {/each}
        </ListScrollWrapper>

        <svelte:fragment slot="actions"> <!-- TODO disabled if not product owner-->
            <Button on:click={() => addVisible = true}>Add</Button>
        </svelte:fragment>
    </View>
</Card>

<InviteProjectUserDialog bind:visible={addVisible}/>

<style lang="scss">
  @import "../../../theme";

</style>