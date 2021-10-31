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

    const deleteUser = () => {
        //todo deleteUser
        alert('User ' + user.name + ' removed')
    }

    const editUser = () => {
        //todo editUser
        console.log("hdssasd")
        alert('User ' + user.role + ' edited')
    }


</script>

<Dialog bind:visible>
    <Form submitText="Save" lockable on:submit={editUser} bind:locked>
        <svelte:fragment slot="header">User profile</svelte:fragment>
        <svelte:fragment slot="header-actions">
            <Button color={Colors.Red} on:click={deleteUser}>Remove user</Button>
        </svelte:fragment>

        <div class="wrapper">
            <div style="margin-right: 40px">
                <Input label="Name" bind:value={user.name} {locked}/>
                <Input label="Email" bind:value={user.email} {locked}/>

            </div>
            <div>
                <Input label="Status" bind:value={user.status} {locked}/>
                <Select label="Role" bind:choice={user.role} choices={roles} btnText="Update" {locked}/>
            </div>
        </div>

    </Form>
</Dialog>

<style lang="scss">
  @import "../../../theme.scss";



    .wrapper{
      padding: 0px 20px 20px 20px;
      display: flex;

    }
</style>