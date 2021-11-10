<script lang="ts">
    import View from "../../components/ui/View.svelte";
    import Button from "../../components/ui/Button.svelte";
    import Input from "../../components/ui/Input.svelte";
    import getService from "../utils/Services";
    import {ProjectService} from "./ProjectService";
    import {CreateProjectRequest} from "./Models";

    const projectService = getService(ProjectService);

    let projectName: string;

    const handleCreate = async () => {
        await projectService.create(new CreateProjectRequest({
            name: projectName
        }));
    }

</script>


<View>
    <svelte:fragment slot="header">Create Project</svelte:fragment>
    <svelte:fragment slot="header-actions"></svelte:fragment>
    <Input label="Project Name" bind:value={projectName}/>
    <svelte:fragment slot="actions">
        <Button on:click={handleCreate}>Create</Button>
    </svelte:fragment>
</View>