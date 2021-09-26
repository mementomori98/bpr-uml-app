<script lang="ts">

    import {createEventDispatcher, onDestroy} from "svelte";

    export let target = null;

    export let mouseX: number = 0;
    export let mouseY: number = 0;

    let clientX: number = 0;
    let clientY: number = 0;

    let dispatch = createEventDispatcher();

    let dragging: boolean = false;


    const handleMouseDown = e => {
        if (e.button == 0 && e.target == (target ?? e.target)) {
            dragging = true;
            dispatch('dragstart');
        }
        mouseX = e.clientX - (target?.offsetLeft ?? 0);
        mouseY = e.clientY - (target?.offsetTop ?? 0);
        clientX = e.clientX;
        clientY = e.clientY;
    };

    const handleMouseUp = e => {
        if (!dragging)
            return;
        if (e.button == 0) {
            dragging = false;
            dispatch('dragend');
        }
    };

    const handleMouseMove = e => {
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
    };

    const handleMouseWheel = (e: WheelEvent) => {
        if (e.target == (target ?? e.target)) {
            dispatch('scroll', e.deltaY);
        }
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousewheel', handleMouseWheel);

    onDestroy(() => {
        console.log('destroyed');
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mousewheel', handleMouseWheel);
    });

</script>


<style lang="scss">
    @import "../theme.scss";

</style>