<script lang="ts">

    export let startX, startY, endX, endY;

    // Based on these we can just use x, y, w, h for our div
    $: x = Math.min(startX, endX);
    $: y = Math.min(startY, endY);
    $: x2 = Math.max(startX, endX);
    $: y2 = Math.max(startY, endY);
    $: w = x2 - x;
    $: h = y2 - y;
    $: length = Math.sqrt(w * w + h * h)
    $: angle = Math.atan(h / w);
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
    }

</style>