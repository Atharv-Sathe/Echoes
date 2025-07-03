import PropTypes from "prop-types";
import { Link, Outlet } from "react-router-dom";
import { HiViewGrid } from 'react-icons/hi';

export default function FocusLayout() {
  return (
    <div className="relative min-h-screen">
      {/* The "escape hatch" to the dashboard */}
      <Link to="/home">
        <div className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all">
          <HiViewGrid className="w-6 h-6 text-gray-800 dark:text-gray-200" />
        </div>
      </Link>

      <Outlet />
    </div>
  );
}

FocusLayout.propTypes = {
  children: PropTypes.node,
};
