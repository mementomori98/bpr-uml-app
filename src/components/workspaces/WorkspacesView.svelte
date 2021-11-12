<script lang="ts">
    import Container from "../../ui/Container.svelte";
    import WorkspaceForm from "./WorkspaceForm.svelte";
    import WorkspaceUsersCard from "./WorkspaceUsersCard.svelte";
    import Wrapper from "../../ui/Wrapper.svelte";
    import WorkspaceDangerZone from "./WorkspaceDangerZone.svelte";
    import WorkspaceTeamsCard from "./WorkspaceTeamsCard.svelte";

</script>


<Container>
    <Wrapper bgColor="ffffff">
        <WorkspaceForm/>
        <WorkspaceUsersCard/>
        <WorkspaceTeamsCard/>
        <WorkspaceDangerZone/>
    </Wrapper>
</Container>


<style lang="scss">
    @import "../../ui/theme";
</style>
