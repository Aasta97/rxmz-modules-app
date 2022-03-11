import React, { useState, useEffect } from 'react';
import { Container } from '../../global';
import { ContainerCards, Card, CardUsers } from './styles';
import Menu from '../../components/Menu';

import api from "../../services/api";

const Initial = () => {
  const [loaded, setLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [receipts, setReceipts] = useState([]);

  useEffect( () =>{
    getUsers();
    getReceipts();
  }, []);

  async function getReceipts(){
    await api
    .post("/receipts/list", {key_company: localStorage.getItem("key_company")})
    .then((response) => {         
        setReceipts(response.data.receipts);
        setLoaded(true);
    })
    .catch((err) => {
      console.log(err.response.data.error);
    });
  }

  async function getUsers(){
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
        {loaded ? 
          <>
            <CardUsers>
              Quantidade de usuários
              <h2>{users.length || 0}</h2>
            </CardUsers>
            <Card>
              Quantidade de recibos
              <h2>{receipts.length || 0}</h2>
            </Card>
          </>
          :
          <label>Carregando...</label>
        }          
        </ContainerCards>
      
    </Container>
  );
}

export default Initial;