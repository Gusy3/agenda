'use strict'

import Province from "../models/provinces.js";

var controller= {

    getProvinces: (request, response)=>{

        // Find
        Province.find().collation({locale: 'es'}).sort('nombre').exec((error, provinces)=> {

            if(error){

                return response.status(500).send({

                    status: "error",
                    message: "Error al devolver las provincias"
        
                });

            }

            if (!provinces){

                return response.status(404).send({

                    status: "error",
                    message: "No hay provincias para mostrar"
        
                });

            }
            
            return response.status(200).send({

                status: "success",
                provinces: provinces
    
            });

        });

    },

} // End controller

export default controller;