<script lang="ts">
    import {CssBuilder} from "./CssBuilder";

    export let noPadding: boolean = false;

    $: style = new CssBuilder('text')
        .addFeature('no-padding', noPadding)
        .build();

</script>

<div class={style}>
    <slot/>
</div>

<style lang="scss">
  @import "../theme.scss";

  .text {
    font: $font-nav;
    padding-top: 20px;

    &--no-padding{
      padding: 0;
    }
  }
</style>