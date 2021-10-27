<script lang="ts">
    import Dialog from "../../../ui/Dialog.svelte";
    import {User} from "../../../../services/users/User";
    import Input from "../../../ui/Input.svelte";
    import Select from "../../../ui/Select.svelte";
    import Button from "../../../ui/Button.svelte";
    import {Colors} from "../../../ui/Colors";
    import Form from "../../../ui/Form.svelte";
    export let visible: boolean = false;
    export let user: User = null;


    let roles = ["Admin", "Product owner", "Developer"]
    let locked: boolean = true;

    const onRoleChange = (event) => {
        //todo update role of user
        //alert('User ' + user.name + 's role updated to ' + event.detail.role);
    }
    const deleteUser = () => {
        //todo deleteUser
        alert('User ' + user.name + ' removed')
    }


</script>

<Dialog bind:visible>
    <Form submitText="Save" lockable  bind:locked>
        <svelte:fragment slot="header">User profile</svelte:fragment>
        <svelte:fragment slot="header-actions">
            <Button color={Colors.Red} on:click={deleteUser}>Remove user</Button>
        </svelte:fragment>

        <div class="wrapper">
            <div style="margin-right: 40px">
                <Input label="Name" value={user.name} {locked}/>
                <Input label="Email" value={user.email} {locked}/>

            </div>
            <div>
                <Input label="Status" value={user.status} {locked}/>
                <Select label="Role" choice={user.role} choices={roles} btnText="Update" on:submit={onRoleChange} {locked}/>
            </div>
        </div>

        <svelte:fragment slot="actions">
            {#if locked}
                <Button on:click={() => locked = !locked} color={Colors.Gray}>Edit</Button>
            {:else}
                <Button on:click={() => locked = !locked}>Save</Button> <!-- TODO -->
            {/if}

        </svelte:fragment>
    </Form>
</Dialog>

<style lang="scss">
  @import "../../../theme.scss";



    .wrapper{
      padding: 0px 20px 20px 20px;
      display: flex;

    }
</style>