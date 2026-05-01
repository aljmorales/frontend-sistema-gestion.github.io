import { useEffect, useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import "../styles/ModalFactura.css";

export default function ModalFactura({ factura, onClose }) {
    const [detalles, setDetalles] = useState([]);
    const facturaRef = useRef();

    useEffect(() => {
        if (factura) {
        cargarDetalles();
        }
    }, [factura]);

    async function cargarDetalles() {
        try {
        const res = await fetch(
            `http://localhost:5000/api/facturas/${factura.id}/detalles`
        );
        const data = await res.json();
        setDetalles(data.body);
        } catch (error) {
        console.error("Error cargando detalles:", error);
        }
    }

    if (!factura) return null;

    const total = detalles.reduce((acc, item) => {
        return acc + item.precio * item.cantidad;
    }, 0);

    //IMPRIMIR Y DESCARGAR PDF
    function imprimir() {
    window.print();
    }
    function descargarPDF() {
        const element = facturaRef.current;

        html2pdf().set({
        margin: 10,
        filename: `Factura-${factura.numero_factura}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
        }).from(element).save();
    }

    return (
        <div className="modal-overlay">
        <div className="modal-contenido" ref={facturaRef}>

            <button className="modal-cerrar" onClick={onClose}>
            ✖
            </button>

            <h2>Factura {factura.numero_factura}</h2>

            <div className="modal-info">
            <p><strong>Fecha:</strong> {new Date(factura.fecha).toISOString().split("T")[0]}</p>
            <p><strong>Productor:</strong> {factura.productor_id}</p>
            <p><strong>CTN:</strong> {factura.ctn_id}</p>
            <p><strong>Tipo:</strong> {factura.tipo}</p>
            <p><strong>Estado:</strong> {factura.estado}</p>
            </div>

            <table className="tabla-detalle">
            <thead>
                <tr>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                {detalles.map((item) => (
                <tr key={item.id}>
                    <td>{item.descripcion}</td>
                    <td>{item.cantidad}</td>
                    <td>{item.precio}</td>
                    <td>{(item.cantidad * item.precio).toFixed(2)}</td>
                </tr>
                ))}
            </tbody>
            </table>

            <h3>Total: S/ {total.toFixed(2)}</h3>

            <div className="div-botones">
                <button className="extra-botones" onClick={imprimir}>Imprimir</button>
                <button className="extra-botones" onClick={descargarPDF}>Exportar PDF</button>
            </div>

        </div>
        </div>
    );
}