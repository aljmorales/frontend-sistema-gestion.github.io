import { useState } from "react";
import "../styles/DetalleFactura.css";

export default function DetalleFactura({ detalles, setDetalles}) {
    const [mostrarForm, setMostrarForm] = useState(false);
    const [descripcion, setDescripcion] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [precio, setPrecio] = useState("");

    // subtotal dinámico
    const subtotal =
        cantidad && precio ? (cantidad * precio).toFixed(2) : "";

    function agregarDetalle(e) {
        e.preventDefault();

        const nuevoDetalle = {
        id: Date.now(),
        descripcion,
        cantidad: parseFloat(cantidad),
        precio: parseFloat(precio),
        subtotal: subtotal
        };

        setDetalles([...detalles, nuevoDetalle]);

        // limpiar
        setDescripcion("");
        setCantidad("");
        setPrecio("");
        setMostrarForm(false);
    }

    function eliminarDetalle(id) {
        const nuevos = detalles.filter((item) => item.id !== id);
        setDetalles(nuevos);
    }


    // total general 
    const total = detalles.reduce((acc, item) => {
        return acc + item.cantidad * item.precio;
    }, 0);

    return (
        <div className="detalle-factura">
        <h3>DETALLE DE FACTURA</h3>

        <table className="tabla-detalle">
            <thead>
            <tr>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {detalles.map((item) => (
                <tr key={item.id}>
                <td>{item.descripcion}</td>
                <td>{item.cantidad}</td>
                <td>{item.precio}</td>
                <td>{(item.cantidad * item.precio).toFixed(2)}</td>
                <td>
                    <button
                    className="btn-eliminar btn-eliminar-detalle"
                    onClick={() => eliminarDetalle(item.id)}
                    >
                    Eliminar
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>

        <h3>Total: S/ {total.toFixed(2)}</h3>

        <button onClick={() => setMostrarForm(!mostrarForm)}>
            {mostrarForm ? "Cancelar" : "+ Agregar Detalle"}
        </button>

      {mostrarForm && (
        <div className="form-detalle">
            <div className="form-row">
            <label>Descripción:</label>
            <input
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
            />
            </div>
            <div className="form-row">
            <label>Cantidad:</label>
            <input
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                required
            />
            </div>
            <div className="form-row">
            <label>Precio:</label>
            <input
                type="number"
                step="0.01"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
            />
            </div>
            <div className="form-row">
            <label>Subtotal:</label>
            <input type="text" value={subtotal} readOnly />
            </div>
            <button onClick={agregarDetalle}>Guardar Detalle</button>
        </div>
        )}

    </div>
    );
}