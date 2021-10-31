<script lang="ts">
    import Card from "../../../ui/Card.svelte";
    import {User} from "../../../../services/users/User";
    import View from "../../../ui/View.svelte";
    import Button from "../../../ui/Button.svelte";
    import UserSettingsDialog from "./UserSettingsDialog.svelte";
    import InviteProjectUserDialog from "./InviteProjectUserDialog.svelte";
    import Checkbox from "../../../ui/Checkbox.svelte";

    let users = [
        new User({name: 'Ralu', email: 'ralu@bpr.com', status: 'Invited', role: 'Developer',canEdit: false}),
        new User({name: 'Aron', email: 'aron@bpr.com', status: 'Active', role: 'Developer',canEdit: true}),
        new User({name: 'Mate', email: 'mate@bpr.com', status: 'Invited', role: 'Product owner',canEdit: false}),
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
</script>

<Card>
    <View>
        <svelte:fragment slot="header">Project Users</svelte:fragment>
        <svelte:fragment slot="header-actions"></svelte:fragment>
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
                    <Checkbox bind:checked={user.canEdit} on:checkChange={e => checkChange(e, user)}/>
                </div>
            </div>
            <div class="divider"/>

        {/each}
        <svelte:fragment slot="actions">
            <Button on:click={() => addVisible = true}>Add</Button>
        </svelte:fragment>
    </View>
</Card>

<InviteProjectUserDialog bind:visible={addVisible}/>
<UserSettingsDialog bind:visible={itemSettingsVisible} user={chosenUser}/>

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
    cursor: pointer;

    &__name {
      width: 20%;
    }

    &__email {
      width: 40%;
    }

    &__status {
      width: 30%;
    }

    &__role {
      width: 40%;
    }

    &__user-list-row__can-edit{
      width: 20%;
    }
  }
</style>