import { Col, Container, Form, FormControl, Row, Table, ToastHeader } from "react-bootstrap";
import Buscador from "./componentes/Buscador";
import { DateTime } from "luxon";
import Facturas from "./componentes/Facturas";
import Totales from "./componentes/Totales";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

function App() {
  const [facturas, setFacturas] = useState([]);
  const { datos: facturasAPI } = useFetch(`${process.env.REACT_APP_API_URL}`);
  useEffect(() => {
    if (facturasAPI) {
      setFacturas(facturasAPI.filter(facturaAPI => facturaAPI.tipo === "ingreso"));
    }
  }, [facturasAPI]);
  const { DateTime } = require("luxon");
  const cantidadIVA = (base, tipoIVA) => base * (tipoIVA / 100);
  const verificaVencimiento = (fechaHoy, fechaVencimiento) => {
    if (fechaVencimiento > fechaHoy) {
      return true;
    } else {
      return false;
    }
  };
  const compruebaVencimiento = (vencimiento) => {
    const fechaHoy = DateTime.local();
    const fechaVencimiento = DateTime.fromMillis(+vencimiento);
    const difFechas = fechaVencimiento.diff(fechaHoy, "days").toObject();
    const diasDif = Math.abs(Math.trunc(difFechas.days));
    if (verificaVencimiento(fechaHoy, fechaVencimiento)) {
      return `${fechaVencimiento.toLocaleString()} (faltan ${diasDif} días)`;
    } else {
      return `${fechaVencimiento.toLocaleString()} (hace ${diasDif} días)`;
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
            <Facturas
              DateTime={DateTime}
              facturas={facturas}
              cantidadIVA={cantidadIVA}
              verificaVencimiento={verificaVencimiento}
              compruebaVencimiento={compruebaVencimiento} />
            <Totales />
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
