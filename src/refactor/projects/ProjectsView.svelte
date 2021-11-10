<script lang="ts">
    import Container from "../../components/ui/Container.svelte";
    import Wrapper from "../../components/ui/Wrapper.svelte";
    import ProjectUsersCard from "./ProjectUsersCard.svelte";
    import ProjectsCard from "./ProjectsCard.svelte";
</script>

<Container>
    <Wrapper bgColor="ffffff">
        <ProjectsCard/>
    </Wrapper>
</Container>

<style lang="scss">
  @import "../../components/theme";
</style>