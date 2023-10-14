<template>

    <section id="content">

        <h1 class="subheader">CUMPLEAÑOS</h1>

        <div v-if="!cumpleanyeros || cumpleanyeros.length===0">

            No hay cumpleaños en los próximos 15 días

        </div>

        <div v-if="cumpleanyeros && cumpleanyeros.length>0">
            <table id="cumpleanos" class="center" v-for="cumpleanyero, index in filteredCumpleanyeros" :key="index">
                <tbody>
                    <tr>
                        <td rowSpan="2" class="tarta"><img src="https://previews.123rf.com/images/damedeeso/damedeeso1505/damedeeso150500056/39896898-pastel-de-cumplea%C3%B1os-feliz-o-tarta-con-letras-feliz-cumplea%C3%B1os-como-velas-muy-coloridos-y-mirando-mu.jpg" alt="tarta" class="img-tarta" /></td>
                        <th colSpan="2">{{cumpleanyero.nombre}} {{cumpleanyero.apellidos}}</th>
                    </tr>
                    <tr>
                        <td v-if="cumpleanyero.dias!==0">En {{cumpleanyero.dias}} dia(s) cumplirá {{cumpleanyero.edad}} años</td>
                        <td v-if="cumpleanyero.dias==0">Hoy es su cumpleaños, cumple {{cumpleanyero.edad}} años</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <paginate
            v-model="page"
            :page-count="totalPages"
            :prev-text="'<'"
            :next-text="'>'"
            :click-handler="getCumpleanyeros"
            :container-class="'pagination'"
            :hide-prev-next="true"
        />

    </section>
    
</template>

<script>

import axios from 'axios';
import Global from '../Global.js';
import Paginate from "vuejs-paginate-next";

export default {
    name: 'HomeComponent',
    components: {Paginate},
    data(){

        return{
            cumpleanyeros: [],
            filteredCumpleanyeros: [],
            url: Global.url,
            page: 1,
            perpage: 5,
            totalPages: 0
        }

    },
    mounted(){

        this.getCumpleanyeros(this.page);

    },
    methods: {

        getCumpleanyeros(currentPage){

            axios.get(this.url+'birthdays')
            .then(res=>{

                if(res.data.status==='success'){

                    this.cumpleanyeros = res.data.cumpleanyeros;
                    this.totalPages = Math.ceil(this.cumpleanyeros.length / this.perpage);
                    this.filteredCumpleanyeros = this.cumpleanyeros.slice((currentPage - 1) * this.perpage, currentPage*this.perpage);

                }

            });
            
        }

    }
}

</script>