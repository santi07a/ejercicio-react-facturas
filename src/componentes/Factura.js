import { DateTime } from "luxon";


const Factura = (props) => {
  const { factura, verificaVencimiento, compruebaVencimiento } = props;
  return (
    <tr className="factura">
      <td className="numero">{factura.numero}</td>
      <td className="fecha">{DateTime.fromMillis(+factura.fecha).setLocale("es").toLocaleString()}</td>
      <td className="concepto">{factura.concepto}</td>
      <td><span className="base">{factura.base}</span>€</td>
      <td><span
        className="cantidad-iva"
      >{factura.tipoIva}</span>€ (<span className="tipo-iva"></span>%)</td>
      <td><span className="total">{factura.base * (1 + factura.tipoIva / 100)}</span>€</td>
      <td
        className={`estado${factura.abonada ? " table-success" : " table-danger"}`}
      >{factura.abonada ? "Abonada" : "No abonada"}</td>
      <td
        className={`vencimiento${factura.abonada ?
          " table-success" :
          (verificaVencimiento(factura.vencimiento) ? " table-success" : " table-danger")}`}
      >{factura.abonada ? "-" : compruebaVencimiento(factura.vencimiento)}</td>
    </tr>
  );
};

export default Factura;
