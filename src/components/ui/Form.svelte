<script lang="ts">


    import View from "./View.svelte";
    import Button from "./Button.svelte";
    import {Colors} from "./Colors";
    import {createEventDispatcher} from "svelte";

    export let lockable = false;
    export let locked = lockable;
    export let submitText: string = 'Submit';

    const dispatch = createEventDispatcher();

    const handleCancel = () => {
        locked = true;
        dispatch('cancel');
    }

    const handleSubmit = () => {
        locked = true;
        dispatch('submit');
    }

    const handleEdit = () => {
        locked = false;
    }

</script>

<View>
    <svelte:fragment slot="header">
        <slot name="header"/>
    </svelte:fragment>
    <svelte:fragment slot="header-actions">
        <slot name="header-actions"/>
    </svelte:fragment>
    <slot/>
    <svelte:fragment slot="actions">
        {#if lockable}
            {#if locked && lockable}
                <Button color={Colors.Gray} on:click={handleEdit}>Edit</Button>
            {:else}
                <Button on:click={handleCancel} color={Colors.Gray}>Cancel</Button>
                <Button on:click={handleSubmit}>{submitText}</Button>
            {/if}
        {:else}
            <Button on:click={handleSubmit}>{submitText}</Button>
        {/if}

    </svelte:fragment>
</View>

<style lang="scss">
    @import "../theme.scss";

</style>