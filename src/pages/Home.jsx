import { Link } from 'react-router-dom';

function Home() {
  const seriesTitle = "Breaking Bad";
  const seriesBanner = "https://m.media-amazon.com/images/M/MV5BMTJiMzgwZTktYzZhZC00YzhhLWEzZDUtMGM2NTE4MzQ4NGFmXkEyXkFqcGdeQWpybA@@._V1_.jpg";
  const seriesDescription = "Breaking Bad es una serie de televisión dramática estadounidense creada y producida por Vince Gilligan. Cuenta la historia de Walter White, un profesor de química diagnosticado con cáncer que comienza a producir metanfetamina para asegurar el futuro financiero de su familia.";

  return (
    <div className="home-container">
      <div className="home-banner">
        <img
          src={seriesBanner}
          alt={seriesTitle}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/1200x400?text=Banner+de+Serie';
          }}
        />
        <div className="home-banner-content">
          <h1>{seriesTitle}</h1>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-8">
          <h2>Sobre la Serie</h2>
          <p className="lead">{seriesDescription}</p>

          <p>
            Este sistema te permite administrar personajes de {seriesTitle}.
            Podrás crear, editar, ver y eliminar personajes, incluyendo su información
            detallada y roles dentro de la serie.
          </p>

          <div className="mt-4">
            <Link to="/characters" className="btn btn-primary me-2">
              Ver Personajes
            </Link>
            <Link to="/characters/new" className="btn btn-success">
              Añadir Nuevo Personaje
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">Gestión de Personajes</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">✓ Crear nuevos personajes</li>
                <li className="list-group-item">✓ Ver detalles completos</li>
                <li className="list-group-item">✓ Editar información existente</li>
                <li className="list-group-item">✓ Eliminar personajes</li>
                <li className="list-group-item">✓ Ordenar por nombre o fecha</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;