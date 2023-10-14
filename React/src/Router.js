import React, {Component} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

// IMPORTAR COMPONENTES
import Header from './components/Header';
import Slider from './components/Slider';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from "./components/Home";
import Contacts from "./components/Contacts";
import Contact from "./components/Contact";
import NewContact from "./components/NewContact";
import EditContact from "./components/EditContact";
import Search from "./components/Search";
import Error from "./components/Error";

class Router extends Component{

    render(){

        return(

            /* CONFIGURAR RUTAS Y PÁGINAS */

            <BrowserRouter>

                <Header />
                <Slider />

                <div className="border">
                    <div className="center">

                        <Routes>

                            <Route exact path="/" element={<Home />} />
                            <Route exact path="/home" element={<Home />} />
                            <Route exact path="/contactos" element={<Contacts />} />
                            <Route exact path="/contacto/:id" element={<Contact />} />
                            <Route exact path="/nuevo-contacto" element={<NewContact />} />
                            <Route exact path="/contacto/editar/:id" element={<EditContact />} />
                            <Route path="/buscar" element={<Search />} />
                            <Route path="*" element={<Error />} />

                        </Routes>

                        <Sidebar />

                        {/* LIMPIAR FLOTADOS */}
                        <div className="clearfix"></div>

                    </div>
                </div>

                <Footer />

            </BrowserRouter>
        );

    }

}

export default Router;