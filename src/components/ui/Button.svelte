<script lang="ts">

    import {Colors} from "../utils/Colors";
    import {CssBuilder} from "../utils/CssBuilder";

    export let color: Colors = Colors.Blue;
    export let outlined: boolean = false;
    export let elevated: boolean = false;
    export let small: boolean = false;

    $: style = new CssBuilder('button')
        .addFeature(color)
        .addFeature('outlined', outlined)
        .addFeature('small', small)
        .addFeature('elevated', elevated)
        .build();

</script>

<div class={style} on:click>
    <div class="button__content">
        <slot/>
    </div>
</div>

<style lang="scss">
    @import "../theme.scss";

    .button {
        display: inline-block;
        background-color: red;
        padding: 6px 16px;
        margin: 4px;
        border-radius: $border-radius-small;
        user-select: none;
        cursor: pointer;
        transition-duration: 200ms;

        &__content {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 1.4em;
        }

        &--elevated {
            box-shadow: $shadow-small;
        }

        &--small {
          padding: 3px 10px;
        }

        @each $color in $colors {
            &--#{nth($color, 1)} {
                background-color: #{nth($color, 2)};
                color: #{nth($color, 3)};
                border: 1px solid #{darken(nth($color, 2), 5%)};

                &:active {
                    background-color: #{darken(nth($color, 2), 7%)};
                }

                &.button--outlined {
                    background-color: #{nth($color, 3)};
                    color: #{nth($color, 2)};
                    border: 1px solid #{nth($color, 2)};

                    &:active {
                        background-color: #{darken(nth($color, 3), 7%)};
                    }
                }
            }
        }

        &:hover {
            box-shadow: $shadow-small;
        }
    }
</style>