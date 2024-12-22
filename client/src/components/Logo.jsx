import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

export default function Logo({textSize = "text-sm sm:text-xl"}) {
  return (
    <Link
        to="/"
        className={`self-center whitespace-nowrap ${textSize} font-semibold dark:text-white`}
    >
        <span className="px-2 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-md">
        Echoes
        </span>
  </Link>
)}

Logo.propTypes = {
  textSize: PropTypes.string
};
