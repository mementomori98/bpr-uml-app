<script lang="ts">

</script>

<div class="container">
    <div class="container__content">
        <slot/>
    </div>
</div>

<style lang="scss">
    @import "../ui/theme";

    .container {
        display: flex;
        justify-content: center;

        &__content {
            padding-top: 24px;
            max-width: 1024px;
            width: 100%;
            display: flex;
            flex-direction: column;
        }
    }
</style>