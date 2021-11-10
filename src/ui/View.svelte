<script lang="ts">
    import {CssBuilder} from "./utils/CssBuilder";

    export let noPadding: boolean = false;
    export let noPaddingTop: boolean = false;
    export let noHeader: boolean = false;
    export let noActions: boolean = false;

    $: viewClass = new CssBuilder('view')
        .addFeature('no-padding-top', noPaddingTop)
        .addFeature('no-padding', noPadding)
        .build();
</script>

<div class={viewClass}>
    {#if !noHeader}
        <div class="view__header" style={`${noPadding ? "padding: 24px" : ""}`}>
            <div class="view__header-content">
                <slot name="header"/>
            </div>
            <div class="view__header-actions">
                <slot name="header-actions"/>
            </div>
        </div>
    {/if}
    <div class="view__content">
        <slot/>
    </div>
    {#if !noActions}
        <div class="view__actions">
            <slot name="actions"/>
        </div>
    {/if}

</div>

<style lang="scss">
    @import "./theme";

    .view {
        padding: 32px;
        width: 100%;

      &--no-padding{
        padding: 0;
      }

      &--no-padding-top{
        padding-top: 0;
      }

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