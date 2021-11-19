<script lang="ts">

    import Card from "../../ui/Card.svelte";
    import Form from "../../ui/Form.svelte";
    import Input from "../../ui/Input.svelte";
    import Button from "../../ui/Button.svelte";
    import {Colors} from "../../ui/utils/Colors";
    import {onMount} from "svelte";
    import {goto} from "@roxi/routify";
    import getService from "../utils/ServiceFactory";
    import {WorkspaceService} from "./WorkspaceService";
    import {AppContext} from "../utils/AppContext";

    let workspaceName: string = '';
    const workspaceService = getService(WorkspaceService);
    const appContext = getService(AppContext);

    let locked: boolean = true;

    onMount(async () => {
        const res = await workspaceService.getById(appContext.getWorkspaceId());
        workspaceName = res.name;
    })

</script>

<Card>
    <Form lockable bind:locked>
        <svelte:fragment slot="header">Workspace</svelte:fragment>
        <Input label="Workspace name" bind:value={workspaceName} {locked}/>
    </Form>
</Card>

<style lang="scss">
  @import "../../ui/theme";

</style>