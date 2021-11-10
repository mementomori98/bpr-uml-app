<script lang="ts">

import View from "../../components/ui/View.svelte";
import Input from "../../components/ui/Input.svelte";
import Button from "../../components/ui/Button.svelte";
import getService from "../utils/Services";
import {DiagramService} from "./DiagramService";
import {CreateDiagramRequest} from "./Models";

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
    @import "../../components/theme";

</style>