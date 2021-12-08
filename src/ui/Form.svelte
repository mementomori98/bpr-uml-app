<script lang="ts">
    import View from "./View.svelte";
    import Button from "./Button.svelte";
    import {Colors} from "./utils/Colors";
    import {createEventDispatcher} from "svelte";

    export let readonly = false;
    export let lockable = readonly;
    export let locked = lockable;
    export let submitText: string = 'Submit';
    export let cancelButton: boolean = false;

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
        <slot name="footer-actions"/>
        {#if  !readonly}
            {#if lockable && !readonly}
                {#if locked && lockable}
                    <Button color={Colors.Gray} on:click={handleEdit}>Edit</Button>
                {:else}
                    <Button on:click={handleCancel} color={Colors.Gray}>Cancel</Button>
                    <Button on:click={handleSubmit}>{submitText}</Button>
                {/if}
            {:else}
                {#if cancelButton}
                    <Button color={Colors.Gray} on:click={handleCancel}>Cancel</Button>
                {/if}
                <Button on:click={handleSubmit}>{submitText}</Button>
            {/if}
        {/if}
    </svelte:fragment>
</View>

<style lang="scss">
    @import "../ui/theme";

</style>