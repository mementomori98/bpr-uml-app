<script lang="ts">

    import Card from "../../../ui/Card.svelte";
    import Form from "../../../ui/Form.svelte";
    import Input from "../../../ui/Input.svelte";
    import Button from "../../../ui/Button.svelte";
    import {Colors} from "../../../ui/Colors";

    let email: string = 'myemail@email.com';
    let password: string = 'mypassword123';

    let locked: boolean = true;

</script>

<Card>
    <Form lockable bind:locked>
        <svelte:fragment slot="header">Edit Account</svelte:fragment>
        <svelte:fragment slot="header-actions"></svelte:fragment>
        <Input label="Email" bind:value={email} {locked}/>
        <Input label="Password" bind:value={password} {locked} {password}/>
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