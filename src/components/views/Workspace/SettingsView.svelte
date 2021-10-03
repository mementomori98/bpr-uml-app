<script lang="ts">
    import Container from "../../ui/Container.svelte";
    import WorkspaceForm from "./Forms/WorkspaceForm.svelte";
    import UsersCard from "./Users/UsersCard.svelte";
    import Centerer from "../../ui/Centerer.svelte";
</script>

<Container>
    <Centerer>
        <WorkspaceForm/>
        <UsersCard/>
    </Centerer>
</Container>


<style lang="scss">
    @import "../../theme.scss";
</style>