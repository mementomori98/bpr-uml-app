<script lang="ts">
    import {CssBuilder} from "./utils/CssBuilder";

    export let style: string = "";
    export let height: number = 480;
    export let disabledBorder: boolean = false;
    export let hiddenVerticalScroll: boolean = false;

    $: wrapperStyle = new CssBuilder('wrapper')
        .addFeature('disabled-border', disabledBorder)
        .addFeature('hidden-vertical-scroll', hiddenVerticalScroll)
        .build();
</script>

<div style="margin: 0 -32px">
    <slot name="header"/>
</div>

<div class={wrapperStyle} style={`max-height: ${height}px; ${style};`}>
    <slot/>
</div>

<style lang="scss">
  @import "../ui/theme";

  .wrapper{
    overflow-y: overlay;
    overflow-x: hidden;
    border-bottom: 2px solid #d5d5d591; //was border:
    border-top: 2px solid #d5d5d591;
    margin: 0 -32px;

    &--disabled-border {
      border: 0;
    }

    &--hidden-vertical-scroll{

    }
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #e5e5e5;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #b0b0b0;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    width: 8px;
    background: #9a9a9a;
  }
</style>