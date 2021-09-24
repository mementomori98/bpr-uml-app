<script lang="ts">

    import {createEventDispatcher} from "svelte";

    export let label: string = "";
    export let value: string = "";
    export let password: boolean;
    export let focused: boolean;

    const dispatch = createEventDispatcher();

    const handleKeyDown = function (e: KeyboardEvent) {
        if (e.key == 'Enter')
            dispatch('enter');
    }

</script>

<div class="input">
    <div class="input__label">{label}</div>
    {#if password}
        <input bind:value class="input__content" type="password" on:keydown={handleKeyDown} autofocus={focused}/>
    {:else}
        <input bind:value class="input__content" on:keydown={handleKeyDown} autofocus={focused}/>
    {/if}
</div>

<style lang="scss">
    @import "../theme.scss";

    .input {
        width: 100%;
        padding: 4px 0;

        &__label {
            font: $font-label;
            padding: 8px 0;
        }

        &__content {
            border: $border-inactive;
            padding: 10px;
            outline: none;
            width: 100%;
            margin: 0;
            transition-duration: 200ms;
            border-radius: $border-radius-small;

            &:focus {
                border: $border;
                box-shadow: $shadow-small;
            }
        }
    }

</style>