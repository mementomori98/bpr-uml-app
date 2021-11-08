<script lang="ts">

</script>

<ul id="test-ul">
    <li><a>one</a></li>
    <li>
        <a>two</a>
        <ul class="submenu">
            <li><a>sub one</a></li>
            <li><a>sub two</a></li>
            <li><a>sub three</a></li>
        </ul>
    </li>
    <li><a>three</a></li>
    <li><a>four</a></li>
    <li><a>five</a></li>
</ul>
<style>
    ul { list-style: none; }
    #test-ul {
        background-color: #eee;
        border-color: #ccc;
        position: absolute;
    }

    #test-ul > li > ul::before {
        content: "";
        display: block;
        position: absolute;
        z-index: 1;
        left: 18px;
        top: 0;
        bottom: 0;
        border: 1px solid;
        border-width: 0 0 0 1px;
    }
</style>
