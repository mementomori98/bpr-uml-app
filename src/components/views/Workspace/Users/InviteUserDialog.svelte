<script lang="ts">
    import Dialog from "../../../ui/Dialog.svelte";
    import Form from "../../../ui/Form.svelte";
    import Button from "../../../ui/Button.svelte";
    import {Colors} from "../../../ui/utils/Colors";
    import Input from "../../../ui/Input.svelte";

    export let visible: boolean = false;

    let email: string;

    const handleSubmit = () => {
        // todo
        email = '';
        visible = false;
    }

    const handleCancel = () => {
        email = '';
        visible = false;
    }

</script>

<Dialog bind:visible>
    <Form on:submit={handleSubmit} on:cancel={handleCancel} submitText="Invite" cancelButton>
        <svelte:fragment slot="header">Invite User</svelte:fragment>
        <svelte:fragment slot="header-actions"></svelte:fragment>
        <Input label="Email" bind:value={email}/>
    </Form>
</Dialog>

<style lang="scss">
    @import "../../../theme.scss";

</style>