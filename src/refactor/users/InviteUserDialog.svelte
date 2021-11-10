<script lang="ts">
    import Dialog from "../../components/ui/Dialog.svelte";
    import Form from "../../components/ui/Form.svelte";
    import Button from "../../components/ui/Button.svelte";
    import {Colors} from "../../components/utils/Colors";
    import Input from "../../components/ui/Input.svelte";

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
    @import "../../components/theme";

</style>