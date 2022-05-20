import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import { Container, Table, ButtonToolbar, ButtonGroup, Button, Form, Col, Row, InputGroup, FormControl } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Menu from '../../components/Menu';
import api from "../../services/api";

const ListProducts = () => {
    const [products, setProducts] = useState([]);
    const [searchBy, setSearchBy] = useState(1);
    
    const notifySucess = (message) => toast.success(message);
    const notifyWarn = (message) => toast.warn(message);

    const navigate = useNavigate();

    useEffect( () =>{
        const loadProducts = async () => {
            await api
            .post("/products/list", {key_company: localStorage.getItem("key_company")})
            .then((response) => {         
                setProducts(response.data.products);
            })
            .catch((err) => {
                notifyWarn(err.response.data.error);
            });
        }

        loadProducts();
    }, []);

    const getProducts = async () => {
        await api
        .post("/products/list", {key_company: localStorage.getItem("key_company")})
        .then((response) => {         
            setProducts(response.data.products);
        })
        .catch((err) => {
            notifyWarn(err.response.data.error);
        });
    }

    async function handleDeleteProduct(id){
        await api
        .delete(`/products/delete/${id}`)
        .then((response) => {         
            notifySucess("Produto removido!");
            getProducts();
        })
        .catch((err) => {
            notifyWarn(err.response.data.error);
        });
    }

    

    async function handleSearchData(){
        await api
        .post(`/products/search/${searchBy}`, {key_company: localStorage.getItem("key_company")})
        .then((response) => {
            setProducts(response.data.product);
        })
        .catch((err) => {
            notifyWarn("Produto não encontrado!");
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
                    Lista de produtos
                </h1>
                <Form.Group as={Row} className="mb-1">
                    <Col sm="4">
                        <Col sm="6">
                            <Button variant="primary" onClick={() => navigate('/produtos/criar')}><FaPlus /> Novo produto</Button> 
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
                            <th>Produto</th>
                            <th>QTD.</th>
                            <th>Valor</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product)=>(
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.qtd}</td>
                                <td>{product.value}</td>    
                                <td>
                                <ButtonToolbar className="btn-group">
                                    <ButtonGroup className="me-2">
                                        <Button variant="link" onClick={() => navigate(`/produtos/editar/${product._id}`)}><FaEdit /></Button>
                                    </ButtonGroup>
                                    <ButtonGroup>
                                        <Button variant="link" className="delete" onClick={(e) => handleDeleteProduct(product._id)}><FaTrash /></Button>
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

export default ListProducts;