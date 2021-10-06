<script lang="ts">

    import Card from "../../../ui/Card.svelte";
    import Form from "../../../ui/Form.svelte";
    import Input from "../../../ui/Input.svelte";
    import Button from "../../../ui/Button.svelte";
    import {Colors} from "../../../ui/Colors";

    let workspaceName: string = 'My Workspace';

    let locked: boolean = true;

    const deleteWorkspace = () => {
        //todo deleteWorkspace
        alert('Workspace removed')
    }

</script>

<Card>
    <Form lockable bind:locked>
        <svelte:fragment slot="header">Workspace</svelte:fragment>
        <svelte:fragment slot="header-actions">
            <Button color={Colors.Red} on:click={deleteWorkspace}>Delete Workspace</Button>
        </svelte:fragment>
        <Input label="Workspace name" bind:value={workspaceName} {locked}/>
        <svelte:fragment slot="actions">
            {#if locked}
                <Button on:click={() => locked = !locked} color={Colors.Gray}>Edit</Button>
            {:else}
                <Button on:click={() => locked = !locked}>Save</Button>
            {/if}

        </svelte:fragment>
    </Form>
</Card>

<style lang="scss">
    @import "../../../theme";

</style>