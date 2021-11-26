<script context="module">
    // retain module scoped expansion state for each tree node
    const _expansionState = {
        /* treeNodeId: expanded <boolean> */
    }
</script>
<script>
    //	import { slide } from 'svelte/transition'
    export let tree = {}
    $: label = tree.label
    $: type = tree.type
    $: children = tree.children

    let expanded = _expansionState[label] || false
    const toggleExpansion = () => {
        expanded = _expansionState[label] = !expanded
    }
    $: arrowDown = expanded
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">                       rnv
</svelte:head>
<ul><!-- transition:slide -->
    <li>
        {#if children && type === "folder"}
			<span on:click={toggleExpansion}>
                <div class="item-wrapper">
                    <div class="fa fa-chevron-right" style="font-size: 10px; align-self: center" class:arrowDown></div>
                    <div class="fa fa-folder" style="font-size: 14px; padding-left: 12px; align-self: center"></div>
                    <div class="label">
                        {label}
                    </div>
                </div>
			</span>
            {#if expanded}
                {#each children as child}
                    <svelte:self tree={child}/>
                {/each}
            {/if}
        {:else}

            <div class="item-wrapper item-wrapper__no-arrow">
                <div class="fa fa-file" style="font-size: 14px; align-self: center;"></div>
                <div class="label">
                    {label}
                </div>
            </div>
        {/if}
    </li>
</ul>

<style lang="scss">
  @import "../ui/theme";

  ul {
    margin: 0;
    list-style: none;
    padding-left: 1.2em;
    user-select: none;

    & > * {
      color: white;
      font: 500 16px "Nunito", sans-serif;
    }
  }

  ul:first-child {
      padding-left: 0;
  }

    .label{
      padding-left: 3px;
      padding-right: 20px;
      align-self: center;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

  .arrow {
    cursor: pointer;
    display: inline-block;
    /* transition: transform 200ms; */
  }

  .item-wrapper {
    display: flex;
    height: 20px;

    &__no-arrow {
      padding-left: 19px;
    }
  }

  .arrowDown {
    transform: rotate(90deg);
  }
</style>
