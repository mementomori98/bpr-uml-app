<script lang="ts">

    import {createEventDispatcher} from "svelte";
    import {CssBuilder} from "./utils/CssBuilder";

    export let label: string = "";
    export let value: string = "";
    export let password: boolean = false;
    export let focused: boolean = false;
    export let locked: boolean = false;
    export let showError: boolean = false;
    export let errorMessage: string = "";

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
        <div class={contentClass}>
            {#if password}
                ••••••••
            {:else}
                {value}
            {/if}
        </div>
    {:else}
        {#if password}
            <input bind:value class="{contentClass}" type="password" on:keydown={handleKeyDown} autofocus={focused}/>
        {:else}
            <input bind:value class="{contentClass}" on:keydown={handleKeyDown} autofocus={focused}/>
        {/if}
    {/if}
    {#if showError}
        <div class="input__error">{errorMessage}</div>
    {/if}
</div>

<style lang="scss">
    @import "../ui/theme";

    .input {
        min-width: 200px;
        width: 100%;
        padding: 16px 0;

        &__label {
            font: $font-label;
            padding: 8px 0;
        }

        &__error {
            padding: 2px 4px;
            position: absolute;
            color: nth($red, 1);
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 1px;
        }

        &__content {
          min-height: 50px;
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