<script lang="ts">
    import {Router} from "@roxi/routify";
    import {routes} from "../.routify/routes";
    import GlobalScssImports from "./GlobalScssImports.svelte";
    import {initializeApp} from 'firebase/app';

    const firebaseConfig = {
        apiKey: "AIzaSyDAuriepQen_J7sYEo4zKZLpFnjbhljsdQ",
        authDomain: "bpr-uml.firebaseapp.com",
        projectId: "bpr-uml",
        storageBucket: "bpr-uml.appspot.com",
        messagingSenderId: "859126621497",
        appId: "1:859126621497:web:41dd4b3fc88b11f674b4e8",
        measurementId: "G-C57ZR4RVS3",
    }

    const app = initializeApp(firebaseConfig);
</script>

<GlobalScssImports/>
<Router config={{useHash: true}} {routes}/>