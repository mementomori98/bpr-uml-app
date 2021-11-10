<script>

    import {io} from "socket.io-client";
    import {onMount} from "svelte";
    import Card from "../../ui/Card.svelte";
    import View from "../../ui/View.svelte";
    import Input from "../../ui/Input.svelte";
    import Button from "../../ui/Button.svelte";
    import Wrapper from "../../ui/Wrapper.svelte";
    import Container from "../../ui/Container.svelte";

    let value;
    let response = '';

    let socket = io.connect('https://bpr-uml-socket-server.herokuapp.com/')

    socket.on('echo', d => {
        response += ('<br/>' + d.echo.replace('Server Says: ', ''));
        console.log(response);
    })


    const handleClicked = async () => await socket.emit('send_message', {message: value});


</script>

<Container>
    <Card>
        <View>
            <svelte:fragment slot="header">Socket Connection</svelte:fragment>
            <svelte:fragment slot="header-actions"></svelte:fragment>
            <Input Label="Message" bind:value/>
            <Button on:click={handleClicked}>Send</Button>
            {@html response}
            <svelte:fragment slot="actions"></svelte:fragment>
        </View>
    </Card>
</Container>


<style lang="scss">
    @import "../../theme";

</style>