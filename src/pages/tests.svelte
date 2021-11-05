<script lang="ts">
import CreateProjectView from "../components/domain/projects/CreateProjectView.svelte";
import Card from "../components/ui/Card.svelte";
import Container from "../components/ui/Container.svelte";
import CreateDiagramView from "../components/domain/diagrams/CreateDiagramView.svelte";
import getService from "../services/Services";
import {AppContext} from "../services/utils/AppContext";
import Button from "../components/ui/Button.svelte";

const appContext = getService(AppContext);

const get = async () => {
    console.log(appContext.getWorkspaceId())
}
const set = async () => {
    appContext.setWorkspaceId("hukamuka")
}

</script>


<Container>
    <Card>
        <Button on:click={get} >Get</Button>
        <Button on:click={set} >Set</Button>
        <CreateProjectView/>
    </Card>
    <Card>
        <CreateDiagramView/>
    </Card>
</Container>



<style lang="scss">
    @import "../components/theme.scss";

</style>