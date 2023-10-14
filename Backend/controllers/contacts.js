'use strict'

import Contact from "../models/contacts.js";
import validator from "validator";

var controller= {

    save: (request, response)=>{

        // Recoger parámetros por POST
        var params= request.body;

        // Validar datos (validator)
        try{

            var validator_nombre= !validator.isEmpty(params.nombre);
            var validator_apellidos= !validator.isEmpty(params.apellidos);
            var validator_movil= validator.isMobilePhone(params.movil.toString(), "es-ES");
            var validator_c_postal= validator.isPostalCode(params.c_postal.toString(), "ES");
            var validator_email= validator.isEmail(params.email);
            
            params.f_nacimiento = params.f_nacimiento.split('T')[0];
            var validator_f_nacimiento= validator.isDate(params.f_nacimiento);

        }catch(error){

            return response.status(404).send({

                status: "error",
                message: "Faltan datos"
    
            });

        }

        if (validator_nombre && validator_apellidos && validator_movil &&
            validator_c_postal && validator_email && validator_f_nacimiento){

            // Crear el objeto a guardar
            var contact= new Contact();

            // Asignar los valores
            contact.nombre = params.nombre;
            contact.apellidos = params.apellidos;
            contact.movil = params.movil;
            contact.direccion = params.direccion;
            contact.poblacion = params.poblacion;
            contact.c_postal = params.c_postal;
            contact.provincia = params.provincia;
            contact.email = params.email;
            contact.f_nacimiento = params.f_nacimiento;

            // Guardar el contacto
            contact.save((error, contactStored)=>{

                if(error || !contactStored){

                    return response.status(404).send({

                        status: "error",
                        message: "¡¡El contacto no se ha guardado!!"
            
                    });

                }

                // Devolver una respuesta
                return response.status(200).send({

                    status: "success",
                    contact: contactStored

                });


            });

        }else{

            return response.status(404).send({

                status: "error",
                message: "Validación incorrecta"
    
            });

        }

    },
    getContacts: (request, response)=>{

        // Find
        Contact.find().sort('-_id').exec((error, contacts)=> {

            if(error){

                return response.status(500).send({

                    status: "error",
                    message: "Error al devolver los contactos"
        
                });

            }

            if (!contacts){

                return response.status(404).send({

                    status: "error",
                    message: "No hay contactos para mostrar"
        
                });

            }
            
            return response.status(200).send({

                status: "success",
                contacts: contacts
    
            });

        });


    },
    getBirthdays: (request, response)=>{

        // Find
        Contact.find().exec((error, contacts)=> {

            if(error){

                return response.status(500).send({

                    status: "error",
                    message: "Error al devolver los contactos"
        
                });

            }

            if (!contacts){

                return response.status(404).send({

                    status: "error",
                    message: "No hay contactos para mostrar"
        
                });

            }
            
            var cumpleanyeros = [];
            // Almacenamos la fecha actual
            var fechaActual = new Date ();
            // Ponemos las horas, minutos, segundos y milisegundos a 0
            fechaActual.setHours(0,0,0,0);
            // Almacenamos el año, mes y dia actual
            var anyoActual = fechaActual.getFullYear();
            
            contacts.forEach(contact => {

                // Almacenamos la fecha de nacimiento
                var fechaNacimiento = new Date (contact.f_nacimiento);
                // // Ponemos las horas, minutos, segundos y milisegundos a 0
                fechaNacimiento.setHours(0,0,0,0);
                // Almacenamos el año, mes y dia de la fecha de nacimiento
                var anyoNacimiento = fechaNacimiento.getFullYear();
                var mesNacimiento = fechaNacimiento.getMonth();
                var diaNacimiento = fechaNacimiento.getDate();
                // Fecha para comparar si es el cumpleaños
                var fechaComparar = new Date(anyoActual, mesNacimiento, diaNacimiento);
                //Fecha actual - 15 dias
                var dias15 = (24*60*60*1000) * 15; //15 dias
                var fecha15dias = fechaComparar.getTime()-dias15;

                // Comprueba si es el cumpleaños de algun contacto en los próximos 15 dias
                if(fechaActual.getTime()>=fecha15dias && fechaActual.getTime()<=fechaComparar.getTime()){

                    // Dias que quedan para el cumpleaños
                    var dias = Math.round((fechaComparar.getTime() - fechaActual.getTime()) / (24*60*60*1000));
                    // Edad
                    var edad = anyoActual - anyoNacimiento;
                    // Almacenamos los datos de los contactos que cumplirán años
                    contact = Object.assign(contact.toObject(),{'dias': dias, 'edad': edad});
                    cumpleanyeros.push(contact);

                }
                
            });

            // Ordenamos los contactos por proximidad a su cumpleaños 
            cumpleanyeros.sort((a,b)=>{

                return a.dias - b.dias;

            });

            return response.status(200).send({

                status: "success",
                cumpleanyeros: cumpleanyeros
            
            });

        });


    },
    getContact: (request, response)=>{

        // Recoger el id de la url
        var contactId= request.params.id;

        // Comprobar que existe la id
        if(!contactId || contactId===null || contactId===undefined){

            return response.status(404).send({

                status: "error",
                message: "No existe el contacto"
    
            });

        }

        // Buscar el contacto
        Contact.findById(contactId).exec((error, contact)=> {

            if (error || !contact){

                return response.status(404).send({

                    status: "error",
                    message: "No hay contacto para mostrar"
        
                });

            }
            
            // Devolver el JSON del contacto
            return response.status(200).send({

                status: "success",
                contact: contact
    
            });

        });

    },
    update: (request, response)=>{

        // Recoger el id de la url
        var contactId= request.params.id;
            
        // Recoger parámetros por PUT
        var params= request.body;

        // Validar datos (validator)
        try{

            var validator_nombre= !validator.isEmpty(params.nombre);
            var validator_apellidos= !validator.isEmpty(params.apellidos);
            var validator_movil= validator.isMobilePhone(params.movil.toString(), "es-ES");
            var validator_c_postal= validator.isPostalCode(params.c_postal.toString(), "ES");
            var validator_email= validator.isEmail(params.email);
            
            params.f_nacimiento = params.f_nacimiento.split('T')[0];
            var validator_f_nacimiento= validator.isDate(params.f_nacimiento);

        }catch(error){

            return response.status(404).send({

                status: "error",
                message: "Faltan datos"
    
            });

        }

        if (validator_nombre && validator_apellidos && validator_movil  && validator_c_postal && validator_email && validator_f_nacimiento){

            // Buscar el contacto y actualizarlo
            Contact.findByIdAndUpdate({_id: contactId}, params, {new: true}, (error, contactUpdated)=>{

                if(error){

                    return response.status(500).send({

                        status: "error",
                        message: "¡¡Error al actualizar el contacto!!"
            
                    });

                }

                if(!contactUpdated){

                    return response.status(404).send({

                        status: "error",
                        message: "¡¡No se ha actualizado el contacto, probablemente no exista!!"
            
                    });

                }

                // Devolver una respuesta
                return response.status(200).send({

                    status: "success",
                    contact: contactUpdated

                });


            });

        }else{

            return response.status(404).send({

                status: "error",
                message: "Validación incorrecta"
    
            });

        }

    },
    delete: (request, response)=>{

        // Recoger el id de la url
        var contactId= request.params.id;

        // Buscar el contacto y borrarlo
        Contact.findByIdAndRemove({_id: contactId}, (error, contactDeleted)=>{

            if(error){

                return response.status(500).send({

                    status: "error",
                    message: "¡¡Error al borrar el contacto!!"
        
                });

            }

            if(!contactDeleted){

                return response.status(404).send({

                    status: "error",
                    message: "¡¡No se ha borrado el contacto, probablemente no exista!!"
        
                });

            }

            // Devolver una respuesta
            return response.status(200).send({

                status: "success",
                contact: contactDeleted

            });

        });

    },
    search: (request, response)=>{

        // Recoger los paramametros de busqueda
        var searchNombre = request.query.nombre;
        var searchApellidos = request.query.apellidos;

        // Comprobamos si el parametro apellidos existe
        if(searchNombre && searchApellidos){

            var query = {'nombre': {$regex: searchNombre, $options: 'i'}, 'apellidos': {$regex: searchApellidos, $options: 'i'}};

        }else if (searchNombre){

            var query = {'nombre': {$regex: searchNombre, $options: 'i'}};

        }else{

            var query = {'apellidos': {$regex: searchApellidos, $options: 'i'}};

        }

        // Find
        Contact.find(query).collation({locale: "en", strength: 1}).sort('-_id').exec((error, contacts)=> {

            if(error){

                return response.status(500).send({

                    status: "error",
                    message: "Error al devolver los contactos",
        
                });

            }

            if (!contacts || contacts.length===0){

                return response.status(404).send({

                    status: "error",
                    message: "No hay contactos que coincidan con tu busqueda",
        
                });

            }
            
            return response.status(200).send({

                status: "success",
                contacts: contacts
    
            });

        });

    }

} // End controller

export default controller;