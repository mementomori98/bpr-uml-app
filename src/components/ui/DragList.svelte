<script lang="ts">
    import {draggable} from "./utils/draggable";
    import Hoverable from "./utils/Hoverable.svelte";

    export let items: Array<any> = ['hello', 'world', 'how', 'are', 'you']
    let active = null;
    let hovered = null;
    let before = false;

    let dx = 0;
    let dy = 0;

    const start = (e, item) => {
        active = item;
        [dx, dy] = [e.detail.x, e.detail.y]
    }

    const drag = e => {
        // [dx, dy] = [e.detail.dx, e.detail.dy];
    }

    const end = () => {
        [dx, dy] = [0, 0];
        if (hovered === null) {
            active = null;
            return;
        }
        const a = items.indexOf(active);
        const h = items.indexOf(hovered);
        items[h] = active;
        items[a] = hovered;
        active = null;
        hovered = null;
        end();
    }

    const hover = (e, item) => {
        hovered = item;
    }

    const leave = (e, item) => {
        if (item === hovered)
            hovered = null;
    }

    const up = (e, item) => {
        if (item == active)
            return;
        let before = e.offsetY / e.target.clientHeight < 0.5;

        // remove 'active'
        items.splice(items.indexOf(active), 1);

        // insert 'active' at 'item' - before or after
        let i = items.indexOf(item);
        if (before)
            i++;
        items.splice(i, 0, active);
    }

    const move = (e, item) => {
        if (item !== hovered)
            return;
        before = e.offsetY / e.target.clientHeight < 0.5;
        if (active === null)
            return;
        [dx, dy] = [e.clientX, e.clientY];
    }

</script>

<div style="user-select: none;">
    {#each items as item}
        <div
                class="outer"
                on:mouseenter={e => hover(e, item)}
                on:mouseleave={e => leave(e, item)}
                on:mouseup={e => up(e, item)}
                on:mousemove={e => move(e, item)}
                class:before={hovered === item && before === true && active}
                class:after={hovered === item && before === false && active}>
            <div
                    class="ordinary"
                    style="left: {dx}px;top: {dy}px"
                    class:hovered={hovered === item && active === null}
                    class:relative={active === item}
                    use:draggable
                    on:panstart={e => start(e, item)}
                    on:panmove={drag}
                    on:panend={end}>
                {item}
            </div>
        </div>
    {/each}
</div>

<style lang="scss">
    $border: #73b6fc;

    .ordinary {
        transition-duration: 100ms;
        background-color: white;
        padding: 8px;
    }

    .relative {
        transition-duration: 0ms;
        position: absolute;
        background-color: darkgray !important;
        pointer-events: none;
    }

    .hovered {
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, .1);
    }

    .outer {
        transition-duration: 300ms;
    }

    .outer::before {
        content: " ";
        display: block;
        position: relative;
        height: 2px;
    }

    .outer::after {
        content: " ";
        display: block;
        position: relative;
        height: 2px;
        top: -2px;
    }

    .before::before {
        background-color: $border;
    }

    .after::after {
        background-color: $border;
    }
</style>


