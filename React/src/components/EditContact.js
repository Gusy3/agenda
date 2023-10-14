import React, {Component} from 'react';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import moment from 'moment';
import Global from '../Global';
import {Navigate, useParams} from 'react-router-dom';

class EditContact extends Component{

    url = Global.url;

    nombreRef = React.createRef();
    apellidosRef = React.createRef();
    movilRef = React.createRef();
    direccionRef = React.createRef();
    poblacionRef = React.createRef();
    cPostalRef = React.createRef();
    provinciaRef = React.createRef();
    emailRef = React.createRef();
    fNacimientoRef = React.createRef();

    state = {
        provinces: [],
        contact: {},
        status: null
    }

    constructor(){

        super();
        this.validator = new SimpleReactValidator(
            {
                autoForceUpdate: this,
                className: 'msg-validator',
                messages: {
                    required: 'El :attribute es requerido.',
                    email: 'El :attribute debe ser un email válido.'
                },
                validators: {
                    c_postal: {
                        message: 'El :attribute debe ser un código postal válido.',
                        rule: (val, params, validator) => {
                            return validator.helpers.testRegex(val,/^(5[0-2]{1}|[0-4]{1}\d{1})\d{3}$/) && params.indexOf(val) === -1
                        },
                        required: true
                    },
                    movil: {
                        message: 'El :attribute debe ser un número de móvil válido.',
                        rule: (val, params, validator) => {
                            return validator.helpers.testRegex(val,/^[6|7]{1}[0-9]{8}$/) && params.indexOf(val) === -1
                        },
                        required: true
                    }
                }
            }

        );

    }

    componentDidMount(){

        this.getContact();
        this.getProvinces();

    }

    getProvinces = ()=>{

        axios.get(this.url+'/provinces')
        .then(res=>{

            this.setState({

                provinces: res.data.provinces

            })

        });

    }

    getContact = ()=>{

        var id = this.props.contactId;

        axios.get(this.url+'/contact/'+id)

        .then(res=> {

            this.setState({

                contact: res.data.contact

            });
        })

    }

    changeState = () => {

        this.setState({

            contact: {

                nombre: this.nombreRef.current.value,
                apellidos: this.apellidosRef.current.value,
                movil: this.movilRef.current.value,
                direccion: this.direccionRef.current.value,
                poblacion: this.poblacionRef.current.value,
                c_postal: this.cPostalRef.current.value,
                provincia: this.provinciaRef.current.value,
                email: this.emailRef.current.value,
                f_nacimiento: this.fNacimientoRef.current.value,

            }

        });

        // Para comprobar la validación cada vez que introducimos algún dato en el campo del formulario
        this.validator.showMessages();

    }

    saveContact = (event) =>{

        event.preventDefault();

        // Rellenar el state con los datos del formulario
        this.changeState();

        // ID del contacto
        var id = this.props.contactId;

        // Comprobamos si los datos son validos
        if (this.validator.allValid()){

            // Hacer una petición http por PUT para actualizar los datos con ID del contacto
            axios.put(this.url+'contact/'+id, this.state.contact)

            .then(res => {

                if(res.data.contact){

                    this.setState({
                        contact: res.data.contact,
                        status: 'success'
                    })

                }else{

                    this.setState({
                        status: 'failed'
                    });

                }

            })
        }else{

            this.setState({
                status: 'failed'
            });

            // Si la validación falla mostramos los mensajes
            this.validator.showMessages();

        }
    }

    render(){

        // Datos del contacto
        var contact= this.state.contact;

        if(this.state.status==='success'){

            return <Navigate to={'/contacto/'+contact._id} />;

        }

        var listProvinces = this.state.provinces.map((province, index)=>{

            return(

                <option key={index}>{province.nombre}</option>

            );
    
        });

        return(

            <section id="content">

                <h1 className="subheader">EDITAR CONTACTO</h1>

                <form className="mid-form" onSubmit={this.saveContact}>

                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" name="nombre" defaultValue={contact.nombre} ref={this.nombreRef} onChange={this.changeState} />
                        {
                            this.validator.message('nombre', this.state.contact.nombre, 'required')
                        }
                    </div>

                    <div className="form-group">
                        <label htmlFor="apellidos">Apellidos</label>
                        <input type="text" name="apellidos" defaultValue={contact.apellidos} ref={this.apellidosRef} onChange={this.changeState} />
                        {
                            this.validator.message('apellidos', this.state.contact.apellidos, 'required')
                        }
                    </div>

                    <div className="form-group">
                        <label htmlFor="movil">Móvil</label>
                        <input type="tel" name="movil" defaultValue={contact.movil} ref={this.movilRef} onChange={this.changeState} />
                        {
                            this.validator.message('movil', this.state.contact.movil, 'required|movil')
                        }
                    </div>

                    <div className="form-group">
                        <label htmlFor="direccion">Dirección</label>
                        <input type="text" name="direccion" defaultValue={contact.direccion} ref={this.direccionRef} onChange={this.changeState} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="poblacion">Población</label>
                        <input type="text" name="poblacion" defaultValue={contact.poblacion} ref={this.poblacionRef} onChange={this.changeState} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="c_postal">Código Postal</label>
                        <input type="text" name="c_postal" defaultValue={contact.c_postal} ref={this.cPostalRef} onChange={this.changeState} />
                        {
                            this.validator.message('c_postal', this.state.contact.c_postal, 'required|c_postal')
                        }
                    </div>

                    <div className="form-group">
                        <label htmlFor="provincia">Provincia</label>
                        <select name="provincia" value={contact.provincia} ref={this.provinciaRef} onChange={this.changeState}>
                            <option value="">----- Selecciona Provincia -----</option>
                            {listProvinces}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" defaultValue={contact.email} ref={this.emailRef} onChange={this.changeState} />
                        {
                            this.validator.message('email', this.state.contact.email, 'required|email')
                        }
                    </div>

                    <div className="form-group">
                        <label htmlFor="f_nacimiento">Fecha Nacimiento</label>
                        <input type="date" name="f_nacimiento" value={moment(contact.f_nacimiento).format('YYYY-MM-DD')} ref={this.fNacimientoRef} onChange={this.changeState} />
                        {
                            this.validator.message('f_nacimiento', this.state.contact.f_nacimiento, 'required')
                        }
                    </div>

                    {/* LIMPIAR FLOTADOS */}
                    <div className="clearfix"></div>

                    <input type="submit" value="Guardar" className="btn btn-success" />

                </form>

            </section>

        );

    }

}

function EditContactId(){

    let {id} = useParams();

    return <EditContact contactId={id} />

}

export default EditContactId;