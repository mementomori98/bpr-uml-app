<script lang="ts">
    import Wrapper from "./Wrapper.svelte";

    export let width: number;
</script>

<Wrapper width={width} verticalCentering>
    <slot/>
</Wrapper>