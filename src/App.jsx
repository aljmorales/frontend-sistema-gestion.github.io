import {Link, Route, Routes, useParams, Outlet} from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./styles/App.css";

import Navbar from "./components/Navbar.jsx"
import Sidebar from "./components/Sidebar.jsx"
import Productores from "./pages/Productores.jsx";
import Ingresos from "./pages/Ingresos.jsx";
import Ctn from "./pages/CTN.jsx";
import Facturas from "./pages/Facturas.jsx";
import pdf from "./recursos/PRUEBA.pdf";

function App() {
  const location = useLocation();
  console.log("Ruta actual:", location.pathname);
  return (
  <>
    <Navbar />
    <div className="layout">
      <Sidebar />
      <main className="content">
        <Routes>
          <Route
            path="/"
            element={
              <div className="home-container">
                <h1>Sistema de Gestión de Facturación</h1>

                <p className="home-subtitle">
                  Plataforma web diseñada para la administración eficiente de facturas,
                  productores y control de operaciones comerciales.
                </p>

                <div className="home-cards">

                  <div className="card">
                    <h3>Facturación</h3>
                    <p>
                      Crea, edita y gestiona facturas con múltiples detalles,
                      cálculo automático de totales y exportación en PDF.
                    </p>
                  </div>

                  <div className="card">
                    <h3>Productores</h3>
                    <p>
                      Administra información de productores de manera organizada,
                      permitiendo su uso en operaciones de compra y venta.
                    </p>
                  </div>

                  <div className="card">
                    <h3>Control CTN</h3>
                    <p>
                      Lleva el control de contenedores y su relación con las
                      operaciones registradas en el sistema.
                    </p>
                  </div>
                </div>
                <div className="home-footer">
                  <p>
                    Demo interactiva: Puedes explorar todas las funcionalidades libremente.
                  </p>
                  <img 
                    src="https://grupo-losangeles.com/wp-content/uploads/2024/10/San-Miguel-Arcangel1.webp" 
                    alt="San Miguel Arcangel"
                    style={{ width: "200px",  height: "auto", border:"3px solid green" }} 
                  />
                </div>
              </div>
            }
          />
          <Route path="/productores" element={<Productores />} />
          <Route path="/ingresos" element={<Ingresos />} />
          <Route path="/ctn" element={<Ctn/>} />
          <Route path="/facturacion" element={<Facturas/>} />
          <Route
            path="/reportes"
            element={
              <div style={{ padding: "20px" }}>
                <h2 style={{ marginBottom: "10px" }}>
                  📊 Análisis de Ventas y Facturación
                </h2>

                <p style={{ marginBottom: "20px", color: "#555" }}>
                  Dashboard desarrollado en Power BI para analizar ingresos, productos y
                  comportamiento de ventas. Este reporte simula el análisis de datos
                  generados por el sistema de facturación.
                </p>

                <div
                  style={{
                    width: "100%",
                    height: "600px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    overflow: "hidden",
                    background: "#f9f9f9"
                  }}
                >
                  <iframe
                    title="PRUEBA"
                    src="https://app.powerbi.com/view?r=eyJrIjoiYTE0NDdjOGQtNGY1MC00YWRjLWExYjEtMmE1ZTU4ZWYwNDkzIiwidCI6ImM0YTY2YzM0LTJiYjctNDUxZi04YmUxLWIyYzI2YTQzMDE1OCIsImMiOjR9"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen={true}
                    style={{ border: "none" }}
                  />
                </div>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  </>

  );
}

export default App
