<script lang="ts">
    const _expansionState = {}
    export let tree = {}
    const {label, type, children} = tree

    let expanded = _expansionState[label] || false
    const toggleExpansion = () => {
        expanded = _expansionState[label] = !expanded
    }
    $: arrowDown = expanded

    //fas fa-folder
    //	indeterminate_check_box
</script>


<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</svelte:head>
<div class="routy">
            {#if expanded}
                <div class="line-wrapper">
                    <div class="vertical">
                    </div>
                </div>
            {/if}
            {#if children}
                <div on:click={toggleExpansion} class="item-wrapper">
                    <div class="icon-wrapper">
                        {#if !expanded}
                            <div class="fa fa-plus icon"></div>
                        {:else}
                            <div class="fa fa-minus icon"></div>
                        {/if}
                    </div>
                    <div style="align-self: center">
                        {label}
                    </div>
                </div>
                {#if expanded}
                    {#each children as child}
                        <div style="display: flex">
                            <div class="horizontal">
                            </div>
                            <svelte:self tree={child}/>
                        </div>

                    {/each}
                {/if}
            {:else}
				<div class="no-arrow">{label}</div>
            {/if}
</div>

<style lang="scss">
  @import "../theme.scss";

  .routy {
    height: fit-content;
    position: relative;
  }

  ul {
    margin: 0;
    list-style: none;
    padding-left: 0;
    user-select: none;
  }

  li{
    position: relative
  }

  .no-arrow {
    padding-left: 17px;
    height: 20px;
  }

  .item-wrapper {
    display: flex;
    height: 20px;
  }

  .line-wrapper {
    position: absolute;
    height: 100%;
  }

  .vertical {
    height: 100%;

    &:before {
      content: "";
      display: block;
      position: relative;
      z-index: 1;
      top: 14px;
      height: calc(100% - 24px);
      border: 1px solid #dedede;
      border-width: 0 0 0 2px;
      z-index: -100;
    }
  }

  .horizontal {
    height: 100%;

    &:before {
      content: "";
      display: block;
      position: relative;
      z-index: 1;
      top: 9px;
      width: 15px;
      border: 1px solid #dedede;
      border-width: 2px 0 0 0;
    }
  }

  .icon-wrapper {
    margin-right: 5px;
    width: 10px;
    height: fit-content;
    align-self: center;
    padding-bottom: 5px
  }

  .icon {
    font-size: 7px;
    border: 2px solid #989898;
    color: #252525;
    padding: 2px 2px 1px 2px;
    border-radius: 2px;
  }

</style>
