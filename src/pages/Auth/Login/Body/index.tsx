import React, { useState } from "react";
import "../../body.css";
import AuthTitle from "../../../../components/AuthTitle";
import TextInput from "../../../../components/TextInput";
import Button from "../../../../components/Button";
import { useLogin } from "../../../../hooks/useAuth";

const Body: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  
  const loginMutation = useLogin();

  const handleLogin = () => {
    if (!userName || !password) {
      alert("Please fill in both email and password.");
      return;
    }
    
    loginMutation.mutate({ userName, password });
  };

  return (
    <div className="auth-body">
      <AuthTitle
        welcomeString="WELCOME BACK !"
        titleString="Login to your account"
        redirectString="Don't have an account yet?"
        linkString="/register"
      />
      <TextInput
        title="User name"
        typeInput="text"
        setState={setUserName}
        height={"70px"}
        width={"clamp(50px, 100%, 500px)"}
        backgroundColor="rgba(240, 248, 255, 0.166)"
        borderRadius={6}
      />
      <TextInput
        title="Password"
        typeInput="password"
        setState={setPassword}
        height={"70px"}
        width={"clamp(50px, 100%, 500px)"}
        backgroundColor="rgba(240, 248, 255, 0.166)"
        borderRadius={6}
      />
      <Button
        title="Login"
        color="black"
        iconName=""
        height="65px"
        width="clamp(50px, 100%, 500px)"
        backgroundColor="#00ff38"
        borderRadius={5}
        fontSize="15px"
        fontWeight="bold"
        onClick={handleLogin}
      />
    </div>
  );
};

export default Body;
