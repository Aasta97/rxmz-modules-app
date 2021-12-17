import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, InputGroup, Form, Card, Image } from "./styles";
import { Input, Button } from '../../global';

import api from "../../services/api";
import { login } from "../../services/auth";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    
    const { username, password } = formData;

    await api
      .post("/auth/authenticate", { username, password })
      .then((response) => {
        console.log(response);
        const { token } = response.data;

        login(token);
        
        navigate("/inicio");
      })
      .catch((err) => {
        setMessage(err.response.data.error);
      });
  }

  return (
    <Container>
      <InputGroup>
        <Form onSubmit={handleSubmit}>
          {message && <div className="message">{message}</div>}
            <Input
              type="text"
              name="username"
              placeholder="Usuário"
              onChange={handleInputChange}
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Senha"
              onChange={handleInputChange}
              required
            />

          <Button type="submit">Entrar</Button>
        </Form>
      </InputGroup>
      <Card>
        <Image src="/banner.png" />
      </Card>
    </Container>
  );
};

export default Login;
