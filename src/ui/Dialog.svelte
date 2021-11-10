<script lang="ts">
    import Card from "./Card.svelte";
    import {fade} from 'svelte/transition'
    import {createEventDispatcher} from "svelte";

    export let visible: boolean = false;
    export let style: string = '';
    const dispatch = createEventDispatcher()

    const handleContainerClick = function (e: MouseEvent) {
        visible = false;
        dispatch('clickedOut')
    }

    const handleContentClick = function (e: MouseEvent) {
        e.stopPropagation()
    }

</script>

{#if visible}
    <div in:fade={{duration: 50}}
         out:fade={{duration: 50}}
         class="dialog__container"
         style={style}
         on:mousedown={handleContainerClick}>
        <div
                in:fade={{duration: 50}}
                out:fade={{duration: 50}}
                class="dialog__content"
                on:mousedown={handleContentClick}>
            <Card style={style}>
                <slot/>
            </Card>
        </div>
    </div>
{/if}

<style lang="scss">
    @import "../ui/theme";

    .dialog {
        &__container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(0, 0, 0, .2);
            z-index: 502;
        }

        &__content {

        }
    }
</style>
