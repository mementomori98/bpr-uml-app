<script lang="ts">
    import Container from "../../ui/Container.svelte";
    import WorkspaceForm from "./Forms/WorkspaceForm.svelte";
    import UsersCard from "./Users/UsersCard.svelte";
    import Wrapper from "../../ui/Wrapper.svelte";
</script>

<Container>
    <Wrapper bgColor="ffffff">
        <WorkspaceForm/>
        <UsersCard/>
    </Wrapper>
</Container>


<style lang="scss">
    @import "../../theme.scss";
</style>