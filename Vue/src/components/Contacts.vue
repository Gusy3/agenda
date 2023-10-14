<template>

    <section id="content">

        <h2 className="subheader">CONTACTOS</h2>

        <!-- LISTADO DE CONTACTOS -->
        <table id="tabla_contactos" className="center">

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
            :click-handler="getContacts"
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
    name: 'ContactsComponent',
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

        this.getContacts(this.page);

    },
    methods: {

        getContacts(currentPage){

            axios.get(this.url +'contacts')
            .then(res=>{

                if(res.data.status==='success'){

                    this.contacts = res.data.contacts;
                    this.totalPages = Math.ceil(this.contacts.length / this.perpage);
                    this.filteredContacts = this.contacts.slice((currentPage - 1) * this.perpage, currentPage * this.perpage);

                }

            });

        }

    }
}

</script>