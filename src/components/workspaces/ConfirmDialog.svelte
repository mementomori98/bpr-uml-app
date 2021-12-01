<script lang="ts">
    import Dialog from "../../ui/Dialog.svelte";
    import Form from "../../ui/Form.svelte";
    import {createEventDispatcher} from "svelte";

    export let visible: boolean = false;
    export let title: string = "";
    export let description: string = "";
    const dispatch = createEventDispatcher();

    const handleSubmit = () => {
        visible = false;
        dispatch('confirm')
    }

    const handleCancel = () => {
        visible = false;
    }

</script>

<Dialog on:clickedOut={handleCancel} bind:visible>
    <Form on:submit={handleSubmit} on:cancel={handleCancel} submitText="Confirm" cancelButton>
        <svelte:fragment slot="header">{title}</svelte:fragment>
        <div class="description">{description}</div>
    </Form>
</Dialog>

<style lang="scss">
  @import "../../ui/theme";
    .description{
      font: $font-form;
    }
</style>