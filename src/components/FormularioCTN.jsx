import { useState, useEffect } from "react";
import "../styles/Formulario.css";

export default function FormularioCTN({ tabla, setTabla, ctn, cerrarFormulario, obtenerDatos}){
    const [codigo, setCodigo] = useState("");
    const [fecha, setFecha] = useState("");
    const [estado, setEstado] = useState("");

    useEffect(() => {
        if (ctn) {
        setCodigo(ctn.codigo);
        const fechaFormateada = ctn.fecha
        ? new Date(ctn.fecha).toISOString().split("T")[0]
        : "";
        setFecha(fechaFormateada);
        setEstado(ctn.estado);
        }
    }, [ctn]);

    async function handleSubmit(e) {
        e.preventDefault();

        const datos = {
            codigo,
            fecha,
            estado,
        };

        if(ctn){
        //EDITAR
            await fetch(`http://localhost:5000/api/ctn/${ctn.id}`,{
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(datos)
            });
        } else{
        //CREAR
            await fetch("http://localhost:5000/api/ctn", {
                method: "POST",
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify(datos)
            });
        }
        await obtenerDatos();
        cerrarFormulario();
    };

    return (
        <form className="form-ctn" onSubmit={handleSubmit}>
        <div className="form-row">
            <label>Código:</label>
            <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
        </div>
        <div className="form-row">
            <label>Fecha:</label>
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </div>
        <div className="form-row">
            <label>Estado:</label>
            <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                <option value="ABIERTO">ABIERTO</option>
                <option value="EN_PROCESO">EN_PROCESO</option>
                <option value="CERRADO">CERRADO</option>
            </select>
        </div>
        <button type="submit" className="btn-guardar">{ctn ? "Actualizar" : "Guardar"}</button>
        <button type="button" onClick={cerrarFormulario}>Cancelar</button>
        </form>
    );
}