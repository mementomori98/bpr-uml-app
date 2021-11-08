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
    <ul>
        <li>
            <div class="line-wrapper">
                <div class="test">
                </div>
            </div>

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
                        <svelte:self tree={child}/>
                    {/each}
                {/if}
            {:else}
			<span>
				<span class="no-arrow"></span>

                {label}
			</span>
            {/if}

        </li>
    </ul>
</div>

<style lang="scss">
  @import "../theme.scss";

  .routy {
    height: fit-content;

    & > ul > li > .line-wrapper {
      height: 300px;
    }
  }

  ul {
    margin: 0;
    list-style: none;
    padding-left: 1.2rem;
    user-select: none;
  }

  .no-arrow {
    padding-left: 1.0rem;
  }

  .item-wrapper {
    display: flex;
  }

  .line-wrapper {
    position: absolute;
  }

  .test {
    height: 100%;
    &:before {
      content: "";
      display: block;
      position: relative;
      z-index: 1;
      top: 18px;
      height: 100%;
      border: 1px solid red;
      border-width: 0 0 0 2px;
    }
  }

  .icon-wrapper {
    margin-right: 5px;
    width: fit-content;
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
