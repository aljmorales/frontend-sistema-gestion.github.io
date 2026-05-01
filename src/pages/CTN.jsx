import Navbar from "../components/Navbar.jsx";
import {TableCTN as Table} from "../components/Table.jsx"
import FormularioCTN from "../components/FormularioCTN.jsx";

import "../styles/CTN.css";
import {useState, useEffect} from "react";

const API = "https://backend-sistema-gestion.onrender.com/api/ctn";

export default function Ctn(){
    const [tabla, setTabla] = useState([]);
    const [nuevoCTN, setNuevoCTN]= useState(false);
    const [CTNEditando, setCTNEditando] = useState(null);
    const [busqueda, setBusqueda] = useState("");

    const cerrarFormulario = () => {
        setNuevoCTN(false);
        setCTNEditando(null);
    };

    async function obtenerDatos(){
        const res = await fetch(API);
        const data = await res.json();
        setTabla(data.body);
    }

    useEffect(()=>{
        obtenerDatos();
    }, []);

    const tablaFiltrada = tabla.filter(item =>
        item.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.estado.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.fecha.toLowerCase().includes(busqueda.toLowerCase())
    );

    return(
        <div className="ctn-container">
            <h3 className="ctn-title">CTN</h3>
            <div className="ctn-actions">
                <button className="btn-nuevo"
                onClick={()=>{
                    setNuevoCTN(!nuevoCTN);
                    setCTNEditando(null);
                }}
                >+ NUEVO CTN</button>
                <div className="busqueda">
                    <label htmlFor="buscar">Buscar:</label>
                    <input
                        id="buscar"
                        type="text"
                        className="input-buscar"
                        value={busqueda}
                        onChange={(e)=>setBusqueda(e.target.value)}
                    />
                </div>
            </div>
            {(nuevoCTN || CTNEditando) && (
                <FormularioCTN
                tabla={tabla}
                setTabla={setTabla}
                ctn={CTNEditando}
                cerrarFormulario={cerrarFormulario}
                obtenerDatos={obtenerDatos}
                />
            )}
            
            <Table tabla={tablaFiltrada} setTabla={setTabla} setCTNEditando={setCTNEditando} />
        </div>
    );
}
