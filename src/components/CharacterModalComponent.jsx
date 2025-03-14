// CharacterModalComponent.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/formatters';

function CharacterModalComponent({ character, show, onClose, onDelete }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (show) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => document.body.classList.remove('modal-open');
    }, [show]);

    if (!character) return null;

    const handleEdit = () => {
        onClose();
        navigate(`/characters/edit/${character.id}`);
    };

    const handleDelete = () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este personaje?')) {
            onDelete(character.id);
        }
    };

    return (
        <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content shadow-lg border-0">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">{character.name}</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-5">
                                <img
                                    src={`http://localhost:8080${character.imageUrl}`}
                                    alt={character.name}
                                    className="img-fluid rounded shadow-sm"
                                    onError={(e) => e.target.src = 'https://via.placeholder.com/300x300?text=Sin+Imagen'}
                                />
                            </div>
                            <div className="col-md-7">
                                <h5 className="fw-bold">Información del Personaje</h5>
                                <dl className="row">
                                    <dt className="col-sm-4">Id</dt>
                                    <dd className="col-sm-8">{character.id}</dd>
                                    <dt className="col-sm-4">Rol</dt>
                                    <dd className="col-sm-8">{character.role}</dd>
                                    <dt className="col-sm-4">Fecha Creación</dt>
                                    <dd className="col-sm-8">{formatDate(character.createdDate)}</dd>
                                </dl>
                                <h6 className="fw-bold">Descripción</h6>
                                <p>{character.description}</p>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer d-flex justify-content-between">
                        <button type="button" className="btn btn-outline-primary" onClick={handleEdit}>
                            Editar
                        </button>
                        <button type="button" className="btn btn-outline-danger" onClick={handleDelete}>
                            Eliminar
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CharacterModalComponent;