<script lang="ts">

</script>

<div class="container">
    <div class="container__content">
        <slot/>
    </div>
</div>

<style lang="scss">
    @import "../theme.scss";

    .container {
        display: flex;
        justify-content: center;

        &__content {
            padding-top: 24px;
            max-width: 800px;
            width: 100%;
            display: flex;
            flex-direction: column;
        }
    }
</style>