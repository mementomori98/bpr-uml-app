<script lang="ts">
    import Container from "../../ui/Container.svelte";
    import Wrapper from "../../ui/Wrapper.svelte";
    import ProjectUsersCard from "./Users/ProjectUsersCard.svelte";
    import ProjectTeamsCard from "./Users/ProjectTeamsCard.svelte";
</script>

<Container>
    <Wrapper bgColor="ffffff">
        <ProjectUsersCard/>
        <ProjectTeamsCard/>
    </Wrapper>
</Container>

<style lang="scss">
  @import "../../theme.scss";
</style>