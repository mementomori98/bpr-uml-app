<script lang="ts">

    import getService from "../components/utils/ServiceFactory";
    import {Snackbar} from "../components/utils/Snackbar";

    let snackbar = getService(Snackbar);

    snackbar.callback = () => snackbar = snackbar;

</script>

{#each snackbar.items as item, i}
    <div class="snackbar" style="top: {90 + i * 60}px;">
        {item.text}
    </div>
{/each}

<style lang="scss">
    @import "../ui/theme";

    .snackbar {
        padding: 8px 16px;
        position: absolute;
        width: 250px;
        left: calc(100% - 270px);
        background-color: nth($blue, 1);
        color: nth($blue, 2);
        box-shadow: $shadow-medium;
        border-radius: $border-radius-small;
    }
</style>