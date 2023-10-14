<template>

    <section id="content">

        <h2 class="subheader">CONTACTO</h2>

        <table id="tabla_contacto" class="center">

            <tbody>
                <tr>
                    <th>Nombre</th>
                    <td>{{contact.nombre}}</td>
                </tr>

                <tr>
                    <th>Apellidos</th>
                    <td>{{contact.apellidos}}</td>
                </tr>
                <tr>
                    <th>Móvil</th>
                    <td>{{contact.movil}}</td>
                </tr>
                <tr>
                    <th>Dirección</th>
                    <td>{{contact.direccion}}</td>
                </tr>
                <tr>
                    <th>Población</th>
                    <td>{{contact.poblacion}}</td>
                </tr>
                <tr>
                    <th>Código Postal</th>
                    <td>{{contact.c_postal}}</td>
                </tr>
                <tr>
                    <th>Provincia</th>
                    <td>{{contact.provincia}}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>{{contact.email}}</td>
                </tr>
                <tr>
                    <th>Fecha Nacimiento</th>
                    <td>{{moment(contact.f_nacimiento).format("DD/MM/YYYY")}}</td>
                </tr>
            </tbody>

        </table>
        
        <div class="buttons">
            <router-link :to="{name: 'editar', param: {id: contact._id}}" class="btn btn-warning">Editar</router-link>
            <button @click="deleteContact(contact._id)" class="btn btn-danger">Borrar</button>
        </div>

    </section>

    
</template>

<script>

import axios from 'axios';
import Global from '../Global';
import moment from 'moment';
import swal from 'sweetalert';

export default {
    name: 'ContactComponent',
    data(){

        return{
            moment: moment,
            url: Global.url,
            contact: {}
        }

    },
    mounted(){

        var contactId = this.$route.params.id;
        this.getContact(contactId);

    },
    methods: {

        getContact(contactId){

            axios.get(this.url+'contact/'+contactId)
            .then(res=>{

                if(res.data.status==='success'){

                    this.contact = res.data.contact;

                }

            });

        },
        deleteContact(contactId){

            swal({
                title: "¿Estás seguro?",
                text: "¡Una vez borrado, el contacto no se puede recuperar!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {

                    axios.delete(this.url+'contact/'+contactId)
                    .then(response=>{
                        
                        if(response.data.status==="success"){

                            swal(
                                'Contacto borrado',
                                'El contacto ha sido borrado',
                                'success'
                            );

                            this.$router.push('/contactos');
                        }

                    });

                }else{
                    swal("Tranquilo, el contacto no se ha borrado");
                }

            });

        }

    }
}

</script>