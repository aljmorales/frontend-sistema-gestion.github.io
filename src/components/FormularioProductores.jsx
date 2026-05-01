import { useState, useEffect } from "react";
import "../styles/Formulario.css";

export default function FormularioProductores({ tabla, setTabla, productor, cerrarFormulario, obtenerDatos }) {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("FOB");
  const [precio, setPrecio] = useState("");

  useEffect(() => {
    if (productor) {
      setNombre(productor.nombre);
      setTipo(productor.tipo);
      setPrecio(productor.precio);
    }
  }, [productor]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      nombre,
      tipo,
      precio: parseFloat(precio)
    };

    if (productor) {
      // EDITAR
      await fetch(`https://backend-sistema-gestion.onrender.com/api/productores/${productor.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
      });
    } else {
      // CREAR
      await fetch("https://backend-sistema-gestion.onrender.com/api/productores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
      });
    }

    await obtenerDatos();

    cerrarFormulario();
  };

  return (
    <form className="form-productor" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Tipo:</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="">Seleccione</option>
          <option value="FOB">FOB</option>
          <option value="EXW">EXW</option>
        </select>
      </div>
      <div className="form-row">
        <label>Precio:</label>
        <input type="number" step="0.01" value={precio} onChange={(e) => setPrecio(e.target.value)} />
      </div>
      <button type="submit" className="btn-guardar">{productor ? "Actualizar" : "Guardar"}</button>
      <button type="button" onClick={cerrarFormulario}>Cancelar</button>
    </form>
  );
}
