<script lang="ts">

    import {createEventDispatcher} from "svelte";

    export let target = null;

    export let mouseX: number = 0;
    export let mouseY: number = 0;

    let dispatch = createEventDispatcher();

    let dragging: boolean = false;

    window.addEventListener('mousedown', e => {
        if (e.button == 0 && e.target == (target ?? e.target)){
            dragging = true;
            dispatch('dragstart');
        }
    });

    window.addEventListener('mouseup', e => {
        if (e.button == 0) {
            dragging = false;
            dispatch('dragend');
        }
    });

    window.addEventListener('mousemove', e => {
        if (dragging) {
            dispatch('drag', {
                dx: e.clientX - (target?.offsetLeft ?? 0) - mouseX,
                dy: e.clientY - (target?.offsetTop ?? 0) - mouseY
            });
        }
        mouseX = e.clientX - (target?.offsetLeft ?? 0);
        mouseY = e.clientY - (target?.offsetTop ?? 0);

    });

    window.addEventListener('mousewheel', (e: WheelEvent) => {
        if (e.target == (target ?? e.target)) {
            dispatch('scroll', e.deltaY);
        }
    });
</script>


<style lang="scss">
    @import "../theme.scss";

</style>