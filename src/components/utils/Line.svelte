<script lang="ts">

    export let startX, startY, endX, endY;


    const bias = () => {
        if (w < 0)
            return -3.14;
        return 0;
    }
    // Based on these we can just use x, y, w, h for our div
    $: x = startX;
    $: y = startY;
    $: w = endX - x;
    $: h = endY - y;
    $: length = Math.sqrt(w * w + h * h)
    $: angle = Math.atan(h / w) + bias();

</script>

<div class="line" style={`left: ${x}px;top: ${y}px;width: ${length}px;transform: rotate(${angle}rad);`}>

</div>

<style lang="scss">
    @import "../../ui/theme.scss";

    .line {
        height: 0;
        border-bottom: 2px solid black;
        position: absolute;
        display: inline-block;
        transform-origin: top left;
        z-index: 2;
    }

</style>