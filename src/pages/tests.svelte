<script lang="ts">
import CreateProjectView from "../components/domain/projects/CreateProjectView.svelte";
import Card from "../components/ui/Card.svelte";
import Container from "../components/ui/Container.svelte";
import CreateDiagramView from "../components/domain/diagrams/CreateDiagramView.svelte";
import getService from "../services/Services";
import {AppContext} from "../services/utils/AppContext";
import Button from "../components/ui/Button.svelte";

const appContext = getService(AppContext);


</script>


<Container>
    <Card>
        <CreateProjectView/>
    </Card>
    <Card>
        <CreateDiagramView/>
    </Card>
</Container>



<style lang="scss">
    @import "../components/theme.scss";

</style>