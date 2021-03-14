import PropTypes from "prop-types";

const Spinner = props => {
  const { nombreClase } = props;
  return (<div className={nombreClase}>
    <img src="img/loading.svg" alt="cargando" />
  </div>);
};

Spinner.propTypes = {
  nombreClase: PropTypes.string.isRequired
};
export default Spinner;
