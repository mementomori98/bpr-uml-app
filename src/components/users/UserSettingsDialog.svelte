<script lang="ts">
    import Dialog from "../../ui/Dialog.svelte";
    import {User} from "./Models";
    import Input from "../../ui/Input.svelte";
    import Select from "../../ui/Select.svelte";
    import Button from "../../ui/Button.svelte";
    import {Colors} from "../../ui/utils/Colors";
    import Form from "../../ui/Form.svelte";
    import {DataListItem} from "../../ui/utils/DataListItem";

    export let visible: boolean = false;
    export let user: User = new User();

    let roles = [new DataListItem(1, "Admin"), new DataListItem(2, "Product owner"), new DataListItem(3, "Developer")]

    const deleteUser = () => {
        //todo deleteUser
        alert('User ' + user.name + ' removed')
    }
    const pickRole = (e) => {
        console.log(e.detail.choice); //TODO
        alert('User ' + user.name + ' updates to role ' + e.detail.choice)
    }
</script>

<Dialog bind:visible>
    <Form readonly>
        <svelte:fragment slot="header">User profile</svelte:fragment>
        <svelte:fragment slot="header-actions">
            <Button color={Colors.Red} on:click={deleteUser}>Remove user</Button>
        </svelte:fragment>

        <div class="wrapper">
            <div style="margin-right: 40px">
                <Input label="Name" bind:value={user.name} locked/>
                <Input label="Email" bind:value={user.email} locked/>

            </div>
            <div>
                <Input label="Status" bind:value={user.status} locked/>
                <Select hasButton label="Role" defaultChoice={user.role} on:submit={e => pickRole(e)} choices={roles} btnText="Update"/>
            </div>
        </div>

    </Form>
</Dialog>

<style lang="scss">
    @import "../../ui/theme";


    .wrapper {
        padding: 0px 20px 20px 20px;
        display: flex;

    }
</style>