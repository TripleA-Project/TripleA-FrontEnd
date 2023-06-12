"use client";

import React, { useState, ChangeEvent } from "react";
import ActionInput from "../components/ActionInput/ActionInput";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [name, setName] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleVerifyCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVerifyCode(e.target.value);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
      }}
    >
      <h1>Login Page</h1>
      <ActionInput
        type="loginEmail"
        value={email}
        onChange={handleEmailChange}
      />
      <ActionInput
        type="loginPw"
        value={password}
        onChange={handlePasswordChange}
      />
      <ActionInput
        type="mainSearch"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <ActionInput
        type="selectSearch"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <ActionInput
        type="registerPw"
        value={password}
        onChange={handlePasswordChange}
      />
      <ActionInput
        type="registerVerify"
        value={email}
        onChange={handleEmailChange}
      />
      <ActionInput
        type="registerVerifyAgain"
        value={email}
        onChange={handleEmailChange}
      />
      <ActionInput
        type="registerTimer"
        value={verifyCode}
        onChange={handleVerifyCodeChange}
      />
      <ActionInput type="name" value={name} onChange={handleNameChange} />
    </div>
  );
};

export default LoginPage;
