<script lang="ts">
    import Dialog from "../../ui/Dialog.svelte";
    import Form from "../../ui/Form.svelte";

    export let visible: boolean = false;


    const handleSubmit = () => {
        // todo
        visible = false;
    }

    const handleCancel = () => {
        visible = false;
    }

</script>

<Dialog bind:visible>
    <Form on:submit={handleSubmit} on:cancel={handleCancel} submitText="Confirm" cancelButton>
        <svelte:fragment slot="header">Delete workspace</svelte:fragment>
        <div class="description">Confirm workspace removal. This action cannot be reverted!</div>
    </Form>
</Dialog>

<style lang="scss">
  @import "../../theme.scss";
    .description{
      font: $font-form;
    }
</style>