import { useState } from "react";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { SignUpForm } from "../components/SignUpForm/SignUpForm";

export const LoginPage = () => {
  const [showLoginForm, setShowLoginForm] = useState<boolean>(true);

  return (
    <>
      <Wrapper sectionHeader headerText={showLoginForm ? "Login" : "Sign Up"}>
        {showLoginForm ? (
          <LoginForm setShowLoginForm={setShowLoginForm} />
        ) : (
          <SignUpForm setShowLoginForm={setShowLoginForm} />
        )}
      </Wrapper>
    </>
  );
};
