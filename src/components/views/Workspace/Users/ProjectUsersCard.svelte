<script lang="ts">
    import Card from "../../../ui/Card.svelte";
    import {User} from "../../../../services/users/User";
    import View from "../../../ui/View.svelte";
    import Button from "../../../ui/Button.svelte";
    import UserSettingsDialog from "./UserSettingsDialog.svelte";
    import InviteProjectUserDialog from "./InviteProjectUserDialog.svelte";
    import Checkbox from "../../../ui/Checkbox.svelte";
    import CloseButton from "../../../ui/CloseButton.svelte";

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
    let itemSettingsVisible: boolean = false;
    let chosenUser: User = null;


    const handleClick = (user) => {
        // todo
        itemSettingsVisible = true
        chosenUser = user
    }

    const checkChange = (e, user) => {
        console.log(user.name + " " + e.detail.state); //TODO

    }

    const removeUserFromProject = (user) => {
        alert(user.name +" to be removed from project") //TODO implement & if(product owner)
    }
</script>

<Card>
    <View>
        <svelte:fragment slot="header">Project Users</svelte:fragment>
        <svelte:fragment slot="header-actions"></svelte:fragment>
        <div class="user-list-row user-list-row__header" on:click={() => handleClick(user)}>
            <div class="user-list-row__name">Name</div>
            <div class="user-list-row__email">Email</div>
            <div class="user-list-row__role">Role</div>
            <div class="user-list-row__can-edit">Can edit</div>
            <div class="user-list-row__close">Kick</div>
        </div>
        <div class="divider"/>
        {#each users as user}
            <div class="user-list-row" on:click={() => handleClick(user)}>
                <div class="user-list-row__name">
                    {user.name}
                </div>
                <div class="user-list-row__email">
                    {user.email}
                </div>
                <div class="user-list-row__role">
                    {user.role}
                </div>
                <div class="user-list-row__can-edit">
                    <Checkbox disabled bind:checked={user.canEdit} on:checkChange={e => checkChange(e, user)}/> <!-- TODO disabled if not product owner-->
                </div>
                <div class="user-list-row__close">
                    <CloseButton disabled on:click={() => removeUserFromProject(user)}/>    <!-- TODO disabled if not product owner-->

                </div>
            </div>
            <div class="divider"/>

        {/each}
        <svelte:fragment slot="actions"> <!-- TODO disabled if not product owner-->
            <Button on:click={() => addVisible = true}>Add</Button>
        </svelte:fragment>
    </View>
</Card>

<InviteProjectUserDialog bind:visible={addVisible}/>
<!--<UserSettingsDialog bind:visible={itemSettingsVisible} user={chosenUser}/>-->

<style lang="scss">
  @import "../../../theme";

  .divider {
    border-bottom: .5px solid rgba(0, 0, 0, .2);
  }

  .user-list-row {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px;

    &__header {
      font-weight: 800;
      padding: 0 16px;
    }

    &__name {
      width: 20%;
    }

    &__email {
      width: 30%;
    }

    &__role {
      width: 33%;
    }

    &__can-edit {
      width: 10%;
    }

    &__close {
      width: 7%;
    }
  }
</style>