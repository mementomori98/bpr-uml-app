<script lang="ts">
    import Button from "./Button.svelte";
    import {createEventDispatcher} from "svelte";
    import {DataListItem} from "./utils/DataListItem";

    export let label: string = "";
    export let clearOnChoice: boolean = false;
    export let choices: DataListItem[];
    let choice: DataListItem;
    export let defaultChoice: string;
    export let btnText: string = "";
    export let hasButton: boolean = false;
    export let locked: boolean = false;
    let opened: boolean = false;
    const dispatch = createEventDispatcher();

    const handleRoleChoice = (e, role) => {
        e.stopPropagation();
        choice = role;
        opened = false;
        if(!hasButton){
            dispatch('submit', {choice: choice});
        }
        if(clearOnChoice){
            choice = null;
        }

    }

    const getChoice = () => {
        if(choice != null){
            return choice.name
        }else{
            if(defaultChoice != null){
                return defaultChoice
            }else{
                return choices[0].name
            }
        }
    }

    const handleSubmit = () => {
        console.log(defaultChoice + " Choice " + choices.find(x => x.name === defaultChoice))
        dispatch('submit', {choice: choices.find(x => x.name === defaultChoice)});
    }

    $: arrowDown = opened

</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</svelte:head>

<div class="wrapper">
    {#if choices.length > 0}
        <div class="label">{label}</div>
        <div style="display: flex">
            <div
                    class="select"
                    tabindex="0"

                    on:click={() => opened = !opened}
                    on:blur={() => opened = false}>
                {#if locked}
                    <div class="select__locked">
                        {choice != null ? choice.name : (defaultChoice != null ? defaultChoice : choices[0].name)}
                    </div>
                {:else}
                    <div class="select__value" style="display: flex; justify-content: space-between">
                        <div style="padding-right: 10px">
                            {choice != null ? choice.name : (defaultChoice != null ? defaultChoice : choices[0].name)}
                        </div>

                        <div class="fa fa-chevron-down" style="font-size: 14px; align-self: center;" class:arrowDown></div>

                    </div>
                {/if}

                {#if !locked}
                    <div class="select__items" hidden={!opened}>
                        {#each choices as item, i}
                            <div class="select__items-item" on:click={e => handleRoleChoice(e, item)}>
                                {item.name}
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
            {#if hasButton}
                <Button on:click={handleSubmit}>{btnText}</Button>
            {/if}


        </div>
    {:else}
        <div class="label">No available choices</div>
    {/if}


</div>



<style lang="scss">
  @import "../ui/theme";
  .arrowDown {
    transform: rotate(180deg);
  }


  .wrapper{
    padding: 16px 0;
  }

  .label {
    font: $font-label;
    padding: 8px 0;
  }

  .select {
    border: none;
    outline: 0;
    position: relative;
    width: 100%;
    min-width: 200px;
    &__items {
      background-color: white;
      position: absolute;
      z-index: 1001;
      width: 100%;
      box-shadow: 0 0 8px 3px rgba(0, 0, 0, 0.15);
    }

    &__items-item {

      padding: 8px;
      user-select: none;
      cursor: pointer;

      &:hover {
        background-color: #eeeeee;
      }

      & ~ & {
        border-top: 1px solid #eeeeee;
      }
    }

    &__locked {
      padding: 10px 10px 10px 0;
      user-select: none;
      width: 150px;
      font-size: 18px;
    }

    &__value {
      padding: 10px;
      user-select: none;
      cursor: pointer;
      width: 100%;
      font-size: 18px;
      border: 1px solid #9ebce2;
      border-radius: 2px;

      &:hover {
        background-color: #f6f6f6;
      }
    }
  }
</style>