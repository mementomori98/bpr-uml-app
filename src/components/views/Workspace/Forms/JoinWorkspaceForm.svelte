<script lang="ts">
import View from "../../../ui/View.svelte";
import Button from "../../../ui/Button.svelte";
import {Colors} from "../../../ui/Colors";
import getService from "../../../../services/Services";
import {WorkspaceService} from "../../../../services/Workspaces/WorkspaceService";
import {JoinWorkspaceRequest} from "../../../../services/Workspaces/Models";

export let workspaceName: string;
export let invitationId: string;

const workspaceService = getService(WorkspaceService);

const handleAccept = async () => {
    await workspaceService.join(new JoinWorkspaceRequest({
        invitationId: invitationId,
        accepted: true
    }));
    console.log('accepted');
}

const handleDecline = async () => {
    await workspaceService.join(new JoinWorkspaceRequest({
        invitationId: invitationId,
        accepted: false
    }));
    console.log('declined');
}

</script>

<View>
    <svelte:fragment slot="header">Join workspace</svelte:fragment>
    <svelte:fragment slot="header-actions"></svelte:fragment>
    Would you like to join {workspaceName}?
    <svelte:fragment slot="actions">
        <Button color={Colors.Gray} on:click={handleDecline}>Decline</Button>
        <Button on:click={handleAccept}>Join</Button>
    </svelte:fragment>
</View>

<style lang="scss">
    @import "../../../theme.scss";

</style>