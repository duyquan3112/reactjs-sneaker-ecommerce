import React from "react";
import AppRouter from "./routes/index.jsx";
import { Toaster } from "sonner";

const App = () => {
  return (
    <div className="h-full w-full">
      <Toaster
        position="top-center"
        theme="system"
        closeButton={true}
        duration={4000}
        toastOptions={{
          toasterId: "global",
        }}
      />
      <AppRouter />
    </div>
  );
};

export default App;
