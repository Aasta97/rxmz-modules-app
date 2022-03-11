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

const FormUsers = (props) => {
    const [formData, setFormData] = useState({ 
        key_company: localStorage.getItem('key_company'),
        name: "", 
        username: "", 
        password: "", 
        confirmPassword: "", 
        status: ""});
    
    const { id } = useParams();
    const navigate = useNavigate();   
    const notifyWarn = (message) => toast.warn(message);

    useEffect(()=>{
        if(id !== undefined){
            getUserById(id);
        }        
    }, []);

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
        if(formData.username === ""){ 
            notifyWarn("O usuário não pode ser vázio"); 
            validForm = false;
        }
        if(formData.password === ""){ 
            notifyWarn("A senha não pode ser vázio"); 
            validForm = false;
        }
        if(formData.status === ""){ 
            notifyWarn("O status não pode ser vázio"); 
            validForm = false;
        }
        if(formData.password !== formData.confirmPassword){ 
            notifyWarn("As senhas precisam ser iguais"); 
            validForm = false;
        }
        
        return validForm;
    }

    async function getUserById(id){
        await api
        .post(`/users/${id}`, {key_company: localStorage.getItem("key_company")})
        .then((response) => {
            const { name, username, status } = response.data.user;
            setFormData({
                name, 
                username, 
                password: "", 
                confirmPassword: "", 
                status
            });
            //navigate('/usuarios/listar');
        })
        .catch((err) => {
            notifyWarn(err.response.data.error);
        });      
    }

    async function handleForm(event){
        event.preventDefault();
        if(validateFields()){
            if(id !== undefined){
                await api.put(`/users/change/${id}`, formData)
                .then((response) => {
                    navigate('/usuarios/listar');
                })
                .catch((err) => {
                    notifyWarn(err.response.data.error);
                });
            } 
            else{
                await api
                .post("/users/create", formData)
                .then((response) => {
                    navigate('/usuarios/listar');
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
                <h2>Cadastro de usuários</h2>
                <hr />
                <Form onSubmit={handleForm} className="panel">
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">Nome</Form.Label>
                        <Col sm="4">
                            <Form.Control 
                                type="text" 
                                placeholder="Nome" 
                                name="name" 
                                value={formData["name"]}
                                onChange={handleInputChange} />
                        </Col>
                        <Form.Label column sm="2">Status</Form.Label>
                        <Col sm="4">
                        <Form.Select name="status" onChange={handleInputChange}>
                            <option>Selecione uma opção</option>
                            <option value={formData["status"] || "Ativo"} selected={formData["status"] === "Ativo" && true}>Ativo</option>
                            <option value={formData["status"] || "Inativo"} selected={formData["status"] === "Inativo" && true}>Inativo</option>
                        </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">Usuário</Form.Label>
                        <Col sm="10">
                            <Form.Control 
                                type="text" 
                                placeholder="Usuário" 
                                name="username" 
                                value={formData["username"]}
                                onChange={handleInputChange}
                                />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">Senha</Form.Label>
                        <Col sm="4">
                            <Form.Control 
                                type="password" 
                                placeholder="Senha" 
                                name="password" 
                                onChange={handleInputChange}
                                />
                        </Col>
                        <Form.Label column sm="2">Confirme a senha</Form.Label>
                        <Col sm="4">
                            <Form.Control 
                                type="password" 
                                placeholder="Confirme a senha"
                                name="confirmPassword" 
                                onChange={handleInputChange} />
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

export default FormUsers;