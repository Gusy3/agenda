<template>

    <section id="content">

        <h2 class="subheader">CONTACTOS ENCONTRADOS</h2>

        <div v-if="!contacts || contacts.length===0">

            No hay contactos que coincidan con tu busqueda

        </div>

        <!-- LISTADO DE CONTACTOS -->
        <table id="tabla_contactos" class="center" v-if="contacts && contacts.length>0">

            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Detalles</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="contact, index in filteredContacts" :key="index" :class="index%2===0?'fila-par':'fila-impar'">
                    <td>{{contact.nombre}}</td>
                    <td>{{contact.apellidos}}</td>
                    <td><router-link :to="{name: 'contacto', params: {id: contact._id}}">Ver</router-link></td>
                </tr>
            </tbody>

        </table>

        <paginate
            v-model="page"
            :page-count="totalPages"
            :prev-text="'<'"
            :next-text="'>'"
            :click-handler="getContactsBySearch"
            :container-class="'pagination'"
            :hide-prev-next="true"
        />

    </section>
    
</template>

<script>

import axios from 'axios';
import Global from '../Global';
import Paginate from "vuejs-paginate-next";

export default {
    name: 'SearchComponent',
    components: {Paginate},
    data(){

        return{
            contacts: [],
            filteredContacts: [],
            url: Global.url,
            page: 1,
            perpage: 10,
            totalPages: 0
        }

    },
    mounted(){

        this.getContactsBySearch(this.page);

        this.$watch(
            () => this.$route.query,
            queryParams => {

                // Comprobamos si el objeto queryParams está vacio
                if(Object.keys(queryParams).length!==0){

                    this.page = 1;
                    this.getContactsBySearch(this.page);

                }

            }
        )

    },
    methods: {

        getContactsBySearch(currentPage){

            var queryParams = this.$route.query;

            axios.get(this.url+'search', {params: queryParams})
            .then(response=>{
                
                if(response.data.status==="success"){

                    this.contacts = response.data.contacts;
                    this.totalPages = Math.ceil(this.contacts.length / this.perpage);
                    this.filteredContacts = this.contacts.slice((currentPage - 1) * this.perpage, currentPage*this.perpage);

                }

            })
            .catch(()=>{

                this.contacts = [];

            });

        }

    }
}

</script>