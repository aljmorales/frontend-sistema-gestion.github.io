import { useState, useEffect } from "react";
import "../styles/Formulario.css";

export default function FormularioIngresos({ tabla, setTabla, ingreso, cerrarFormulario, obtenerDatos }) {
  const [fecha, setFecha] = useState("");
  const [productor, setProductor] = useState("");
  const [tipo, setTipo] = useState("FOB");
  const [cantidad, setCantidad] = useState("");
  const [ctn, setCTN] = useState("");

  useEffect(() => {
    if (ingreso) {
      const fechaFormateada = ingreso.fecha
      ? new Date(ingreso.fecha).toISOString().split("T")[0]
      : "";
      setFecha(fechaFormateada);
      setProductor(ingreso.productor_id);
      setTipo(ingreso.tipo);
      setCantidad(ingreso.cantidad);
      setCTN(ingreso.ctn_id);
    }
  }, [ingreso]);

  async function handleSubmit(e){
    e.preventDefault();

      let datos ={
        fecha,
        productor_id: productor,
        ctn_id: ctn,
        cantidad,
        tipo
      }

    if (ingreso) {
      // EDITAR
      await fetch(`https://backend-sistema-gestion.onrender.com/api/ingresos/${ingreso.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(datos)
      });
    } else {
      // AGREGAR
       await fetch(`https://backend-sistema-gestion.onrender.com/api/ingresos`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(datos)
      });
    }
    await obtenerDatos();
    cerrarFormulario();
  };

  return (
    <form className="form-ingreso" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Fecha:</label>
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Productor ID:</label>
        <input type="text" value={productor} onChange={(e) => setProductor(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Tipo:</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="FOB">FOB</option>
          <option value="EXW">EXW</option>
        </select>
      </div>
      <div className="form-row">
        <label>Cantidad:</label>
        <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
      </div>
      <div className="form-row">
        <label>CTN ID:</label>
        <input type="text" value={ctn} onChange={(e) => setCTN(e.target.value)} />
      </div>
      <button type="submit" className="btn-guardar">{ingreso ? "Actualizar" : "Guardar"}</button>
      <button type="button" onClick={cerrarFormulario}>Cancelar</button>
    </form>
  );
}
