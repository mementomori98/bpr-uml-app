<script lang="ts">
    export let representation;

</script>

<div class="box">
    {representation.model.text}
</div>

<style lang="scss">
    @import "../../../ui/theme";

    .box {
        background-color: #d9cfa9;
        border: 1px solid black;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>