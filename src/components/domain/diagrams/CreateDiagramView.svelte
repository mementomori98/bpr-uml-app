<script lang="ts">

import View from "../../ui/View.svelte";
import Input from "../../ui/Input.svelte";
import Button from "../../ui/Button.svelte";
import getService from "../../../services/Services";
import {DiagramService} from "../../../services/diagrams/DiagramService";
import {CreateDiagramRequest} from "../../../services/diagrams/Models";

const diagramService = getService(DiagramService)

let diagramName: string;

const handleCreate = async () => {
    await diagramService.create(new CreateDiagramRequest({
       folderId: 'dummy folder id',
       name: diagramName
    }));
}

</script>

<View>
    <svelte:fragment slot="header">Create Diagram</svelte:fragment>
    <svelte:fragment slot="header-actions"></svelte:fragment>
    <Input label="Folder" value="Some Id" locked/>
    <Input label="Name" bind:value={diagramName} />
    <svelte:fragment slot="actions">
        <Button on:click={handleCreate}>Create</Button>
    </svelte:fragment>
</View>

<style lang="scss">
    @import "../../theme.scss";

</style>