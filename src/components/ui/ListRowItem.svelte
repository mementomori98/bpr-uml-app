<script lang="ts">
    export let widthInPercentage: number = 10;
</script>

<div style={`width: ${widthInPercentage}%;`}>
    <slot/>
</div>

<style lang="scss">
  @import "../theme.scss";

</style>