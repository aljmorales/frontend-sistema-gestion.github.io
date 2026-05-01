import Navbar from "../components/Navbar.jsx";
import Table from "../components/Table.jsx";
import FormularioProductores from "../components/FormularioProductores.jsx";

import "../styles/Productores.css";
import {useState, useEffect} from "react";

const API = "https://backend-sistema-gestion.onrender.com/api/productores";

export default function Productores(){
    const [tabla, setTabla] = useState([]);
    const [nuevoProductor, setNuevoProductor]= useState(false);
    const [productorEditando, setProductorEditando] = useState(null);
    const [busqueda, setBusqueda] = useState("");   

    const cerrarFormulario = () => {
        setNuevoProductor(false);
        setProductorEditando(null);
    };

     useEffect(() => {
        obtenerDatos();
    }, []);

    async function obtenerDatos(){
        const res = await fetch(API);
        const data = await res.json();
        setTabla(data.body);
    }

    const tablaFiltrada = tabla.filter(item =>
        item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.tipo.toLowerCase().includes(busqueda.toLowerCase())
    );


    return(
        <div className="productores-container">
            <h3 className="productores-title">PRODUCTORES</h3>
            <div className="productores-actions">
                <button className="btn-nuevo"
                onClick={()=>{
                    setNuevoProductor(!nuevoProductor);
                    setProductorEditando(null);
                }}
                >+ NUEVO PRODUCTOR</button>
                <div className="busqueda">
                    <label htmlFor="buscar">Buscar:</label>
                    <input
                    id="buscar"
                    type="text"
                    className="input-buscar"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>
            </div>
            {(nuevoProductor || productorEditando) && (
                <FormularioProductores
                tabla={tabla}
                setTabla={setTabla}
                productor={productorEditando}
                cerrarFormulario={cerrarFormulario}
                obtenerDatos={obtenerDatos}
                />
            )}

            <Table tabla={tablaFiltrada} setTabla={setTabla} setProductorEditando={setProductorEditando} />
        </div>
    );
}