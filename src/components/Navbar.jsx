import { Link } from 'react-router-dom';
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <header className='navbar-principal'>
      <h2>AGRONEGOCIOS LOS ANGELES S.A- ALJMORALES</h2>
      <nav>
        <ul>
          <li><p className='btn-salir'>Salir</p></li>
        </ul>
      </nav>
    </header>
  );
}
