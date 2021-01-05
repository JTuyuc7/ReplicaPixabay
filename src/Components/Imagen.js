import React from 'react';

const Imagen = ({imagen}) => {

    //Extraer las Variables de las imagenes

    const { largeImageURL, likes, downloads, previewURL, views, tags } = imagen;

    return(
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <img src={previewURL} alt={tags} className="card-img-top" />
            
            <div className="card-body">
                <p className="card-text">{likes} Me gusta</p>
                <p>{views} Vistas </p>
                <p>{downloads} Descargas</p>
            </div>

            <div className="card-footer">
                <a 
                    href={largeImageURL} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-block"
                >Ver Imagen Completa</a>
            </div>
        </div>

    );

}

export default Imagen;