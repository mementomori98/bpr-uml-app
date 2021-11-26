<script lang="ts">
    import TreeView from "./TreeView.svelte";
    import TreeViewElement from "./TreeViewElement.svelte";
    import {CssBuilder} from "./utils/CssBuilder";
    import {noPadding} from "./Text.svelte";

    export let tree = null;
    export let width: number = 240;

</script>


<div class="wrapper" style={`width: ${width}px;`}>
    <div class="content">
        {#if tree !== null}
            <TreeViewElement {tree}/>
        {/if}
    </div>
</div>


<style lang="scss">
    @import "../ui/theme";

    .wrapper {
        height: calc(100%);
        padding: 8px;
        background-color: transparent;
    }

    .content {
        border-radius: $border-radius-medium;
        background-color: #30476a;
        border: 1px solid #dfdfff4d;
        overflow-y: auto;
        overflow-x: auto;
        height: 100%;
        width: 100%;
        padding: 8px;
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