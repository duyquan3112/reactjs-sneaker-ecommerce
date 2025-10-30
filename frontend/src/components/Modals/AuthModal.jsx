import React, { useState } from "react";
import AppModal from "./AppModal";
import LoginForm from "../Forms/LoginForm";
import RegisterForm from "../Forms/RegisterForm";
import AppLogger from "../../utils/AppLogger";

const panelType = {
  SignIn: {
    title: "Sign In",
    description: "Use email and password to sign-in to your account.",
    buttonTitle: "Sign In"
  },
  SignUp: {
    title: "Sign Up",
    description: "Create new account.",
    buttonTitle: "Sign Up"
  }
};

const AuthModal = () => {
  const TRANSITION_DURATION = 200;
  const [panel, setPanel] = useState(panelType.SignIn);
  const [isSwitchingPanel, setInSwitchingPanel] = useState(false);

  const changePanel = (changedPanel) => {
    setInSwitchingPanel(true);
    setTimeout(() => {
      setPanel(changedPanel);
      setInSwitchingPanel(false);
    }, TRANSITION_DURATION);
  };

  const buildPanel = () => {
    return (
      <div
        className={`transform transition-all duration-200 ease-in-out ${
          isSwitchingPanel
            ? "opacity-0 -translate-x-4"
            : "opacity-100 -translate-x-0"
        }`}
      >
        {panel === panelType.SignUp ? (
          <RegisterForm setPanel={() => changePanel(panelType.SignIn)} />
        ) : (
          <LoginForm setPanel={() => changePanel(panelType.SignUp)} />
        )}
      </div>
    );
  };

  return (
    <AppModal
      buttonTitle={panelType.SignIn.buttonTitle}
      buttonClassName={
        "bg-white border border-black text-black hover:text-white"
      }
      // outsideDismissible={false}
      title={panel.title}
      desciption={panel.description}
      children={buildPanel()}
      onOpen={() => {
        // reset panel to initial every time modal is opened
        setPanel(panelType.SignIn);
      }}
    />
  );
};

export default AuthModal;
