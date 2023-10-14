<template>

    <div id="slider" className="slider">

        <!--* MENU -->

        <nav id="menu">
            <ul>
                <li><router-link to="/home">Cumpleaños</router-link></li>
                <li><router-link to="/contactos">Contactos</router-link></li>
            </ul>
        </nav>

    </div>
    
</template>

<script>

export default {
    name: 'SliderComponent'
}

</script>