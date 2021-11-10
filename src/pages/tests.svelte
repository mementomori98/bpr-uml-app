<script lang="ts">
import CreateProjectView from "../components/projects/CreateProjectView.svelte";
import Card from "../ui/Card.svelte";
import Container from "../ui/Container.svelte";
import CreateDiagramView from "../refactor/diagrams/CreateDiagramView.svelte";
import View from "../ui/View.svelte";
import DragList from "../ui/DragList.svelte";
import getService from "../refactor/utils/ServiceFactory";
import {AppContext} from "../refactor/utils/AppContext";
import Button from "../ui/Button.svelte";

const appContext = getService(AppContext);


</script>


<Container>
    <Card>
        <View>
            <svelte:fragment slot="header">Draggable List</svelte:fragment>
            <svelte:fragment slot="header-actions"></svelte:fragment>
            <DragList/>
            <svelte:fragment slot="actions"></svelte:fragment>
        </View>
    </Card>
    <Card>
        <CreateProjectView/>
    </Card>
    <Card>
        <CreateDiagramView/>
    </Card>
</Container>



<style lang="scss">
    @import "../ui/theme";

</style>
