import React, { useState } from "react";
import AuthForm from "./AuthForm";

function AuthPage({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <AuthForm onAuth={onAuth} isLogin={isLogin} setIsLogin={setIsLogin} />
  );
}

export default AuthPage;
