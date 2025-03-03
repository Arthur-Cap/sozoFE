import React, { useState } from "react";
import "../../body.css";
import AuthTitle from "../../../../components/AuthTitle";
import TextInput from "../../../../components/TextInput";
import Button from "../../../../components/Button";

const Body: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="auth-body">
      <AuthTitle
        welcomeString="WELCOME TO JOIN US !"
        titleString="Register"
        redirectString="Already had an account?"
        linkString="/login"
      />
      <TextInput
        title="Email"
        typeInput="text"
        setState={setEmail}
        height={"70px"}
        width={"clamp(50px, 100%, 500px)"}
        backgroundColor="rgba(240, 248, 255, 0.166)"
        borderRadius={6}
      ></TextInput>
      <TextInput
        title="Username"
        typeInput="text"
        setState={setEmail}
        height={"70px"}
        width={"clamp(50px, 100%, 500px)"}
        backgroundColor="rgba(240, 248, 255, 0.166)"
        borderRadius={6}
      ></TextInput>
      <TextInput
        title="Password"
        typeInput="password"
        setState={setEmail}
        height={"70px"}
        width={"clamp(50px, 100%, 500px)"}
        backgroundColor="rgba(240, 248, 255, 0.166)"
        borderRadius={6}
      ></TextInput>
      <Button
        title="Register"
        color="black"
        iconName="" 
        height="65px"
        width="clamp(50px, 100%, 500px)"
        backgroundColor="#00ff38"
        borderRadius={5}
        fontSize="15px"
        fontWeight="bold"
        onClick={()=>{}}
      />
      <span>This is just another test case </span>
    </div>
  );
};

export default Body;
