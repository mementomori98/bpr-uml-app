<script lang="ts">
    import Container from "../../ui/Container.svelte";
    import WorkspaceForm from "./WorkspaceForm.svelte";
    import UsersCard from "./Users/UsersCard.svelte";
</script>

<Container>
    <WorkspaceForm/>
    <UsersCard/>
</Container>

<style lang="scss">
    @import "../../theme.scss";
</style>