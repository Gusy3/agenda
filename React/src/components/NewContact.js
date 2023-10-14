import React, {Component} from 'react';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import moment from 'moment';
import Global from '../Global';
import { Navigate } from 'react-router-dom';

class NewContact extends Component{

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
        contact: {f_nacimiento: moment().format('YYYY-MM-DD')},
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

        this.getProvinces();

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


    }

    getProvinces = ()=>{

        axios.get(this.url+'/provinces')
        .then(res=>{

            this.setState({

                provinces: res.data.provinces

            })

        });

    }

    saveContact = (event) =>{

        event.preventDefault();

        // Rellenar el state con los datos del formulario
        this.changeState();

        // Comprobamos si los datos son validos
        if (this.validator.allValid()){

            // Hacer una petición http por POST para guardar los datos del contacto
            axios.post(this.url+'save', this.state.contact)

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

        if(this.state.status==='success'){

            return <Navigate to="/contactos" />;

        }

        var listProvinces = this.state.provinces.map((province, index)=>{

            return(

                <option key={index}>{province.nombre}</option>

            );
    
        });

        return(

            <section id="content">

                <h1 className="subheader">NUEVO CONTACTO</h1>

                <form className="mid-form" onSubmit={this.saveContact}>

                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" name="nombre" ref={this.nombreRef} onChange={this.changeState}
                                onBlur={()=>this.validator.showMessageFor('nombre')}
                                onKeyPress={()=>this.validator.showMessageFor('nombre')} />
                        <small>
                            {this.validator.message('nombre', this.state.contact.nombre, 'required')}
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="apellidos">Apellidos</label>
                        <input type="text" name="apellidos" ref={this.apellidosRef} onChange={this.changeState}
                                onBlur={()=>this.validator.showMessageFor('apellidos')}
                                onKeyPress={()=>this.validator.showMessageFor('apellidos')} />
                        <small>
                            {this.validator.message('apellidos', this.state.contact.apellidos, 'required')}
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="movil">Móvil</label>
                        <input type="tel" name="movil" ref={this.movilRef} onChange={this.changeState}
                                onBlur={()=>this.validator.showMessageFor('movil')}
                                onKeyPress={()=>this.validator.showMessageFor('movil')} />
                        <small className="msg-validator">
                            {this.validator.message('movil', this.state.contact.movil, 'required|movil')}
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="direccion">Dirección</label>
                        <input type="text" name="direccion" ref={this.direccionRef} onChange={this.changeState} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="poblacion">Población</label>
                        <input type="text" name="poblacion" ref={this.poblacionRef} onChange={this.changeState} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="c_postal">Código Postal</label>
                        <input type="text" name="c_postal" ref={this.cPostalRef} onChange={this.changeState}
                                onBlur={()=>this.validator.showMessageFor('c_postal')}
                                onKeyPress={()=>this.validator.showMessageFor('c_postal')} />
                        <small>
                            {this.validator.message('c_postal', this.state.contact.c_postal, 'required|c_postal')}
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="provincia">Provincia</label>
                        <select name="provincia" ref={this.provinciaRef} onChange={this.changeState}>
                            <option value="">----- Selecciona Provincia -----</option>
                            {listProvinces}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" ref={this.emailRef} onChange={this.changeState}
                                onBlur={()=>this.validator.showMessageFor('email')}
                                onKeyPress={()=>this.validator.showMessageFor('email')} />
                        <small>
                            {this.validator.message('email', this.state.contact.email, 'required|email')}
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="f_nacimiento">Fecha Nacimiento</label>
                        <input type="date" name="f_nacimiento" defaultValue={moment().format('YYYY-MM-DD')} ref={this.fNacimientoRef}
                                onChange={()=> {this.changeState(); this.validator.showMessageFor('f_nacimiento')}}
                                onBlur={()=>this.validator.showMessageFor('f_nacimiento')} />
                        <small>
                            {this.validator.message('f_nacimiento', this.state.contact.f_nacimiento, 'required')}
                        </small>
                    </div>

                    {/* LIMPIAR FLOTADOS */}
                    <div className="clearfix"></div>

                    <input type="submit" value="Guardar" className="btn btn-success" />

                </form>

            </section>

        );

    }

}

export default NewContact;