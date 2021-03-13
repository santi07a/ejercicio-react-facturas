import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const Buscador = props => {
  const { busqueda, modificaBusqueda, realizaBusqueda } = props;
  return (
    <Form onSubmit={realizaBusqueda}>
      <Form.Label>
        Buscar
      </Form.Label>
      <Form.Control
        type="text"
        className="form-control-sm"
        value={busqueda}
        placeholder="Num de factura"
        onChange={modificaBusqueda}
      ></Form.Control>
    </Form>
  );
};

Buscador.propTypes = {
  busqueda: PropTypes.string.isRequired,
  modificaBusqueda: PropTypes.func.isRequired,
  realizaBusqueda: PropTypes.func.isRequired
};

export default Buscador;
