<script lang="ts">
    import Dialog from "../../components/ui/Dialog.svelte";
    import {User} from "./User";
    import Input from "../../components/ui/Input.svelte";
    import Select from "../../components/ui/Select.svelte";
    import Button from "../../components/ui/Button.svelte";
    import {Colors} from "../../components/utils/Colors";
    import Form from "../../components/ui/Form.svelte";
    import {DataListItem} from "../../components/utils/DataListItem";
    export let visible: boolean = false;
    export let user: User = new User();
    let roleToSet: DataListItem = null;

    let roles = [new DataListItem(1, "Admin"),new DataListItem(2, "Product owner"),new DataListItem(3, "Developer")]
    let locked: boolean = true;

    const deleteUser = () => {
        //todo deleteUser
        alert('User ' + user.name + ' removed')
    }

    const editUser = () => {
        //todo editUser
        console.log("hdssasd")
        console.log(roleToSet.name + " from " + user.role)
        alert(roleToSet == null ? user.role : roleToSet.name) //TODO roleToSet == null ? user.role : roleToSet
    }

    const pickRole = (e) => {
        console.log(e.detail.choice); //TODO
        roleToSet = e.detail.choice;
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
                <Select label="Role" defaultChoice={user.role} on:submit={e => pickRole(e)} choices={roles} btnText="Update" {locked}/>
            </div>
        </div>

    </Form>
</Dialog>

<style lang="scss">
  @import "../../components/theme";



    .wrapper{
      padding: 0px 20px 20px 20px;
      display: flex;

    }
</style>