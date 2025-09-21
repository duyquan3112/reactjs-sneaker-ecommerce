import { Link } from "react-router-dom";

import PATH from "../routes/path.js";

/*
  Please use /not-found if you want to navigate to the not found page
*/

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-2xl">Page Not Found</p>
      <Link to={PATH.HOME} className="text-blue-500">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
