import React, { useState, useEffect } from 'react';
import { Container } from '../../global';
import { ContainerCards, Card } from './styles';
import Menu from '../../components/Menu';

import api from "../../services/api";

const Initial = () => {
  const [users, setUsers] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect( () =>{
    getUsers();
    getReceipts();
    getProducts();
    getClients();
  }, []);

  const getReceipts = async () => {
    await api
    .post("/receipts/list", {key_company: localStorage.getItem("key_company")})
    .then((response) => {         
        setReceipts(response.data.receipts);
    })
    .catch((err) => {
      console.log(err.response.data.error);
    });
  }

  const getProducts = async () => {
    await api
    .post("/products/list", {key_company: localStorage.getItem("key_company")})
    .then((response) => {         
        setProducts(response.data.products);
    })
    .catch((err) => {
      console.log(err.response.data.error);
    });
  }

  const getClients = async () => {
    await api
    .post("/clients/list", {key_company: localStorage.getItem("key_company")})
    .then((response) => {         
      setClients(response.data.clients);
    })
    .catch((err) => {
      console.log(err.response.data.error);
    });
  }

  const getUsers = async () => {
    await api
    .post("/users/list", {key_company: localStorage.getItem("key_company")})
    .then((response) => {         
        setUsers(response.data.users);
    })
    .catch((err) => {
        console.log(err.response.data.error);
    });
  }

  return(
    <Container>
      <Menu />
      
        <ContainerCards>
        <Card color='#934444'>
          Quantidade de usuários
          <h2>{users.length || 0}</h2>
        </Card>
        <Card color='#4d4493'>
          Quantidade de clientes
          <h2>{clients.length || 0}</h2>
        </Card>   
        <Card color='#4e8f4c'>
          Quantidade de produtos
          <h2>{products.length || 0}</h2>
        </Card>
        <Card color='#f5cb42'>
          Quantidade de recibos
          <h2>{receipts.length || 0}</h2>
        </Card>       
        </ContainerCards>
      
    </Container>
  );
}

export default Initial;