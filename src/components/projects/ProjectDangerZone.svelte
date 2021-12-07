<script lang="ts">
    import Card from "../../ui/Card.svelte";
    import View from "../../ui/View.svelte";
    import Button from "../../ui/Button.svelte";
    import {Colors} from "../../ui/utils/Colors";
    import {goto, params} from "@roxi/routify";
    import getService from "../utils/ServiceFactory";
    import {TeamService} from "../teams/TeamService";
    import {AppContext} from "../utils/AppContext";
    import {AuthenticationService} from "../auth/AuthenticationService";
    import {RemoveWorkspaceUserRequest} from "../users/Models";
    import {user} from "../users/UserSettingsDialog.svelte";
    import {UserService} from "../users/UserService";
    import {onMount} from "svelte";
    import {ProjectService} from "./ProjectService";
    import ConfirmDialog from "../workspaces/ConfirmDialog.svelte";
    import DangerItem from "../../ui/DangerItem.svelte";

    const projectService = getService(ProjectService);
    const userService = getService(UserService);

    let deleteVisible: boolean = false;
    let hasPermission: boolean = true;

    onMount(async () => {
        hasPermission = await userService.validateProjectPermissions('PO', $params.id)

    })

    const deleteProject = async () => {
        await projectService.deleteProject($params.id);
        $goto('/projects')
    }

</script>

{#if hasPermission}
    <Card borderSize="1" borderColor="ee1111">
        <View noPadding noActions>
            <svelte:fragment slot="header">Danger Zone</svelte:fragment>
            <DangerItem title="Delete Project"
                        description="Your project will be removed permanently. This action cannot be reversed!">
                <svelte:fragment slot="actionBtn">
                    <Button color="{Colors.Red}" on:click={() => deleteVisible = true}>Delete</Button>
                </svelte:fragment>
            </DangerItem>

        </View>
    </Card>
    <ConfirmDialog on:confirm={deleteProject} title="Delete Project"
                   description="Confirm project removal. This action cannot be reverted!" bind:visible={deleteVisible}/>
{/if}
<style lang="scss">
  @import "../../ui/theme";


</style>