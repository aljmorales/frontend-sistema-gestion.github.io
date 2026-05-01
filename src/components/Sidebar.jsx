import {Link} from 'react-router-dom';
import "../styles/Sidebar.css";

export default function Sidebar() {
  return (
    <div className='sidebar-principal'>
        <Link to="/">Home</Link>
        <Link to="/productores">Productores</Link>
        <Link to="/ctn">CTN</Link>
        <Link to="/ingresos">Ingresos</Link>
        <Link to="/facturacion">Facturación</Link>
        <Link to="/reportes">Reportes</Link>
    </div>
  );
}