import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class Slider extends Component{

    render(){

        return(

            <div id="slider" className="slider">

                {/* MENU */}

                <nav id="menu">
                    <ul>
                        <li><NavLink to="/">Cumpleaños</NavLink></li>
                        <li><NavLink to="/contactos">Contactos</NavLink></li>
                    </ul>
                </nav>

            </div>

        );

    }

}

export default Slider;