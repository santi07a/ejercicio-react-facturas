function App() {
  return (
    <>
      <section className="principal container-fluid">
        <header className="cabecera row">
          <h2 className="col">Listado de ingresos</h2>
        </header>
        <main>
          <div className="row">
            <div className="info-listado info-listado-top col text-right">
              <label>
                Buscar
            <input type="text" className="form-control form-control-sm" />
              </label>
            </div>
          </div>
          <table className="listado table table-striped table-bordered table-hover">
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
              <tr className="factura factura-dummy">
                <td className="numero"></td>
                <td className="fecha"></td>
                <td className="concepto"></td>
                <td><span className="base"></span>€</td>
                <td><span className="cantidad-iva"></span>€ (<span className="tipo-iva"></span>%)</td>
                <td><span className="total"></span>€</td>
                <td className="estado"></td>
                <td className="vencimiento"></td>
              </tr>
              <tr>
                <td>1000</td>
                <td>13/06/2018</td>
                <td>App Angular</td>
                <td>3000€</td>
                <td>630€ (21%)</td>
                <td>3630€</td>
                <td className="table-success">Abonada</td>
                <td className="table-success">-</td>
              </tr>
              <tr>
                <td>1000</td>
                <td>13/06/2018</td>
                <td>App Angular</td>
                <td>3000€</td>
                <td>630€ (21%)</td>
                <td>3630€</td>
                <td className="table-danger">Pendiente</td>
                <td className="table-danger">28/2/2021 (hace x días)</td>
              </tr>
              <tr>
                <td>1000</td>
                <td>13/06/2018</td>
                <td>App Angular</td>
                <td>3000€</td>
                <td>630€ (21%)</td>
                <td>3630€</td>
                <td className="table-danger">Pendiente</td>
                <td className="table-success">1/4/2021 (faltan x días)</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="totales">
                <th className="text-right" colspan="3">Totales:</th>
                <td><span className="total-bases"></span>€</td>
                <td><span className="total-ivas"></span>€</td>
                <td><span className="total-totales"></span>€</td>
                <td colspan="2"></td>
              </tr>
            </tfoot>
          </table>
        </main>
      </section>
      <div className="loading off">
        <img src="img/loading.svg" alt="cargando" />
      </div>
    </>
  );
}

export default App;
