import { Col, Container, Form, FormControl, Row, Table, ToastHeader } from "react-bootstrap";
import Buscador from "./componentes/Buscador";
import { DateTime } from "luxon";
import Factura from "./componentes/Factura";
import Totales from "./componentes/Totales";
import { useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import Spinner from "./componentes/Spinner";

function App() {
  const [facturas, setFacturas] = useState([]);
  const [urlApi, setUrlApi] = useState(`${process.env.REACT_APP_API_URL}`);
  const { datos: facturasAPI, spinner: spinnerOn } = useFetch(urlApi);
  const [totalBase, setTotalBase] = useState(0);
  const [totalIva, setTotalIva] = useState(0);
  const [totalTotal, setTotalTotal] = useState(0);
  const [busqueda, setBusqueda] = useState("");
  const [noHayFacturas, setNoHayFacturas] = useState(false);
  const spinnerUrl = "img/loading.svg";

  useEffect(() => {
    if (facturas.length > 0) {
      setTotalBase(facturas.map(factura => factura.base).reduce((acc, base) => acc + base));
      setTotalIva(facturas.map(factura => factura.base * (factura.tipoIva / 100)).reduce((acc, iva) => acc + iva));
      setTotalTotal(Math.round(facturas.map(factura => factura.base + factura.base * (factura.tipoIva / 100)).reduce((acc, total) => acc + total) * 100) / 100);
    } else if (noHayFacturas) {
      setTotalBase(0);
      setTotalIva(0);
      setTotalTotal(0);
    }
  }, [facturas, noHayFacturas]);


  useEffect(() => {
    if (facturasAPI) {
      setFacturas(facturasAPI.filter(facturaAPI => facturaAPI.tipo === "ingreso"));
      setNoHayFacturas(false);
    }
  }, [facturasAPI]);

  const verificaVencimiento = (vencimiento) => {
    const fechaHoy = DateTime.local();
    const fechaVencimiento = DateTime.fromMillis(+vencimiento);
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
    if (verificaVencimiento(vencimiento)) {
      return `${fechaVencimiento.setLocale("es").toLocaleString()} \
      (faltan ${Math.ceil(diferenciaFechas.days)} d??as)`;
    } else {
      return `${fechaVencimiento.setLocale("es").toLocaleString()} \
      (hace ${Math.abs(Math.trunc(diferenciaFechas.days))} d??as)`;
    }
  };
  const modificaBusqueda = (e) => {
    setBusqueda(e.target.value);
  };
  const realizaBusqueda = (e) => {
    e.preventDefault();
    const arrayBusquedas = busqueda.split(",").map(factura => factura.replace(" ", ""));
    if (busqueda === "") {
      setFacturas(facturasAPI.filter(facturaAPI => facturaAPI.tipo === "ingreso"));
      setNoHayFacturas(false);
    } else {
      const facturasCoincidentes = facturasAPI.filter(facturaAPIs => arrayBusquedas.includes(facturaAPIs.numero));
      setFacturas(facturasCoincidentes);
      if (facturasCoincidentes.length === 0) {
        setNoHayFacturas(true);
      } else {
        setNoHayFacturas(false);
      }
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
              <Buscador
                busqueda={busqueda}
                modificaBusqueda={modificaBusqueda}
                realizaBusqueda={realizaBusqueda} />
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
              <tr hidden={!noHayFacturas} className="factura">
                <th className="text-center" colSpan="8">Ninguna factura coincide con tu b??squeda</th>
              </tr>
              {
                facturas.map(factura => <Factura
                  key={factura.id}
                  factura={factura}
                  verificaVencimiento={verificaVencimiento}
                  comprobarVencimiento={comprobarVencimiento}
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
      <Spinner
        nombreClase={`loading ${spinnerOn}`}
        imgUrl={spinnerUrl}
        altImg="Cargando" />
    </>
  );
}

export default App;
