// Formatear fecha y hora
export function formatDate(dateString) {
    if (!dateString) return 'Fecha desconocida';

    const date = new Date(dateString);

    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
        return 'Fecha inválida';
    }

    // Opciones para formatear la fecha
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };

    return date.toLocaleDateString('es-ES', options);
}