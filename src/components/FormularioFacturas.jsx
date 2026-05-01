import { useState, useEffect } from "react";
import "../styles/Formulario.css";

import DetalleFactura from "./DetalleFactura.jsx";


export default function FormularioFacturas({ tabla, setTabla, factura, cerrarFormulario, obtenerDatos }) {
    const [numero, setNumero] = useState("");
    const [productor, setProductor] = useState("");
    const [ctn, setCTN] = useState("");
    const [fecha, setFecha] = useState("");
    const [total, setTotal] = useState(0);
    const [tipo, setTipo] = useState("COMPRA");
    const [estado, setEstado] = useState("Pendiente");

    const [detalles, setDetalles] = useState([]);


    useEffect(() => {
        if (factura) {
        setNumero(factura.numero_factura);
        setProductor(factura.productor_id);
        setCTN(factura.ctn_id);
        // Ajuste aquí:
        const fechaFormateada = factura.fecha
        ? new Date(factura.fecha).toISOString().split("T")[0]
        : "";
        setFecha(fechaFormateada);
        setTotal(factura.total);
        setTipo(factura.tipo);
        setEstado(factura.estado);
        }
    }, [factura]);

    useEffect(() => {
        const nuevoTotal = detalles.reduce((acc, item) => {
            return acc + item.precio * item.cantidad;
        }, 0);

        setTotal(nuevoTotal);
    }, [detalles]);

    async function handleSubmit(e) {
        e.preventDefault();
        if (detalles.length === 0) {
            alert("Agrega al menos un detalle");
            return;
        }

        // limpiar los detalles antes de enviar
        const detallesLimpios = detalles.map(({ id, ...resto }) => resto);

        let datos = {
            numero_factura: numero,
            productor_id: productor,
            ctn_id: ctn,
            fecha,
            total,
            tipo,
            estado,
            detalles: detallesLimpios
        };

        if (factura) {
            // EDITAR
            await fetch(`http://localhost:5000/api/facturas/${factura.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
            });
        } else {
            // AGREGAR
            await fetch(`http://localhost:5000/api/facturas`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
            });
        }

        await obtenerDatos();
        cerrarFormulario();
    }

    useEffect(() => {
        if (factura) {
            cargarDetalles();
        } else {
            setDetalles([]); // 👈 aquí también puedes limpiar
        }
    }, [factura]);

        async function cargarDetalles() {
        try {
            const res = await fetch(`http://localhost:5000/api/facturas/${factura.id}/detalles`);
            const data = await res.json();
            setDetalles(data.body);
        } catch (error) {
            console.error("Error cargando detalles:", error);
        }
    }

    return (
        <form className="form-factura" onSubmit={handleSubmit}>
        <div className="form-row">
            <label>Nº:</label>
            <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} />
        </div>
        <div className="form-row">
            <label>Fecha:</label>
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </div>
        <div className="form-row">
            <label>Productor ID:</label>
            <input type="text" value={productor} onChange={(e) => setProductor(e.target.value)} />
        </div>
        <div className="form-row">
            <label>CTN ID:</label>
            <input type="text" value={ctn} onChange={(e) => setCTN(e.target.value)} />
        </div>
        <div className="form-row">
        <label>Tipo:</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="COMPRA">COMPRA</option>
            <option value="VENTA">VENTA</option>
        </select>
        </div>
        <div className="form-row">
            <label>Estado:</label>
            <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                <option value="Pendiente">Pendiente</option>
                <option value="Pagada">Pagada</option>
                <option value="Anulada">Anulada</option>
            </select>
        </div>
        <DetalleFactura 
        detalles={detalles}
        setDetalles={setDetalles}
        />
        <button type="submit" className="btn-guardar">{factura ? "Actualizar" : "Guardar"}</button>
        <button type="button" onClick={cerrarFormulario}>Cancelar</button>
        </form>
    );

}