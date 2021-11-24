<script lang="ts">
    import Container from "../../ui/Container.svelte";
    import Wrapper from "../../ui/Wrapper.svelte";
    import ProjectUsersCard from "./ProjectUsersCard.svelte";
    import ProjectTeamsCard from "./ProjectTeamsCard.svelte";
</script>

<Container>
    <Wrapper>
        <ProjectUsersCard/>
        <ProjectTeamsCard/>
    </Wrapper>
</Container>

<style lang="scss">
  @import "../../ui/theme";
</style>