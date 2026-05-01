import "../styles/Ingresos.css";
import { useEffect, useState } from "react";
import { TableIngreso as Table } from "../components/Table.jsx";
import FormularioIngresos from "../components/FormularioIngresos"

const API = "https://backend-sistema-gestion.onrender.com/api/ingresos";

export default function Ingresos(){
    const [tabla, setTabla] = useState([]);
    const [nuevoIngreso, setNuevoIngreso]= useState(false);
    const [ingresoEditando, setIngresoEditando] = useState(null);
    const [busqueda, setBusqueda] = useState("");

    const cerrarFormulario = () => {
        setNuevoIngreso(false);
        setIngresoEditando(null);
    };

    async function obtenerDatos(){
        const res = await fetch(API);
        const data = await res.json();
        setTabla(data.body);
    }

    useEffect(()=>{
        obtenerDatos();
    }, []);

    // Filtrar ingresos según búsqueda
    const tablaFiltrada = tabla.filter(item =>
        item.fecha.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.tipo.toLowerCase().includes(busqueda.toLowerCase()) ||
        String(item.productor_id).includes(busqueda) ||
        String(item.ctn_id).includes(busqueda)
    );

    return(
        <div className="ingresos-container">
            <h3 className="ingresos-title">INGRESO DE CAJAS</h3>
                <div className="ingresos-actions">
                    <button className="btn-nuevo" 
                    onClick={()=>{
                        setNuevoIngreso(!nuevoIngreso);
                        setIngresoEditando(null);
                    }}
                    >+ NUEVO INGRESO</button>
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
                    {(nuevoIngreso || ingresoEditando) && (
                        <FormularioIngresos 
                        tabla={tabla}
                        setTabla={setTabla}
                        ingreso={ingresoEditando}
                        cerrarFormulario={cerrarFormulario}
                        obtenerDatos={obtenerDatos}
                        />)}
                    <Table tabla={tablaFiltrada} setTabla={setTabla} setIngresoEditando={setIngresoEditando} />
                    
        </div>
    );
}