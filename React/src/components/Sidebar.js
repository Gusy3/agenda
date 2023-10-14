import React, {Component} from 'react';
import {Link, useNavigate} from 'react-router-dom';

class Sidebar extends Component{

    searchNombreRef = React.createRef();
    searchApellidosRef = React.createRef();

    redirectToSearch = (e)=> {

        e.preventDefault();

        // Variable que almacena El hook useNavigate para la redireccion
        var navigate = this.props.redirect;
    
        // Variables que almacenan el nombre y apellidos de la busqueda
        var nombre = this.searchNombreRef.current.value;
        var apellidos = this.searchApellidosRef.current.value;

        if(nombre && apellidos){

            navigate("/buscar?nombre="+nombre+"&apellidos="+apellidos);
            
        }else if(nombre){
      
            navigate("/buscar?nombre="+nombre);
      
        }else if(apellidos){
      
            navigate("/buscar?apellidos="+apellidos);
      
        }

    }

    render(){
        
        return(
            
            <aside id="sidebar">

                <div id="nav-blog" className="sidebar-item">
                    <h3>Puedes hacer esto</h3>
                    <Link to="/nuevo-contacto" className="btn btn-success">Añadir contacto</Link>
                </div>

                <div id="search" className="sidebar-item">
                    <h3>Buscador</h3>
                    <p>Encuentra al contacto que buscas</p>

                    <form onSubmit={this.redirectToSearch}>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" name="nombre" ref={this.searchNombreRef} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="apellidos">Apellidos</label>
                            <input type="text" name="apellidos" ref={this.searchApellidosRef} />
                        </div>
                        <input type="submit" name="submit" value="Buscar" className="btn btn-success"/>
                    </form>
                </div>

            </aside>

        );

    }

}

function SidebarNavigate(){

    let navigate = useNavigate();

    return <Sidebar redirect={navigate} />

}

export default SidebarNavigate;