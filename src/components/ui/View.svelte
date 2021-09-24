<script lang="ts">

</script>

<div class="view">
    <div class="view__header">
        <div class="view__header-content">
            <slot name="header"/>
        </div>
        <div class="view__header-actions">
            <slot name="header-actions"/>
        </div>
    </div>
    <div class="view__content">
        <slot/>
    </div>
    <div class="view__actions">
        <slot name="actions"/>
    </div>
</div>

<style lang="scss">
    @import "../theme.scss";

    .view {
        padding: 32px;
        width: 100%;

        &__header {
            display: flex;
            padding-bottom: 24px;

            &-content {
                display: flex;
                align-items: center;
                font: $font-title;
                flex: 1;
            }

            &-actions {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding-top: 24px;
            }
        }

        &__content {

        }

        &__actions {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-top: 24px;
        }
    }
</style>