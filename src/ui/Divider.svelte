<script lang="ts">

    import {CssBuilder} from "./utils/CssBuilder";

    export let noPadding: boolean = false;

    $: wrapperStyle = new CssBuilder('divider__wrapper')
        .addFeature('no-padding', noPadding)
        .build();
</script>

<div class={wrapperStyle}>
    <div class="divider"></div>
</div>

<style lang="scss">
    @import "../ui/theme";

    .divider {
        &__wrapper {
            width: 100%;
            padding: 12px;

          &--no-padding{
            padding: 0;
          }
        }

        height: 1px;
        background-color: #dedede;
    }
</style>