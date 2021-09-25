<script lang="ts">
    import Card from "../../../ui/Card.svelte";
    import {User} from "../../../../services/users/User";
    import View from "../../../ui/View.svelte";
    import Button from "../../../ui/Button.svelte";
    import InviteUserDialog from "./InviteUserDialog.svelte";

    let users = [
        new User({name: 'Ralu', email: 'ralu@bpr.com', status: 'Invited'}),
        new User({name: 'Aron', email: 'aron@bpr.com', status: 'Active'}),
        new User({name: 'Zoli', email: 'zoli@bpr.com', status: 'Active'}),
        new User({name: 'Mate', email: 'mate@bpr.com', status: 'Invited'}),
    ].sort((u1, u2) => u1.name.localeCompare(u2.name));

    let visible: boolean = false;
</script>

<Card>
    <View>
        <svelte:fragment slot="header">Users</svelte:fragment>
        <svelte:fragment slot="header-actions"></svelte:fragment>
        <div class="divider"/>
        {#each users as user}
            <div class="user-list-row">
                <div class="user-list-row__name">
                    {user.name}
                </div>
                <div class="user-list-row__email">
                    {user.email}
                </div>
                <div class="user-list-row__status">
                    {user.status}
                </div>
            </div>
            <div class="divider"/>
        {/each}
        <svelte:fragment slot="actions">
            <Button on:click={() => visible = true}>Invite</Button>
        </svelte:fragment>
    </View>
</Card>
<InviteUserDialog bind:visible/>

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

        &__name {
            width: 40%;
        }

        &__email {
            width: 40%;
        }

        &__status {
            width: 40%;
        }
    }
</style>