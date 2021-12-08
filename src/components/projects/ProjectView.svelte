<script lang="ts">
    import Container from "../../ui/Container.svelte";
    import Wrapper from "../../ui/Wrapper.svelte";
    import ProjectUsersCard from "./ProjectUsersCard.svelte";
    import ProjectTeamsCard from "./ProjectTeamsCard.svelte";
    import ProjectForm from "./ProjectForm.svelte";
    import ProjectDangerZone from "./ProjectDangerZone.svelte";
</script>

<Container>
    <Wrapper>
        <ProjectForm/>
        <ProjectUsersCard/>
        <ProjectTeamsCard/>
        <ProjectDangerZone/>
    </Wrapper>
</Container>

<style lang="scss">
  @import "../../ui/theme";
</style>