<script>

    import {io} from "socket.io-client";
    import {onMount} from "svelte";
    import Card from "../../ui/Card.svelte";
    import View from "../../ui/View.svelte";
    import Input from "../../ui/Input.svelte";
    import Button from "../../ui/Button.svelte";
    import Wrapper from "../../ui/Wrapper.svelte";
    import Container from "../../ui/Container.svelte";
    import getService from "../utils/ServiceFactory";
    import {AppContext} from "../utils/AppContext";

    const appContext = getService(AppContext)

    let socket = io.connect('https://bpr-uml-socket-server.herokuapp.com/', {
        extraHeaders: {
            Authorization: `Bearer ${appContext.getAccessToken()}`
        }
    })

    socket.on("connect", () => {
        console.log('id: ' + socket.id); // x8WIv7-mJelg7on_ALbx
    });

    socket.on("disconnect", () => {
        console.log('id: dc ' + socket.id); // undefined
    });

    const handleClicked = async () => await socket.emit('send_message', {message: value});


</script>

<Container>
    <Card>
        <View>
            <svelte:fragment slot="header">Socket Connection</svelte:fragment>
            <svelte:fragment slot="header-actions"></svelte:fragment>

            <svelte:fragment slot="actions"></svelte:fragment>
        </View>
    </Card>
</Container>