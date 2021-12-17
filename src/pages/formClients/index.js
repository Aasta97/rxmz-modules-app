import React from 'react';

import { 
    Container, ContainerForm, Form, 
    Textarea, InputGroup, Input, Select, 
    Option, Button } from '../../global';

import Menu from '../../components/Menu';

const formClients = () => {
  return(
    <Container>
        <Menu />
        <ContainerForm>
            <Form>
                <InputGroup>
                    <Input
                    type="text"
                    name="cnpjcpf"
                    placeholder="CNPJ/CPF"
                    onChange={()=>{}}
                    required
                    />
                    <Select
                        name="status"
                        onChange={()=>{}}
                        required
                    >
                        <Option value="Ativo">Ativo</Option> 
                        <Option value="Inativo">Inativo</Option>  
                    </Select>
                </ InputGroup>

                <InputGroup>
                    <Input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    onChange={()=>{}}
                    required
                    />
                    <Input
                    type="text"
                    name="apelido"
                    placeholder="Apelido"
                    onChange={()=>{}}
                    required
                    />
                </ InputGroup>

                <InputGroup>
                    <Input
                    type="text"
                    name="telefone"
                    placeholder="Telefone"
                    onChange={()=>{}}
                    required
                    />
                    <Input
                    type="text"
                    name="email"
                    placeholder="E-mail"
                    onChange={()=>{}}
                    required
                    />
                </ InputGroup>

                <InputGroup>
                    <Button className="default">Salvar</Button> 
                    <Button className="error">Cancelar</Button> 
                </InputGroup> 
                 
            </Form>
        </ContainerForm>
    </Container>
  );
}

export default formClients;