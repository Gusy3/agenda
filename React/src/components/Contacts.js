import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import {Link} from 'react-router-dom';
import ReactPaginate from 'react-paginate';

class Contacts extends Component{

    // Url de la api
    url = Global.url;

    // Variables de Paginación
    contactsPerPage = 10;
    page = {selected: 0};

    state = {
        contacts: [],
        filteredContacts: [],
        status: null
    }

    componentDidMount(){

        if(this.props.search && this.props.search!==null && this.props.search!==undefined){

            this.getContactsBySearch(this.page);

        }else{

            this.getContacts(this.page);

        }

    }

    componentDidUpdate(prevProps) {

        if (this.props.search !== prevProps.search) {

            this.page = {selected: 0};

            this.getContactsBySearch(this.page);

        }

    }

    getContacts = (currentPage)=>{

        this.page = currentPage;

        axios.get(this.url+'contacts')
        .then(res=>{

            this.setState({
                contacts: res.data.contacts,
                filteredContacts: res.data.contacts.slice(currentPage.selected * this.contactsPerPage, (currentPage.selected+1) * this.contactsPerPage),
                status: 'success'
            });

        });

    }

    getContactsBySearch = (currentPage)=>{

        this.page = currentPage;

        axios.get(this.url+'search', {params: this.props.search})
        .then(res=>{

            this.setState({

                contacts: res.data.contacts,
                filteredContacts: res.data.contacts.slice(currentPage.selected * this.contactsPerPage, (currentPage.selected+1) * this.contactsPerPage),
                status: 'success'

            });

        })
        .catch(error=>{

            this.setState({

                contacts: [],
                status: 'success'

            });

            console.log(error);

        });

    }

    render(){

        if(this.state.contacts.length>0 && this.state.status==="success"){

            var listContacts = this.state.filteredContacts.map((contact, index)=>{

                return(

                    <tr key={index} className={index%2===0?'fila-par':'fila-impar'}>
                        <td>{contact.nombre}</td>
                        <td>{contact.apellidos}</td>
                        <td><Link to={'/contacto/'+contact._id}>Ver</Link></td>
                    </tr>
        
                );

            });

            return(

                    <section id="content">
            
                        <h2 className="subheader">CONTACTOS</h2>

                        {/*LISTADO DE CONTACTOS*/}
                        <table id="tabla_contactos" className="center">

                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellidos</th>
                                    <th>Detalles</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listContacts}
                            </tbody>
 
                       </table>

                       <ReactPaginate
                            breakLabel="..."
                            nextLabel=">"
                            previousLabel="<"
                            forcePage={this.page.selected}
                            onPageChange={this.props.search?this.getContactsBySearch:this.getContacts}
                            pageRangeDisplayed={3}
                            pageCount={Math.ceil(this.state.contacts.length / this.contactsPerPage)}
                            className="pagination"
                            renderOnZeroPageCount={null}
                        />

                    </section>

            );

        }
        else if(this.state.contacts.length===0 && this.state.status==='success'){

            return(

                <section id="content">

                    <h2 className="subheader">CONTACTOS</h2>
                    <p>No hay contactos para mostrar</p>

                </section>

            );

        }
        else{

            return(

                <section id="content">

                    <h2 className="subheader">CONTACTOS</h2>
                    <p>Cargando...</p>

                </section>

            );

        }

    }

}

export default Contacts;