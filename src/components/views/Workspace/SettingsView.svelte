<script lang="ts">
    import Grid from "../../ui/Grid.svelte";
    import Item from "../../ui/Item.svelte";
    import Card from "../../ui/Card.svelte";
    import View from "../../ui/View.svelte";
    import Container from "../../ui/Container.svelte";
    import Input from "../../ui/Input.svelte";
    import Button from "../../ui/Button.svelte";
    import {Colors} from "../../ui/Colors";
    import Form from "../../ui/Form.svelte";

    let workspaceName: string = 'My Workspace';

    let locked: boolean = true;
</script>

<Container>
    <Card>
        <Form lockable bind:locked>
            <svelte:fragment slot="header">Workspace</svelte:fragment>
            <svelte:fragment slot="header-actions"></svelte:fragment>
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

</Container>

<style lang="scss">
    @import "../../theme.scss";
</style>