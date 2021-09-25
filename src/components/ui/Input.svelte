<script lang="ts">

    import {createEventDispatcher} from "svelte";
    import {CssBuilder} from "./CssBuilder";

    export let label: string = "";
    export let value: string = "";
    export let password: boolean;
    export let focused: boolean;
    export let locked: boolean = false;

    const dispatch = createEventDispatcher();

    const handleKeyDown = function (e: KeyboardEvent) {
        if (e.key == 'Enter')
            dispatch('enter');
    }

    $: contentClass = new CssBuilder('input__content')
        .addFeature('locked', locked)
        .build();

</script>

<div class="input">
    <div class="input__label">{label}</div>
    {#if locked}
        <div class={contentClass}>{value}</div>
    {:else}
        {#if password}
            <input bind:value class="{contentClass}" type="password" on:keydown={handleKeyDown} autofocus={focused}/>
        {:else}
            <input bind:value class="{contentClass}" on:keydown={handleKeyDown} autofocus={focused}/>
        {/if}
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
            font: $font-form;

            &:focus {
                border: $border;
                box-shadow: $shadow-small;
            }

            &--locked {
                border: 1px solid transparent;
                padding-left: 0;

                &:focus {
                    box-shadow: none;
                    outline: none;
                }
            }
        }
    }

</style>