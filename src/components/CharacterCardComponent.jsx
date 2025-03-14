import { formatDate } from '../utils/formatters';

function CharacterCardComponent({ character, onClick }) {
    return (
        <div className="card h-100" onClick={() => onClick(character)}>
            <div className="card-img-top character-image-container">
                {character.imageUrl ? (
                    <img
                        src={`http://localhost:8080${character.imageUrl}`}
                        alt={character.name}
                        className="character-image w-100"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/300x200?text=Sin+Imagen';
                        }}
                    />
                ) : (
                    <img
                        src="https://via.placeholder.com/300x200?text=Sin+Imagen"
                        alt="Sin imagen"
                        className="character-image w-100"
                    />
                )}
            </div>

            <div className="card-body">
                <h5 className="card-title">{character.name}</h5>
                <p className="card-text text-muted mb-1">{character.role}</p>
                <p className="card-text">
                    <small className="text-muted">
                        Creado: {formatDate(character.createdDate)}
                    </small>
                </p>
            </div>

            <div className="card-footer bg-white border-top-0">
                <button
                    className="btn btn-sm btn-outline-primary w-100"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick(character);
                    }}
                >
                    Ver detalles
                </button>
            </div>
        </div>
    );
}

export default CharacterCardComponent;