import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import { Container, Table, ButtonToolbar, ButtonGroup, Button, Form, Col, Row, InputGroup, FormControl } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Menu from '../../components/Menu';
import api from "../../services/api";

const ListUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchBy, setSearchBy] = useState("");
    
    const notifySucess = (message) => toast.success(message);
    const notifyWarn = (message) => toast.warn(message);

    const navigate = useNavigate();

    useEffect( () =>{
        getUsers();
    }, []);

    async function handleDeleteUser(id){
        await api
        .delete(`/users/delete/${id}`)
        .then((response) => {         
            notifySucess("Usuário removido!");
            getUsers();
        })
        .catch((err) => {
            notifyWarn(err.response.data.error);
        });
    }

    async function getUsers(){
        await api
        .get("/users/list")
        .then((response) => {         
            setUsers(response.data.users);
        })
        .catch((err) => {
            notifyWarn(err.response.data.error);
        });
    }

    async function handleSearchData(){
        await api
        .get(`/users/search/${searchBy}`)
        .then((response) => {    
            setUsers(response.data.users);
        })
        .catch((err) => {
            notifyWarn("Usuário não encontrado!");
        });
    }

    return(
        <>
            <style type="text/css">
            {`
                .delete {
                    color: red;
                }
                .delete:hover {
                    opacity: .7;
                    color: red;
                }
                .btn-group{
                    display:flex;
                    justify-content: center;
                    align-items: center;
                }
            `}
            </style>
            <Menu />
            <ToastContainer /> 
            <Container>
                <h1>
                    Lista de usuários
                </h1>
                <Form.Group as={Row} className="mb-1">
                    <Col sm="4">
                        <Col sm="6">
                            <Button variant="primary" onClick={() => navigate('/usuarios/criar')}><FaPlus /> Novo usuário</Button> 
                        </Col>
                    </Col>
                    <Col sm="8">
                        <InputGroup className="mb-1">
                            <FormControl
                                placeholder="Pesquisar por nome"
                                name="searchBy"
                                onChange={(e)=>setSearchBy(e.target.value)}
                            />
                            <Button variant="primary" id="button-addon2" onClick={handleSearchData}>
                                <FaSearch  /> Pesquisar
                            </Button>
                        </InputGroup>                       
                    </Col>                    
                </Form.Group>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Usuário</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user)=>{
                            if(user !== null){
                                return(                                 
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>
                                        <ButtonToolbar className="btn-group">
                                            <ButtonGroup className="me-2">
                                                <Button variant="link" onClick={() => navigate(`/usuarios/editar/${user._id}`)}><FaEdit /></Button>
                                            </ButtonGroup>
                                            <ButtonGroup>
                                                <Button variant="link" className="delete" onClick={(e) => handleDeleteUser(user._id)}><FaTrash /></Button>
                                            </ButtonGroup>
                                        </ButtonToolbar>
                                        </td>
                                    </tr>
                                );
                            } 
                        })}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default ListUsers;