<script lang="ts">
    import Container from "../../components/ui/Container.svelte";
    import Wrapper from "../../components/ui/Wrapper.svelte";
    import ProjectUsersCard from "./ProjectUsersCard.svelte";
    import ProjectTeamsCard from "./ProjectTeamsCard.svelte";
</script>

<Container>
    <Wrapper bgColor="ffffff">
        <ProjectUsersCard/>
        <ProjectTeamsCard/>
    </Wrapper>
</Container>

<style lang="scss">
  @import "../../components/theme";
</style>