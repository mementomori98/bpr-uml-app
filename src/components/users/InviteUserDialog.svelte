<script lang="ts">
    import Dialog from "../../ui/Dialog.svelte";
    import Form from "../../ui/Form.svelte";
    import Button from "../../ui/Button.svelte";
    import {Colors} from "../../ui/utils/Colors";
    import Input from "../../ui/Input.svelte";
    import {UserInvitationRequest} from "./Models";
    import getService from "../utils/ServiceFactory";
    import {UserService} from "./UserService";
    import {AppContext} from "../utils/AppContext";

    export let visible: boolean = false;
    const userService = getService(UserService);
    const appContext = getService(AppContext);
    let email: string;

    const handleSubmit = async () => {
        console.log("heyy")
        const test = await userService.inviteUser(new UserInvitationRequest(
            {
                inviteeEmailAddress: email,
                workspaceId: appContext.getWorkspaceId(),
            })).catch(function (ex) {
                console.log("ex", ex)
            return ex;
        });;
        //***************************
        email = '';
        visible = false;
    }

    const handleCancel = () => {
        email = '';
        visible = false;
    }

</script>

<Dialog bind:visible>
    <Form on:submit={handleSubmit} on:cancel={handleCancel} submitText="Invite" cancelButton>
        <svelte:fragment slot="header">Invite User</svelte:fragment>
        <svelte:fragment slot="header-actions"></svelte:fragment>
        <Input label="Email" bind:value={email}/>
    </Form>
</Dialog>

<style lang="scss">
  @import "../../ui/theme";

</style>