<template>

    <section id="content">

        <h1 class="subheader">NUEVO CONTACTO</h1>

        <form class="mid-form" v-on:submit.prevent="saveContact()">

            <div class="form-group">
                <label for="nombre">Nombre</label>
                <input type="text" name="nombre" v-model="v$.contact.nombre.$model" @blur="v$.contact.nombre.$touch" />
                <small class="msg-validator" v-for="(error, index) in v$.contact.nombre.$errors" :key="index">
                    {{ error.$message }}
                </small>
            </div>

            <div class="form-group">
                <label for="apellidos">Apellidos</label>
                <input type="text" name="apellidos" v-model="v$.contact.apellidos.$model" @blur="v$.contact.apellidos.$touch" />
                <small class="msg-validator" v-for="(error, index) in v$.contact.apellidos.$errors" :key="index">
                    {{ error.$message }}
                </small>
            </div>

            <div class="form-group">
                <label for="movil">Móvil</label>
                <input type="tel" name="movil" v-model="v$.contact.movil.$model" @blur="v$.contact.movil.$touch" />
                <small class="msg-validator" v-for="(error, index) in v$.contact.movil.$errors" :key="index">
                    {{ error.$message }}
                </small>
            </div>

            <div class="form-group">
                <label for="direccion">Dirección</label>
                <input type="text" name="direccion" v-model="contact.direccion" />
            </div>

            <div class="form-group">
                <label for="poblacion">Población</label>
                <input type="text" name="poblacion" v-model="contact.poblacion" />
            </div>

            <div class="form-group">
                <label for="c_postal">Código Postal</label>
                <input type="text" name="c_postal" v-model="v$.contact.c_postal.$model" @blur="v$.contact.c_postal.$touch" />
                <small class="msg-validator" v-for="(error, index) in v$.contact.c_postal.$errors" :key="index">
                    {{ error.$message }}
                </small>
            </div>

            <div class="form-group">
                <label for="provincia">Provincia</label>
                <select name="provincia" v-model="contact.provincia">
                    <option value="">----- Selecciona Provincia -----</option>
                    <option v-for="province, index in provinces" :key="index">{{ province.nombre }}</option>
                </select>
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" name="email" v-model="v$.contact.email.$model" @blur="v$.contact.email.$touch" />
                <small class="msg-validator" v-for="(error, index) in v$.contact.email.$errors" :key="index">
                    {{ error.$message }}
                </small>
            </div>

            <div class="form-group">
                <label for="f_nacimiento">Fecha Nacimiento</label>
                <input type="date" name="f_nacimiento" v-model="v$.contact.f_nacimiento.$model" />
                <small class="msg-validator" v-for="(error, index) in v$.contact.f_nacimiento.$errors" :key="index">
                    {{ error.$message }}
                </small>
            </div>

            <!-- LIMPIAR FLOTADOS -->
            <div class="clearfix"></div>

            <input type="submit" value="Guardar" class="btn btn-success" />

        </form>

    </section>
    
</template>

<script>

import axios from 'axios';
import Global from '../Global';
import useVuelidate from '@vuelidate/core';
import {required, email, helpers} from '@vuelidate/validators';
import Contact from '../models/ContactModel';
import moment from 'moment';

export default {
    name: 'NewContactComponent',
    data(){

        return{
            v$: useVuelidate(),
            moment: moment,
            contact: new Contact('','','','','','','','',moment().format('YYYY-MM-DD')),
            provinces: [],
            url: Global.url
        }

    },
    mounted(){

        this.getProvinces();

    },
    validations: {
        
        contact: {

            nombre: {
                required: helpers.withMessage('El campo Nombre es requerido', required)
            },
            apellidos: {
                required: helpers.withMessage('El campo Apellidos es requerido', required)
            },
            movil: {
                required: helpers.withMessage('El campo Móvil es requerido', required),
                movil: helpers.withMessage('El Móvil introducido no es válido',
                       helpers.regex(/^[6|7]{1}[0-9]{8}$/))
            },
            email: {
                required: helpers.withMessage('El campo Email es requerido', required),
                email: helpers.withMessage('El Email introducido no es válido', email)
            },
            c_postal: {
                required: helpers.withMessage('El campo Código Postal es requerido', required),
                c_postal: helpers.withMessage('El Código Postal introducido no es válido',
                          helpers.regex(/^(5[0-2]{1}|[0-4]{1}\d{1})\d{3}$/))
            },
            f_nacimiento: {
                required: helpers.withMessage('La Fecha de Nacimiento es requerida', required),
            }

        }

    },
    methods: {

        getProvinces(){

            axios.get(this.url +'provinces')
            .then(res=>{

                if(res.data.status==='success'){

                    this.provinces = res.data.provinces;

                }

            });

        },
        saveContact(){

            this.v$.$touch();

            // Comprobamos si los datos son validos
            if(this.v$.$invalid){

                return false;

            }else{

                // Hacer una petición http por POST para guardar los datos del contacto
                axios.post(this.url+'save', this.contact)

                .then(res => {

                    if(res.data.status === 'success'){

                        this.$router.push('/contactos');

                    }

                })
                .catch(error =>{

                    console.log(error);

                });
            }

        }

    }

}

</script>