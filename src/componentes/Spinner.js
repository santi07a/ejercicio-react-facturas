import PropTypes from "prop-types";

const Spinner = props => {
  const { nombreClase, imgUrl, altImg } = props;
  return (<div className={nombreClase}>
    <img src={imgUrl} alt={altImg} />
  </div>);
};

Spinner.propTypes = {
  nombreClase: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  altImg: PropTypes.string.isRequired,
};
export default Spinner;
