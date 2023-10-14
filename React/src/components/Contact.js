import React, {Component} from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import swal from "sweetalert";
import Global from '../Global';
import {Link, Navigate, useParams} from 'react-router-dom';

class Contact extends Component{

    url = Global.url;

    state = {
        contact: false,
        status: null
    }

    componentDidMount(){

        this.getContact();

    }

    getContact = ()=>{

        var id = this.props.contactId;

        axios.get(this.url+'contact/'+id)

        .then(res=> {

            this.setState({

                contact: res.data.contact,
                status: 'success'

            });
        })

    }

    delete = (contactId)=>{

        swal({
            title: "¿Estás seguro?",
            text: "Una vez borrado no podras recuperarlo!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })

        .then((willDelete)=> {

            if(willDelete) {

                axios.delete(this.url+ 'contact/'+ contactId)
                .then(res=> {
    
                    this.setState({
    
                        article: res.data.contact,
                        status: 'delete'
    
                    });
                    
                });
                
                swal(
                    "Contacto borrado",
                    "El contacto ha sido borrado correctamente",
                    "success"
                );

            }else{

                swal(
                    "Tranquilo!!",
                    "El contacto no ha sido borrado",
                    "success"
                );

            }

    });

    }

    render(){

        var contact = this.state.contact;

        if(this.state.status==='delete'){

            return <Navigate to={'/contactos'} />;

        }

        return(

            <section id="content">

                <h2 className="subheader">CONTACTO</h2>

                <table id="tabla_contacto" className="center">

                    <tbody>
                        <tr>
                            <th>Nombre</th>
                            <td>{contact.nombre}</td>
                        </tr>

                        <tr>
                            <th>Apellidos</th>
                            <td>{contact.apellidos}</td>
                        </tr>
                        <tr>
                            <th>Móvil</th>
                            <td>{contact.movil}</td>
                        </tr>
                        <tr>
                            <th>Dirección</th>
                            <td>{contact.direccion}</td>
                        </tr>
                        <tr>
                            <th>Población</th>
                            <td>{contact.poblacion}</td>
                        </tr>
                        <tr>
                            <th>Código Postal</th>
                            <td>{contact.c_postal}</td>
                        </tr>
                        <tr>
                            <th>Provincia</th>
                            <td>{contact.provincia}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{contact.email}</td>
                        </tr>
                        <tr>
                            <th>Fecha Nacimiento</th>
                            <td><Moment format="DD/MM/YYYY">{contact.f_nacimiento}</Moment></td>
                        </tr>
                    </tbody>

                </table>

                <div className="buttons">
                    <Link to={'/contacto/editar/'+contact._id} className="btn btn-warning">Editar</Link>
                    <button className="btn btn-danger" onClick={()=>{this.delete(contact._id)}}>Borrar</button>
                </div>

            </section>

        );

    }
    

}

function ContactId(){

    let {id} = useParams();

    return <Contact contactId={id} />

}

export default ContactId;