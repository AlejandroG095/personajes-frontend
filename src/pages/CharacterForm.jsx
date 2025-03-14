import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { characterService, fileService } from '../services/api';

function CharacterForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [submitError, setSubmitError] = useState('');
    const isEditMode = !!id;

    // Esquema de validación
    const validationSchema = Yup.object({
        name: Yup.string().required('El nombre es obligatorio'),
        role: Yup.string().required('El rol es obligatorio'),
        description: Yup.string().required('La descripción es obligatoria'),
        image: Yup.mixed()
            .test('required', 'La imagen es obligatoria', value => value && value.size > 0)
            .test('fileType', 'Formato no permitido. Solo PNG, JPG, JPEG y GIF.', (file) => {
                if (!file) return true;
                return ["image/png", "image/jpeg", "image/jpg", "image/gif"].includes(file.type);
            })
            .test('fileSize', 'El archivo es demasiado grande. Tamaño máximo: 5MB.', (file) => {
                if (!file) return true;
                return file.size <= 5 * 1024 * 1024;
            })

    });

    // Cargar datos si estamos en modo edición
    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            characterService.getById(id)
                .then(response => {
                    setCharacter(response.data);
                    if (response.data.imageUrl) {
                        setImagePreview(`http://localhost:8080${response.data.imageUrl}`);
                    }
                })
                .catch(err => {
                    console.error('Error al cargar personaje:', err);
                    setError('No se pudo cargar la información del personaje.');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [id, isEditMode]);

    // Valores iniciales para el formulario
    const initialValues = {
        name: character?.name || '',
        role: character?.role || '',
        description: character?.description || '',
        image: null
    };

    // Manejar envío del formulario
    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitError('');
        try {
            let imageUrl = character?.imageUrl || '';

            // Si hay una nueva imagen, cargarla primero
            if (values.image) {
                const imageResponse = await fileService.uploadImage(values.image);
                imageUrl = imageResponse.data.fileUrl;
            }

            // Preparar datos para guardar
            const characterData = {
                name: values.name,
                role: values.role,
                description: values.description,
                imageUrl: imageUrl
            };

            // Crear o actualizar personaje
            if (isEditMode) {
                await characterService.update(id, characterData);
            } else {
                await characterService.create(characterData);
            }

            // Redirigir a la lista de personajes
            navigate('/characters');
        } catch (err) {
            console.error('Error al guardar personaje:', err);
            setSubmitError('Error al guardar el personaje. Por favor, intenta de nuevo.');
        } finally {
            setSubmitting(false);
        }
    };

    // Manejar selección de imagen
    const handleImageChange = (event, setFieldValue) => {
        const file = event.currentTarget.files[0];
        if (file) {
            setFieldValue('image', file);

            // Crear URL para vista previa
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    if (loading) {
        return <div className="text-center my-5"><div className="spinner-border"></div></div>;
    }

    if (error) {
        return (
            <div className="alert alert-danger my-4" role="alert">
                {error}
                <button className="btn btn-outline-primary mt-3" onClick={() => navigate('/characters')}>
                    Volver a la lista
                </button>
            </div>
        );
    }

    return (
        <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
                <h2 className="h5 mb-0">{isEditMode ? 'Editar' : 'Crear'} Personaje</h2>
            </div>
            <div className="card-body">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form>
                            {submitError && (
                                <div className="alert alert-danger" role="alert">
                                    {submitError}
                                </div>
                            )}

                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nombre</label>
                                <Field
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="form-control"
                                />
                                <ErrorMessage name="name" component="div" className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="role" className="form-label">Rol</label>
                                <Field
                                    type="text"
                                    name="role"
                                    id="role"
                                    className="form-control"
                                />
                                <ErrorMessage name="role" component="div" className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Descripción</label>
                                <Field
                                    as="textarea"
                                    name="description"
                                    id="description"
                                    className="form-control"
                                    rows="4"
                                />
                                <ErrorMessage name="description" component="div" className="text-danger" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="image" className="form-label">Imagen</label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={(event) => handleImageChange(event, setFieldValue)}
                                />
                                <ErrorMessage name="image" component="div" className="text-danger" />

                                {imagePreview && (
                                    <div className="mt-2">
                                        <img
                                            src={imagePreview}
                                            alt="Vista previa"
                                            className="img-thumbnail"
                                            style={{ maxHeight: '200px' }}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="d-flex gap-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Guardando...' : 'Guardar'}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => navigate('/characters')}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default CharacterForm;