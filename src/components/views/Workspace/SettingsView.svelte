<script lang="ts">
    import Container from "../../ui/Container.svelte";
    import WorkspaceForm from "./Forms/WorkspaceForm.svelte";
    import WorkspaceUsersCard from "./Users/WorkspaceUsersCard.svelte";
    import Wrapper from "../../ui/Wrapper.svelte";
    import WorkspaceDangerZone from "./WorkspaceDangerZone.svelte";

</script>


<Container>
    <Wrapper bgColor="ffffff">
        <WorkspaceForm/>
        <UsersCard/>
        <WorkspaceDangerZone/>
        <WorkspaceUsersCard/>
    </Wrapper>
</Container>


<style lang="scss">
    @import "../../theme.scss";
</style>
