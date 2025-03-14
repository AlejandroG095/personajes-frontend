import { Link } from "react-router-dom";

function FooterComponent() {
    return (
        <div>
            <footer className="footer">
                <span>&copy; {new Date().getFullYear()} Gestor de Personajes. Todos los derechos reservados.</span>
            </footer>
        </div>
    );
}

export default FooterComponent;