import Navbar from "../components/Navbar.jsx";
import {TableFacturas as Table} from "../components/Table.jsx"
import FormularioFacturas from "../components/FormularioFacturas.jsx";
import ModalFactura from "../components/ModalFactura.jsx";

import "../styles/Facturas.css";
import {useState, useEffect} from "react";

const API = "https://backend-sistema-gestion.onrender.com/api/ctn";

export default function Facturas(){
    const [tabla, setTabla] = useState([]);
    const [nuevaFactura, setNuevaFactura]= useState(false);
    const [facturaEditando, setFacturaEditando] = useState(null);
    const [facturaVer, setFacturaVer] = useState(null);
    const [busqueda, setBusqueda] = useState(""); 

    const cerrarFormulario = () => {
        setNuevaFactura(false);
        setFacturaEditando(null);
    };

    async function obtenerDatos(){
        const res = await fetch("https://backend-sistema-gestion.onrender.com/api/facturas");
        const data = await res.json();
        setTabla(data.body);
    }

    useEffect(()=>{
        obtenerDatos();
    }, []);

    const tablaFiltrada = tabla.filter(item =>
        String(item.numero_factura).includes(busqueda) ||
        item.fecha.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.estado.toLowerCase().includes(busqueda.toLowerCase()) ||
        String(item.productor_id).includes(busqueda) ||
        String(item.ctn_id).includes(busqueda)
    );

    return(<>
        <div className="facturas-container">
            <h3 className="facturas-title">FACTURACIÓN</h3>
                <div className="facturas-actions">
                    <button className="btn-nuevo" 
                    onClick={()=>{
                        setNuevaFactura(!nuevaFactura);
                        setFacturaEditando(null);
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
                {(nuevaFactura || facturaEditando) && (
                <FormularioFacturas 
                tabla={tabla}
                setTabla={setTabla}
                factura={facturaEditando}
                cerrarFormulario={cerrarFormulario}
                obtenerDatos={obtenerDatos}
                />)}
                <Table tabla={tablaFiltrada} setTabla={setTabla} setFacturaEditando={setFacturaEditando} setFacturaVer={setFacturaVer} />    
        </div>
        {facturaVer && (
            <ModalFactura
                factura={facturaVer}
                onClose={() => setFacturaVer(null)}
            />
        )}
        
    </>);

}