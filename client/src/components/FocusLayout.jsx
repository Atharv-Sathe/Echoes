import PropTypes from 'prop-types';

export default function FocusLayout({children}) {
    return (
        <div className="focus-layout">
            {children}
        </div>
    );
}

FocusLayout.propTypes = {
    children: PropTypes.node
};