import React, {Component} from 'react';
import {useSearchParams} from 'react-router-dom';

import Contacts from './Contacts';

class Search extends Component{

    render(){

        var searchParams = this.props.queryParams;

        var nombre = searchParams.get("nombre");
        var apellidos = searchParams.get("apellidos");

        var params = {
            nombre: nombre,
            apellidos: apellidos
        }

        return(

            <div className="center">

                <Contacts search={params} />

            </div>

        );

    }

}

function SearchContacts(){

    let [searchParams] = useSearchParams();

    return <Search queryParams={searchParams} />

}

export default SearchContacts;