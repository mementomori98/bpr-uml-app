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
    import {Snackbar} from "../utils/Snackbar";

    const appContext = getService(AppContext);
    const snackbar = getService(Snackbar);

    let socket = io.connect('https://bpr-uml-socket-server.herokuapp.com/', {
        extraHeaders: {
            Authorization: `Bearer ${appContext.getAccessToken()}`
        }
    })

    socket.on("connect", () => {
        snackbar.add('connected');

        socket.emit('join_diagram', {
            diagramId: '6184efa95faef251e252c331'
        });
    });

    socket.on("disconnect", () => {
        snackbar.add('disconnected')
    });

    socket.on('user_joined', e => {
        snackbar.add(e.id + ' | ' + e.name + ' joined');
    });

    socket.on('model_created', e => {
        snackbar.add(JSON.stringify(e));
    });

    socket.on('representation_created', async e => {
        await new Promise(r => setTimeout(r, 4000));
        snackbar.add(JSON.stringify(e));
    });

    const handleClicked = async () => await socket.emit('send_message', {message: value});
    const create = () => {
        socket.emit('create_model',
            {
                "type": "textBox",
                "text": "Very important text!",
                "path": ""
            },
            {
                "x": 10.5,
                "y": 11.3,
                "w": 40.0,
                "h": 45.5
            });
    }

</script>

<Container>
    <Card>
        <View>
            <svelte:fragment slot="header">Socket Connection</svelte:fragment>
            <svelte:fragment slot="header-actions"></svelte:fragment>

            <Button on:click={create}>Create</Button>

            <svelte:fragment slot="actions"></svelte:fragment>
        </View>
    </Card>
</Container>