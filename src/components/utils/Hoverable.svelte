<script lang="ts">
    let hovering = false;

    const enter = e => {
        hovering = true;
    };

    const leave = e => {
        hovering = false;
    };
</script>

<div on:mouseenter={enter} on:mouseleave={leave}>
    <slot hovering={hovering}/>
</div>

<style lang="scss">
    @import "../theme";

</style>




