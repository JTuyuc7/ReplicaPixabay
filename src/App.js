import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './Components/Formulario';
import ListadoImagenes from "./Components/ListadoImagenes";

function App() {

  //State de la app

  const [ busqueda, guardarBusqueda ] = useState("");
  const [ imagenes, guardarImagenes ] = useState([]);
  const [ paginaactual, guardarPaginaActual ] = useState(1);
  const [ totalpaginas, guardarTotalPaginas ] = useState(1);

    useEffect(() =>{
      const consultarApi = async () =>{
        if(busqueda === "" )return;

        const imagenesPorPagina = 30;      
        const key = "17879646-375ba50def745308d4e19e633";
        const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        //Calcular el total de Paginas
        const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina)
        guardarTotalPaginas(calcularTotalPaginas);
        guardarImagenes(resultado.hits);

        // Mover la pantalla hacia arriba

        const jumbotron = document.querySelector(".jumbotron");
        jumbotron.scrollIntoView({ behavior: "smooth"});
      }

      consultarApi();

    },[busqueda, paginaactual]);

    //Definir anterior
    const paginaAnterior = () =>{
      const nuevaPaginaActual = paginaactual - 1;
      if(nuevaPaginaActual === 0) return;
      guardarPaginaActual(nuevaPaginaActual);

    }
    //Definier pagina siguiente
    const paginaSiguiente = () =>{
      const nuevaPaginaActual = paginaactual + 1;
      if(nuevaPaginaActual > totalpaginas) return;
      guardarPaginaActual(nuevaPaginaActual);
    }

  return (
    <Fragment>
        <div className="container">
            <div className="jumbotron">
              <p className="lead text-center">Buscador de Imagenes</p>
                <Formulario
                  guardarBusqueda={guardarBusqueda}
                />
            </div>
            <div className="row justify-content-center">
              <ListadoImagenes
                imagenes={imagenes}
              />
              { (paginaactual === 1) ? null :              
                  (<button
                    type="button"
                    className="btn btn-info mr-r"
                    onClick={paginaAnterior}
                    >&laquo; Anterior </button>
                  )
              }
              { (paginaactual === totalpaginas) ? null : 
                  (
                    <button
                    type="button"
                    className="btn btn-info"
                    onClick={paginaSiguiente}
                    >Siguiente &raquo;</button>
                  )             
              }

            </div>
        </div>
    </Fragment>
  );
}

export default App;
