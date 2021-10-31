<script lang="ts">
    import Dialog from "../../../ui/Dialog.svelte";
    import Form from "../../../ui/Form.svelte";
    import Button from "../../../ui/Button.svelte";
    import {Colors} from "../../../ui/Colors";
    import Input from "../../../ui/Input.svelte";
    import Select from "../../../ui/Select.svelte";
    import {User} from "../../../../services/users/User";

    export let visible: boolean = false;

    let users = ["Ralu", "Mate", "Aron", "Zolly"]
    let choice : string = users[0];

    const handleInvite = () => {
        // todo

        visible = false;
    }

    const handleCancel = () => {

        visible = false;
    }

</script>

<Dialog bind:visible>
    <Form on:submit={handleInvite} on:cancel={handleCancel} submitText="Add" cancelButton>
        <svelte:fragment slot="header">Add User</svelte:fragment>
        <Select label="Users to add" bind:choice={choice} choices={users}/>
    </Form>
</Dialog>

<style lang="scss">
  @import "../../../theme.scss";

</style>