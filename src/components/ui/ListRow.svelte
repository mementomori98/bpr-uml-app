<script lang="ts">
    import {CssBuilder} from "./CssBuilder";

    export let isHeader: boolean = false;
    export let noFunction: boolean = false;
    export let style: string = "";

    $: wrapper = new CssBuilder('row')
        .addFeature('header', isHeader)
        .addFeature('useless', noFunction)
        .build();
    $: dividerStyle = new CssBuilder('divider')
        .addFeature('header', isHeader)
        .build();
</script>

<div class={wrapper} style={style} on:click>
    <slot/>
</div>
<div class={dividerStyle}/>

<style lang="scss">
  @import "../theme.scss";

  .row {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 14px;
    cursor: pointer;

    &--header {
      font-weight: 800;
      padding: 0 14px;
      min-height: 48px;
      cursor: default;
    }

    &--useless {
      cursor: default;
    }
  }
  .divider {
    border-bottom: .5px solid rgba(0, 0, 0, .2);

    &--header {
      border-bottom: 2px solid #858585;
    }
  }

</style>