<script lang="ts">
    import Card from "../components/ui/Card.svelte";
    import View from "../components/ui/View.svelte";
    import Input from "../components/ui/Input.svelte";
    import Button from "../components/ui/Button.svelte";
    import {Colors} from "../components/ui/Colors";
    import {factory} from "../services/Factory";
    import {AuthenticationService} from "../services/AuthenticationService";
    import {goto} from "@roxi/routify";
    import Wrapper from "../components/ui/Wrapper.svelte";

    let name: string;
    let email: string = "someone@random.com";
    let authenticationService = factory.get<AuthenticationService>();

    const handleFinish = () => {
        // todo
        authenticationService.login('', '');
        $goto('/');
    }

</script>

<Wrapper width="480" verticalCentering bgColor="ededed">
    <Card>
        <View>
            <svelte:fragment slot="header">Onboard</svelte:fragment>
            <svelte:fragment slot="header-actions"></svelte:fragment>
            <Input label="Email" value={email} locked/>
            <Input label="Name" bind:value={name} focused/>
            <svelte:fragment slot="actions">
                <Button on:click={handleFinish}>Finish</Button>
            </svelte:fragment>
        </View>
    </Card>
</Wrapper>

<style lang="scss">

</style>