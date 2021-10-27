<script lang="ts">
    export let title: string
    export let description: string
</script>

<div class="wrapper">
    <div class="wrapper__text-section">
        <div class="wrapper__title">{title}</div>
        <div class="wrapper__description">{description}</div>
    </div>
    <slot name="actionBtn"/>
</div>


<style lang="scss">
  @import "../../theme.scss";

    .wrapper{
      display: flex;
      min-height: 60px;
      width: 100%;
      justify-content: space-between;
      display: flex;
      align-items: center;
      padding-right: 24px;

      &__text-section{
        padding: 8px 24px 32px 24px;
      }
      &__title{
        font: $font-nav;
        flex: 1;
      }
      &__description{

        font: $font-option;
        flex: 1;
      }
    }
</style>