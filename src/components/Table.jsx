import "../styles/Table.css";

export default function Table({ tabla, setTabla, setProductorEditando }) {
  return (
    <table className="tabla-productores">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Tipo</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {tabla.map(item => (
          <tr key={item.id}>
            <td>{item.nombre}</td>
            <td>{item.tipo}</td>
            <td>{item.precio}</td>
            <td>
              <button className="btn-editar" onClick={() => setProductorEditando(item)}>
                Editar
              </button>
              <button
                className="btn-eliminar"
                onClick={async () => {
                  await fetch(`http://localhost:5000/api/productores/${item.id}`, {
                    method: "DELETE"
                  });
                  // recargar datos
                  const res = await fetch("http://localhost:5000/api/productores");
                  const data = await res.json();
                  setTabla(data.body);
                }}
                >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


export function TableIngreso({ tabla, setTabla, setIngresoEditando }) {
  return (
    <table className="tabla-ingresos">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Productor ID</th>
          <th>Tipo</th>
          <th>Cantidad</th>
          <th>CTN ID</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {tabla.map(item => (
          <tr key={item.id}>
            <td>{new Date(item.fecha).toISOString().split("T")[0]}</td>
            <td>{item.productor_id}</td>
            <td>{item.tipo}</td>
            <td>{item.cantidad}</td>
            <td>{item.ctn_id}</td>
            <td>
              <button className="btn-editar" onClick={() => setIngresoEditando(item)}>
                Editar
              </button>
              <button
                className="btn-eliminar"
                onClick={() => setTabla(tabla.filter(fila => fila.id !== item.id))}onClick={async () => {
                  await fetch(`http://localhost:5000/api/ingresos/${item.id}`, {
                    method: "DELETE"
                  });
                  // recargar datos
                  const res = await fetch("http://localhost:5000/api/ingresos");
                  const data = await res.json();
                  setTabla(data.body);
                }}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function TableCTN({ tabla, setTabla, setCTNEditando }) {
  return (
    <table className="tabla-ctn">
      <thead>
        <tr>
          <th>Código</th>
          <th>Fecha</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {tabla.map(item => (
          <tr key={item.id}>
            <td>{item.codigo}</td>
            <td>{new Date(item.fecha).toISOString().split("T")[0]}</td>
            <td>{item.estado}</td>
            <td>
              <button className="btn-editar" onClick={() => setCTNEditando(item)}>
                Editar
              </button>
              <button
                className="btn-eliminar"
                onClick={async () => {
                  await fetch(`http://localhost:5000/api/ctn/${item.id}`, {
                    method: "DELETE"
                  });
                  // recargar datos
                  const res = await fetch("http://localhost:5000/api/ctn");
                  const data = await res.json();
                  setTabla(data.body);
                }}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function TableFacturas({ tabla, setTabla, setFacturaEditando, setFacturaVer}) {
  return (
    <table className="tabla-ctn">
      <thead>
        <tr>
          <th>Número</th>
          <th>Fecha</th>
          <th>Productor</th>
          <th>CTN</th>
          <th>Total</th>
          <th>Tipo</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {tabla.map(item => (
          <tr key={item.id}>
            <td>{item.numero_factura}</td>
            <td>{new Date(item.fecha).toISOString().split("T")[0]}</td>
            <td>{item.productor_id}</td>
            <td>{item.ctn_id}</td>
            <td>{item.total}</td>
            <td>{item.tipo}</td>
            <td>{item.estado}</td>
            <td>
              <button className="btn-ver" onClick={() => setFacturaVer(item)}>
                Ver
              </button>
              <button className="btn-editar" onClick={() => setFacturaEditando(item)}>
                Editar
              </button>
              <button
                className="btn-eliminar"
                onClick={async () => {
                  await fetch(`http://localhost:5000/api/facturas/${item.id}`, {
                    method: "DELETE"
                  });
                  // recargar datos
                  const res = await fetch("http://localhost:5000/api/facturas");
                  const data = await res.json();
                  setTabla(data.body);
                }}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
