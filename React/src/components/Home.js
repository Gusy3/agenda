import React, {Component} from 'react';
import axios from 'axios';
import Global from '../Global';
import {Link} from 'react-router-dom';
import ReactPaginate from 'react-paginate';

class Home extends Component{

    // Url de la api
    url = Global.url;

    // Variables de Paginación
    cumpleanyerosPerPage = 5;
    page = {selected: 0};

    state = {
        cumpleanyeros: [],
        filteredCumpleanyeros: [],
        status: null
    }

    componentDidMount(){

        this.getCumpleanyeros(this.page);

    }

    getCumpleanyeros = (currentPage)=>{

        this.page = currentPage;

        axios.get(this.url+'birthdays')
        .then(res=>{

            this.setState({
                cumpleanyeros: res.data.cumpleanyeros,
                filteredCumpleanyeros: res.data.cumpleanyeros.slice(currentPage.selected * this.cumpleanyerosPerPage, (currentPage.selected+1) * this.cumpleanyerosPerPage),
                status: 'success'
            });

        });


    }

    render(){

        if(this.state.status==="success" && this.state.cumpleanyeros.length>0){

            var listCumpleanyeros = this.state.filteredCumpleanyeros.map((cumpleanyero, index)=>{

                return(

                    <table id="cumpleanos" className="center" key={index}>
                        <tbody>
                            <tr>
                                <td rowSpan="2" className="tarta"><img src="https://previews.123rf.com/images/damedeeso/damedeeso1505/damedeeso150500056/39896898-pastel-de-cumplea%C3%B1os-feliz-o-tarta-con-letras-feliz-cumplea%C3%B1os-como-velas-muy-coloridos-y-mirando-mu.jpg" alt="tarta" className="img-tarta" /></td>
                                <th colSpan="2"><Link to={"contacto/"+cumpleanyero._id}>{cumpleanyero.nombre} {cumpleanyero.apellidos}</Link></th>
                            </tr>
                            <tr>
                                {cumpleanyero.dias!==0 &&
                                    <td>En {cumpleanyero.dias} dia(s) cumplirá {cumpleanyero.edad} años</td>
                                }
                                {cumpleanyero.dias===0 &&
                                    <td>Hoy es su cumpleaños, cumple {cumpleanyero.edad} años</td>
                                }
                            </tr>
                        </tbody>
                    </table>
        
                );
            });

            return(

                <section id="content">

                    <h2 className="subheader">PRÓXIMOS CUMPLEAÑOS</h2>
                    {listCumpleanyeros}

                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        previousLabel="<"
                        forcePage={this.page.selected}
                        onPageChange={this.getCumpleanyeros}
                        pageRangeDisplayed={3}
                        pageCount={Math.ceil(this.state.cumpleanyeros.length / this.cumpleanyerosPerPage)}
                        className="pagination"
                        renderOnZeroPageCount={null}
                    />

                </section>

            );

        }else if(this.state.status==="success" && this.state.cumpleanyeros.length===0){

            return(

                <section id="content">

                    <h2 className="subheader">PRÓXIMOS CUMPLEAÑOS</h2>
                    <div>No hay ningún cumpleaños en los próximos 15 días</div>

                </section>

            )

        }else{

            return(

                <section id="content">

                    <h2 className="subheader">PRÓXIMOS CUMPLEAÑOS</h2>
                    <div>Cargando...</div>

                </section>

            )

        }

    }

}

export default Home;