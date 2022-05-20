import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import { Container, Table, ButtonToolbar, ButtonGroup, Button, Form, Col, Row, InputGroup, FormControl } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Menu from '../../components/Menu';
import api from "../../services/api";

const ListReceipts = () => {
    const [receipts, setReceipts] = useState([]);
    const [searchBy, setSearchBy] = useState(1);
    
    const notifySucess = (message) => toast.success(message);
    const notifyWarn = (message) => toast.warn(message);

    const navigate = useNavigate();

    useEffect( () =>{
        const loadReceipts = async () => {
            await api
            .post("/receipts/list", {key_company: localStorage.getItem("key_company")})
            .then((response) => {         
                setReceipts(response.data.receipts);
            })
            .catch((err) => {
                notifyWarn(err.response.data.error);
            });
        }

        loadReceipts();
    }, []);

    const getReceipts = async () => {
        await api
        .post("/receipts/list", {key_company: localStorage.getItem("key_company")})
        .then((response) => {         
            setReceipts(response.data.receipts);
        })
        .catch((err) => {
            notifyWarn(err.response.data.error);
        });
    }

    async function handleDeleteReceipt(id){
        await api
        .delete(`/receipts/delete/${id}`)
        .then((response) => {         
            notifySucess("Recibo removido!");
            getReceipts();
        })
        .catch((err) => {
            notifyWarn(err.response.data.error);
        });
    }

    async function handleSearchData(){
        await api
        .post(`/receipts/search/${searchBy}`, {key_company: localStorage.getItem("key_company")})
        .then((response) => {
            setReceipts(response.data.receipt);
        })
        .catch((err) => {
            notifyWarn("Recibo não encontrado!");
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
                    Lista de recibos
                </h1>
                <Form.Group as={Row} className="mb-1">
                    <Col sm="4">
                        <Col sm="6">
                            <Button variant="primary" onClick={() => navigate('/recibos/criar')}><FaPlus /> Novo recibo</Button> 
                        </Col>
                    </Col>
                    <Col sm="8">
                        <InputGroup className="mb-1">
                            <FormControl
                                placeholder="Pesquisar por código"
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
                            <th>Código</th>
                            <th>Cliente</th>
                            <th>Produtos</th>
                            <th>Data</th>
                            <th>Valor</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {receipts.map((receipt)=>(
                            <tr key={receipt._id}>
                            <td>{receipt.code}</td>
                            <td>{receipt.client}</td>
                            <td>{receipt.products.map(x => x.name).join(', ')}</td>
                            <td>{receipt.date}</td>
                            <td>{receipt.value}</td>
                            <td>
                            <ButtonToolbar className="btn-group">
                                <ButtonGroup className="me-2">
                                    <Button variant="link" onClick={() => navigate(`/recibos/editar/${receipt._id}`)}><FaEdit /></Button>
                                </ButtonGroup>
                                <ButtonGroup>
                                    <Button variant="link" className="delete" onClick={(e) => handleDeleteReceipt(receipt._id)}><FaTrash /></Button>
                                </ButtonGroup>
                            </ButtonToolbar>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default ListReceipts;