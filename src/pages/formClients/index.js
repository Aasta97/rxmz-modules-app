import React, { useState, useEffect } from 'react';
import { useNavigate, useParams  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
    Container, 
    Form, 
    Col, 
    Row, 
    ButtonToolbar, 
    ButtonGroup, 
    Button } from 'react-bootstrap';

import Menu from '../../components/Menu';
import api from "../../services/api";

const FormClients = (props) => {
    const [formData, setFormData] = useState({ 
        key_company: localStorage.getItem('key_company'),
        name: "", 
        cpf_cnpj: "", 
        phone: "", 
        email: ""
    });
    
    const { id } = useParams();
    
    const navigate = useNavigate();   
    const notifyWarn = (message) => toast.warn(message);

    useEffect(()=>{
        if(id !== undefined){
            const getClientById = async (id) => {
                await api
                .post(`/clients/find/${id}`, {key_company: localStorage.getItem("key_company")})
                .then((response) => {
                    const { name, cpf_cnpj, phone, email } = response.data.client;
                    setFormData({
                        name, 
                        cpf_cnpj, 
                        phone, 
                        email
                    });
                })
                .catch((err) => {
                    notifyWarn(err.response.data.error);
                });      
            }

            getClientById(id);
        }        
    }, [id]);

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    }

    function validateFields(){
        let validForm = true;
        if(formData.name === ""){ 
            notifyWarn("O nome não pode ser vázio"); 
            validForm = false;
        }
        if(formData.cpf_cnpj === ""){ 
            notifyWarn("O CPF ou CNPJ não pode ser vázio"); 
            validForm = false;
        }
        if(formData.phone === ""){ 
            notifyWarn("A telefone não pode ser vázio"); 
            validForm = false;
        }
        if(formData.email === ""){ 
            notifyWarn("O e-mail não pode ser vázio"); 
            validForm = false;
        }
        
        return validForm;
    }

    async function handleForm(event){
        event.preventDefault();
        if(validateFields()){
            if(id !== undefined){                
                await api.put(`/clients/change/${id}`, formData)
                .then((response) => {
                    navigate('/clientes/listar');
                })
                .catch((err) => {
                    notifyWarn(err.response.data.error);
                });
            } 
            else{
                await api
                .post("/clients/create", formData)
                .then((response) => {
                    navigate('/clientes/listar');
                })
                .catch((err) => {
                    notifyWarn(err.response.data.error);
                });
            }
        }        
    }

    return(
        <>
            <Menu />
            <ToastContainer /> 
            <Container>
                <h2>Cadastro de clientes</h2>
                <hr />
                <Form onSubmit={handleForm} className="panel">
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">CPF/CNPJ</Form.Label>
                        <Col sm="4">
                            <Form.Control 
                                type="text" 
                                placeholder="CPF/CNPJ" 
                                name="cpf_cnpj" 
                                value={formData["cpf_cnpj"]}
                                onChange={handleInputChange} />
                        </Col>  
                        <Form.Label column sm="2">Nome</Form.Label>
                        <Col sm="4">
                            <Form.Control 
                                type="text" 
                                placeholder="Nome" 
                                name="name" 
                                value={formData["name"]}
                                onChange={handleInputChange} />
                        </Col>                      
                    </Form.Group>                    

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">Telefone</Form.Label>
                        <Col sm="4">
                            <Form.Control 
                                type="text" 
                                placeholder="Telefone" 
                                name="phone" 
                                value={formData["phone"]}
                                onChange={handleInputChange}
                                />
                        </Col>
                        <Form.Label column sm="2">E-mail</Form.Label>
                        <Col sm="4">
                            <Form.Control 
                                type="text" 
                                placeholder="E-mail" 
                                name="email" 
                                value={formData["email"]}
                                onChange={handleInputChange}
                                />
                        </Col>
                    </Form.Group>

                    <ButtonToolbar>
                        <ButtonGroup className="me-2">
                            <Button variant="danger" onClick={() => navigate(-1)}>Voltar</Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button type="submit" variant="primary">Salvar</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                    
                </Form>
            </Container>
        </>
    );
}

export default FormClients;