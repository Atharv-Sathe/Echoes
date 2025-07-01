import { Button, Spinner } from "flowbite-react";
import PropTypes from "prop-types";

export const LoaderButton = ({ text }) => {
  return (
    <Button color="red">
      <Spinner aria-label={text} size="sm" light />
      <span className="pl-3">{text}</span>
    </Button>
  );
};


LoaderButton.propTypes = {
  text: PropTypes.string.isRequired,
};
