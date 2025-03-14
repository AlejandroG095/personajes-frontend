import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Configuración base de Axios
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Servicio para personajes
export const characterService = {
    // Obtener todos los personajes
    getAll: (sortBy = 'date') => {
        return api.get(`/characters?sortBy=${sortBy}`);
    },

    // Obtener un personaje por ID
    getById: (id) => {
        return api.get(`/characters/${id}`);
    },

    // Crear un nuevo personaje
    create: (character) => {
        return api.post('/characters', character);
    },

    // Actualizar un personaje
    update: (id, character) => {
        return api.put(`/characters/${id}`, character);
    },

    // Eliminar un personaje
    delete: (id) => {
        return api.delete(`/characters/${id}`);
    }
};

// Servicio para manejo de archivos
export const fileService = {
    // Subir una imagen
    uploadImage: (file) => {
        const formData = new FormData();
        formData.append('file', file);

        return axios.post(`${API_URL}/files/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
};

export default api;