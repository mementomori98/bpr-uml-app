<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import {CssBuilder} from "./utils/CssBuilder";
    import {color, elevated, outlined, small} from "./Button.svelte";

    export let checked: boolean = false;
    export let disabled: boolean = false;
    export let aligned: boolean = false;
    const dispatch = createEventDispatcher();
    const handleClick = (event) => {
        // todo
        event.stopPropagation();
        dispatch('checkChange', {state: !checked});
    }

    $: wrapper = new CssBuilder('grid')
        .addFeature('aligned', aligned)
        .build();

</script>

<div class={wrapper}>
    <div class="checkbox bounce">
        <input disabled={disabled} bind:checked type="checkbox" on:click={handleClick}>
        <svg viewBox="0 0 21 21">
            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
        </svg>
    </div>
</div>

<style lang="scss">
  @import "../ui/theme";

  * {
    text-align: initial;
  }

  .grid {
    position: relative;

    &--aligned{
      width: 33%;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .checkbox,
  .bounce {
    width: 21px;
    height: 21px;
  }

  .checkbox {
    --background: #fff;
    --border: #D1D6EE;
    --border-hover: #BBC1E1;
    --border-active: #1E2235;
    --tick: #fff;

    input,
    svg {
      width: 21px;
      height: 21px;
      position: absolute;
    }

    input {
      -webkit-appearance: none;
      -moz-appearance: none;
      outline: none;
      background: var(--background);
      border: none;
      margin: 0;
      padding: 0;
      cursor: pointer;
      border-radius: 4px;
      transition: box-shadow .3s;
      box-shadow: inset 0 0 0 var(--s, 1px) var(--b, var(--border));

      &:hover {
        --s: 2px;
        --b: var(--border-hover);
      }

      &:disabled {
        --b: #cccccc;
        --s: 1px;
        --border-active: #cccccc;
        cursor: default;
      }

      &:checked {
        --b: var(--border-active);
      }
    }

    svg {
      pointer-events: none;
      fill: none;
      stroke-width: 2px;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke: var(--stroke, var(--border-active));
      width: 21px;
      height: 21px;
      transform: scale(var(--scale, 1)) translateZ(0);
    }

    &.path {
      input {
        &:checked {
          --s: 2px;
          transition-delay: .4s;

          & + svg {
            --a: 16.1 86.12;
            --o: 102.22;
          }
        }
      }

      svg {
        stroke-dasharray: var(--a, 86.12);
        stroke-dashoffset: var(--o, 86.12);
        transition: stroke-dasharray .6s, stroke-dashoffset .6s;
      }
    }

    &.bounce {
      --stroke: var(--tick);

      input {
        &:checked {
          --s: 11px;

          & + svg {
            animation: bounce .4s linear forwards .2s;
          }
        }
      }

      svg {
        --scale: 0;
      }
    }
  }

  @keyframes bounce {
    50% {
      transform: scale(1.2);
    }
    75% {
      transform: scale(.9);
    }
    100% {
      transform: scale(1);
    }
  }


</style>