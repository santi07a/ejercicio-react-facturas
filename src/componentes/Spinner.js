import PropTypes from "prop-types";

const Spinner = props => {
  const { className } = props;
  return (<div className={className}>
    <img src="img/loading.svg" alt="cargando" />
  </div>);
};

Spinner.propTypes = {
  className: PropTypes.string.isRequired,
};
export default Spinner;
