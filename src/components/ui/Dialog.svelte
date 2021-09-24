<script lang="ts">
    import Card from "./Card.svelte";

    export let visible: boolean;

    const handleContainerClick = function (e: MouseEvent) {
        visible = false;
    }

    const handleContentClick = function (e: MouseEvent) {
        e.stopPropagation()
    }

</script>

{#if visible}
    <div class="dialog__container" on:mousedown={handleContainerClick}>
        <div class="dialog__content" on:mousedown={handleContentClick}>
            <Card>
                <slot/>
            </Card>
        </div>
    </div>
{/if}

<style lang="scss">
    @import "../theme.scss";

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