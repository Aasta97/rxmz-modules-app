import React from 'react';

import { 
    Container, ContainerForm, Form, 
    Textarea, InputGroup, Input, Select, 
    Option, Button } from '../../global';

import Menu from '../../components/Menu';

const formReceiptsOld = () => {
  return(
    <Container>
        <Menu />
        <ContainerForm>
            <Form>
                <InputGroup>
                    <Input
                    type="text"
                    name="titulo"
                    placeholder="Nome para o recibo"
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
                <Textarea
                    type="text"
                    name="descricao"
                    placeholder="Descrição"
                    onChange={()=>{}}
                    required
                ></Textarea>
                
                <InputGroup>
                    <Input
                        type="text"
                        name="valor"
                        placeholder="Valor (R$)"
                        onChange={()=>{}}
                        required
                    />
                        
                    <Input
                        type="date"
                        name="data"
                        placeholder="Data do recibo"
                        onChange={()=>{}}
                        required
                    />
                </InputGroup>  

                <InputGroup>
                    <Button className="default">Salvar</Button> 
                    <Button className="error">Cancelar</Button> 
                </InputGroup> 
                 
            </Form>
        </ContainerForm>
    </Container>
  );
}

export default formReceiptsOld;