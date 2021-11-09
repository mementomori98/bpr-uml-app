<script lang="ts">

import CreateProjectView from "../components/domain/projects/CreateProjectView.svelte";
import Card from "../components/ui/Card.svelte";
import Container from "../components/ui/Container.svelte";
import CreateDiagramView from "../components/domain/diagrams/CreateDiagramView.svelte";
import View from "../components/ui/View.svelte";
import DragList from "../components/ui/DragList.svelte";
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
    @import "../components/theme.scss";

</style>