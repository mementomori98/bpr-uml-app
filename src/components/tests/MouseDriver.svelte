<script lang="ts">

    import {createEventDispatcher} from "svelte";

    export let target = null;

    export let mouseX: number = 0;
    export let mouseY: number = 0;

    let clientX: number = 0;
    let clientY: number = 0;

    let dispatch = createEventDispatcher();

    let dragging: boolean = false;

    window.addEventListener('mousedown', e => {
        if (e.button == 0 && e.target == (target ?? e.target)){
            dragging = true;
            dispatch('dragstart');
        }
        mouseX = e.clientX - (target?.offsetLeft ?? 0);
        mouseY = e.clientY - (target?.offsetTop ?? 0);
        clientX = e.clientX;
        clientY = e.clientY;
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
                dx: e.clientX - clientX,
                dy: e.clientY - clientY
            });
        }
        mouseX = e.clientX - (target?.offsetLeft ?? 0);
        mouseY = e.clientY - (target?.offsetTop ?? 0);
        clientX = e.clientX;
        clientY = e.clientY;
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