import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { characterService } from '../services/api';
import CharacterCardComponent from '../components/CharacterCardComponent';
import CharacterModalComponent from '../components/CharacterModalComponent';

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Cargar personajes
  const loadCharacters = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await characterService.getAll(sortBy);
      setCharacters(response.data);
    } catch (err) {
      console.error('Error al cargar personajes:', err);
      setError('No se pudieron cargar los personajes. Intenta más tarde.');
    } finally {
      setLoading(false);
    }
  }, [sortBy]);

  // Cargar al montar el componente o cambiar el orden
  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadCharacters();
      } catch (error) {
        console.error('Error al cargar personajes en useEffect:', error);
      }
    };
    fetchData();
  }, [loadCharacters]);

  // Abrir modal
  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setShowModal(true);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Eliminar personaje con confirmación
  const handleDeleteCharacter = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este personaje?')) return;

    try {
      await characterService.delete(id);
      setCharacters(prevCharacters => prevCharacters.filter(char => char.id !== id));
      setShowModal(false);
    } catch (err) {
      console.error('Error al eliminar personaje:', err);
      alert('No se pudo eliminar el personaje. Intenta de nuevo.');
    }
  };

  // Cambiar ordenamiento
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Personajes</h2>

        <div className="d-flex align-items-center">
          <label htmlFor="sortBy" className="me-2">Ordenar por:</label>
          <select
            id="sortBy"
            className="form-select form-select-sm"
            value={sortBy}
            onChange={handleSortChange}
            style={{ width: 'auto' }}
          >
            <option value="date">Fecha de creación</option>
            <option value="name">Nombre</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert" aria-live="polite">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border"></div>
        </div>
      )}

      {!loading && characters.length === 0 ? (
        <div className="text-center my-5">
          <p>No hay personajes para mostrar. ¡Crea uno nuevo!</p>
          <button onClick={() => navigate('/characters/new')} className="btn btn-primary mt-2">
            Crear Personaje
          </button>
        </div>
      ) : (
        <div className="character-grid">
          {characters.map(character => (
            <CharacterCardComponent
              key={character.id}
              character={character}
              onClick={handleCharacterClick}
            />
          ))}
        </div>
      )}

      <CharacterModalComponent
        character={selectedCharacter}
        show={showModal}
        onClose={handleCloseModal}
        onDelete={handleDeleteCharacter}
      />
    </div>
  );
}

export default CharacterList;
