<template>

    <aside id="sidebar">

        <div id="nav-blog" class="sidebar-item">
            <h3>Puedes hacer esto</h3>
            <router-link to="/nuevo-contacto" class="btn btn-success">Añadir contacto</router-link>
        </div>

        <div id="search" class="sidebar-item">
            <h3>Buscador</h3>
            <p>Encuentra al contacto que buscas</p>
            <form @submit.prevent="search">
                <div class="form-group">
                    <label htmlFor="title">Nombre</label>
                    <input type="text" name="nombre" v-model="nombre" />
                </div>
                <div className="form-group">
                    <label htmlFor="title">Apellidos</label>
                    <input type="text" name="apellidos" v-model="apellidos" />
                </div>
                <input type="submit" name="submit" value="Buscar" className="btn btn-success"/>
            </form>
        </div>

    </aside>
    
</template>

<script>

export default {
    name: 'SidebarComponent',
    data(){

        return {
            nombre: null,
            apellidos: null
        }

    },
    methods: {

        search(){

            if(this.nombre && this.apellidos){

                this.$router.push('/buscar?nombre='+this.nombre+'&apellidos='+this.apellidos);
      
            }else if(this.nombre){

                this.$router.push('/buscar?nombre='+this.nombre);

            }else if(this.apellidos){

                this.$router.push('/buscar?apellidos='+this.apellidos);

            }

        }

    }
}

</script>