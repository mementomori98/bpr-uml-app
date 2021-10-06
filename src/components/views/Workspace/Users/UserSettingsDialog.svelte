<script lang="ts">
    import Dialog from "../../../ui/Dialog.svelte";
    import {User} from "../../../../services/users/User";
    import Input from "../../../ui/Input.svelte";
    import Select from "../../../ui/Select.svelte";
    import Button from "../../../ui/Button.svelte";
    import {Colors} from "../../../ui/Colors";
    export let visible: boolean = false;
    export let user: User = null;


    let roles = ["Admin", "Product owner", "Developer"]

    const onRoleChange = (event) => {
        //todo update role of user
        alert('User ' + user.name + 's role updated to ' + event.detail.role);
    }
    const deleteUser = () => {
        //todo deleteUser
        alert('User ' + user.name + ' removed')
    }


</script>

<Dialog bind:visible>
    <div style="display: flex; justify-content: space-between">
        <h1 style="padding: 20px 20px 0px 20px; margin: 0">User profile</h1>
        <div style="display: flex;
                align-items: center;
                justify-content: flex-end; padding: 20px">
            <Button color={Colors.Red} on:click={deleteUser}>Remove user</Button>
        </div>

    </div>

    <div class="wrapper">
        <div style="margin-right: 40px">
            <Input label="Name" value={user.name} locked/>
            <Input label="Email" value={user.email} locked/>

        </div>
        <div>
            <Input label="Status" value={user.status} locked/>
            <Select label="Role" choice={user.role} choices={roles} btnText="Update" on:submit={onRoleChange} hasButton/>
        </div>
    </div>
</Dialog>

<style lang="scss">
  @import "../../../theme.scss";



    .wrapper{
      padding: 0px 20px 20px 20px;
      display: flex;

    }
</style>