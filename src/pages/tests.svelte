<script lang="ts">
import CreateProjectView from "../components/projects/CreateProjectView.svelte";
import Card from "../ui/Card.svelte";
import Container from "../ui/Container.svelte";
import CreateDiagramView from "../components/diagrams/CreateDiagramView.svelte";
import View from "../ui/View.svelte";
import DragList from "../ui/DragList.svelte";
import getService from "../components/utils/ServiceFactory";
import {AppContext} from "../components/utils/AppContext";
import Button from "../ui/Button.svelte";
import Line from "../components/utils/Line.svelte";

const appContext = getService(AppContext);


</script>


<Container>
    <Card>
        <View>
            <svelte:fragment slot="header"></svelte:fragment>
            <svelte:fragment slot="header-actions"></svelte:fragment>
                <Line startX="10" startY="10" endX="100" endY="100"/>
            <svelte:fragment slot="actions"></svelte:fragment>
        </View>
    </Card>
    <Card>
        <View>
            <svelte:fragment slot="header">Draggable List</svelte:fragment>
            <svelte:fragment slot="header-actions"></svelte:fragment>
            <DragList/>
            <svelte:fragment slot="actions"></svelte:fragment>
        </View>
    </Card>
</Container>



<style lang="scss">
    @import "../ui/theme";

</style>
