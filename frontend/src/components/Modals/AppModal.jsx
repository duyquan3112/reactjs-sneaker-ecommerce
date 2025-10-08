import React, { forwardRef } from "react";
import { createPortal } from "react-dom";

const AppModal = forwardRef(
  ({ children, hideDefaultCloseButton = false }, ref) => {
    return createPortal(
      <dialog
        id="app-modal"
        className="flex flex-col gap-2 px-4 py-3 bg-white rounded-lg"
        ref={ref}
      >
        {!hideDefaultCloseButton && (
          <form method="dialog">
            <div className="w-full flex items-center justify-center font-bold text-md text-black rounded-full">
              <button className="h-8 w-8 flex items-center justify-center hover:bg-gray-100 hover:text-gray-500 rounded-full">
                X
              </button>
            </div>
          </form>
        )}
        {children}
      </dialog>,
      document.getElementById("app-portal")
    );
  }
);

export default AppModal;
