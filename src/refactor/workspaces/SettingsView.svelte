<script lang="ts">
    import Container from "../../components/ui/Container.svelte";
    import WorkspaceForm from "./WorkspaceForm.svelte";
    import WorkspaceUsersCard from "./WorkspaceUsersCard.svelte";
    import Wrapper from "../../components/ui/Wrapper.svelte";
    import WorkspaceDangerZone from "./WorkspaceDangerZone.svelte";
    import WorkspaceTeamsCard from "./WorkspaceTeamsCard.svelte";

</script>


<Container>
    <Wrapper bgColor="ffffff">
        <WorkspaceForm/>
        <WorkspaceDangerZone/>
        <WorkspaceUsersCard/>
        <WorkspaceTeamsCard/>
    </Wrapper>
</Container>


<style lang="scss">
    @import "../../components/theme";
</style>
