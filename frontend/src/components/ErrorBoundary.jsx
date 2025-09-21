import { Component } from "react";
import { NotFoundPage } from "../components";
import AppLogger from "../utils/AppLogger";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    AppLogger.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen sm:w-[80%] mx-auto mt-14 mb-6 px-0 sm:px-4 flex flex-col items-center justify-center">
          <p className="text-2xl font-medium text-center">
            Unexpected error occurred :( <br /> Please try again later.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
