import { Col, Container, Form, FormControl, Row, Table, ToastHeader } from "react-bootstrap";
import Buscador from "./componentes/Buscador";

import Factura from "./componentes/Factura";
import Totales from "./componentes/Totales";
import { useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";

const urlFacturas = "http://localhost:3001/facturas";

function App() {
  const [facturas, setFacturas] = useState([]);
  const { datos: facturasAPI } = useFetch(urlFacturas);
  const [totalBase, setTotalBase] = useState(0);
  const [totalIva, setTotalIva] = useState(0);
  const [totalTotal, setTotalTotal] = useState(0);

  useEffect(() => {
    if (facturas.length > 0) {
      setTotalBase(facturas.map(factura => factura.base).reduce((acc, base) => acc + base));
      setTotalIva(facturas.map(factura => factura.base * (factura.tipoIva / 100)).reduce((acc, iva) => acc + iva));
      setTotalTotal(Math.round(facturas.map(factura => factura.base + factura.base * (factura.tipoIva / 100)).reduce((acc, total) => acc + total) * 100) / 100);
    } else {
      setTotalBase(0);
      setTotalIva(0);
      setTotalTotal(0);
    }
  }, [facturas]);


  useEffect(() => {
    if (facturasAPI) {
      setFacturas(facturasAPI.filter(facturaAPI => facturaAPI.tipo === "ingreso"));
    }
  }, [facturasAPI]);
  console.log(facturas);

  const { DateTime } = require("luxon");
  const cantidadIVA = (base, tipoIVA) => base * (tipoIVA / 100);
  const verificaVencimiento = (fechaHoy, fechaVencimiento) => {
    if (fechaVencimiento > fechaHoy) {
      return true;
    } else {
      return false;
    }
  };
  const comprobarVencimiento = (vencimiento) => {
    const fechaHoy = DateTime.local();
    const fechaVencimiento = DateTime.fromMillis(+vencimiento);
    const diferenciaFechas = fechaVencimiento.diff(fechaHoy, "days").toObject();
    const diferenciaDias = Math.abs(Math.trunc(diferenciaFechas.days));
    if (verificaVencimiento(fechaHoy, fechaVencimiento)) {
      return `${fechaVencimiento.setLocale("es").toLocaleString()} (faltan ${diferenciaDias} días)`;
    } else {
      return `${fechaVencimiento.setLocale("es").toLocaleString()} (hace ${diferenciaDias} días)`;
    }
  };

  return (
    <>
      <Container fluid as="section" className="principal">
        <Row as="header" className="cabecera">
          <Col as="h2">
            Listado de ingresos
        </Col>
        </Row>
        <main>
          <Row>
            <Col as="div" className="info-listado info-listado-top text-right">
              <Buscador />
            </Col>
          </Row>
          <Table striped bordered hover className="listado">
            <thead className="thead-light">
              <tr>
                <th className="col-min">Num.</th>
                <th className="col-med">Fecha</th>
                <th className="col-concepto">Concepto</th>
                <th className="col-med">Base</th>
                <th className="col-max">IVA</th>
                <th className="col-med">Total</th>
                <th className="col-max">Estado</th>
                <th className="col-max">Vence</th>
              </tr>
            </thead>
            <tbody>
              {
                facturas.map(factura => <Factura
                  key={factura.id}
                  factura={factura}
                  cantidadIVA={cantidadIVA}
                  verificaVencimiento={verificaVencimiento}
                  compruebaVencimiento={comprobarVencimiento}
                />)
              }
            </tbody>
            <Totales
              totalBase={totalBase}
              totalIva={totalIva}
              totalTotal={totalTotal} />
          </Table>
        </main>
      </Container >
      <div className="loading off">
        <img src="img/loading.svg" alt="cargando" />
      </div>
    </>
  );
}

export default App;
