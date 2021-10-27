<script lang="ts">
    import Button from "./Button.svelte";
    import {createEventDispatcher} from "svelte";

    export let label: string = "";
    export let choice: string = "";
    export let choices: string[];
    export let btnText: string = "";
    export let hasButton: boolean = false;
    export let locked: boolean = false;
    let opened: boolean = false;
    const dispatch = createEventDispatcher();

    const handleRoleChoice = (role) => {
        choice = role;
        opened = false;
        if(!hasButton){
            dispatch('submit', {role: choice});
        }

    }

    const handleSubmit = () => {
        dispatch('submit', {role: choice});
    }
</script>

<div class="wrapper">
    <div class="label">{label}</div>
    <div style="display: flex">
        <div
                class="select"
                tabindex="0"
                on:focus={() => opened = true}
                on:blur={() => opened = false}>
            {#if locked}
                <div class="select__locked">
                    {choice}
                </div>
            {:else}
                <div class="select__value">
                    {choice}
                </div>
            {/if}

            {#if !locked}
                <div class="select__items" hidden={!opened}>
                    {#each choices as item, i}
                        <div class="select__items-item" on:click={() => handleRoleChoice(item)}>
                            {item}
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
        {#if hasButton}
            <Button on:click={handleSubmit}>{btnText}</Button>
        {/if}


    </div>

</div>



<style lang="scss">
  @import "../theme.scss";

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