<script lang="ts">
    import {CssBuilder} from "./utils/CssBuilder";

    export let noPadding: boolean = false;

    $: style = new CssBuilder('text')
        .addFeature('no-padding', noPadding)
        .build();

</script>

<div class={style}>
    <slot/>
</div>

<style lang="scss">
  @import "../ui/theme";

  .text {
    font: $font-sec-title;
    padding: 34px 0 6px 0;

    &--no-padding{
      padding: 0 0 6px 0;
    }
  }
</style>