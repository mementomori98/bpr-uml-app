<script lang="ts">
    import TreeView from "./TreeView.svelte";
    import TreeViewElement from "../ui/TreeViewElement.svelte";
    import {CssBuilder} from "../ui/utils/CssBuilder";
    import {noPadding} from "../ui/Text.svelte";

    export let tree = null;
    export let width: number = 200;
    export let height: number = 200;
    export let maxWidth: number = width;
    export let maxHeight: number = height;

    $: style = new CssBuilder('wrapper')
        .build();
</script>


<div class={style}>
    {#if tree !== null}
        <TreeViewElement tree={tree}/>
    {/if}
</div>


<style lang="scss">
  @import "../theme.scss";

  .wrapper {
    width: calc(100% - 24px);
    min-height: 200px;
    max-height: 200px;
    border-radius: 5px;
    padding: 10px 0px 15px 0;
    margin: 0 12px 0 12px;
    background-color: #30476a;
    overflow: overlay;
    border: 1px solid #dfdfff4d;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: rgba(37, 60, 94, 0.38);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-corner {
    background: #30476a;
    border-radius: 0 0 10px 0;

  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(151, 151, 210, 0.38);
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    border-radius: 10px;
    background: rgba(156, 156, 217, 0.56);
  }
</style>