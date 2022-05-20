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


const FormProducts = (props) => {
    const [formData, setFormData] = useState({ 
        key_company: localStorage.getItem('key_company'),
        code: "",
        name: "",
        value: "",
        qtd: ""
    });
    
    const { id } = useParams();
    const navigate = useNavigate();   
    const notifyWarn = (message) => toast.warn(message);

    useEffect(()=>{
        if(id !== undefined){
            const getProductById = async (id) => {
                await api
                .post(`/products/find/${id}`, {key_company: localStorage.getItem("key_company")})
                .then((response) => {
                    const { 
                        code,
                        name,
                        value,
                        qtd
                    } = response.data.product;
                    
                    setFormData({ 
                        code, 
                        name,
                        value,
                        qtd
                    });
        
                    //navigate('/usuarios/listar');
                })
                .catch((err) => {
                    notifyWarn(err.response.data.error);
                });      
            }

            getProductById(id);
        }        
    }, [id]);

    function handleInputChange(event) {
        let { name, value } = event.target;        

        if(name === "phone"){            
            value = formatPhone(value);
        }

        if(name === "value"){
            value = formatReal(value);
        }        

        setFormData({
          ...formData,
          [name]: value,
        });
    }

    function validateFields(){
        let validForm = true;
        if(formData.value === ""){ 
            notifyWarn("O valor não pode ser vázio"); 
            validForm = false;
        }
        if(formData.date === ""){ 
            notifyWarn("A data não pode ser vázio"); 
            validForm = false;
        }
        if(formData.client === ""){ 
            notifyWarn("O cliente precisa ser informado"); 
            validForm = false;
        }
        
        return validForm;
    }    

    function formatReal(valor) {        
        valor = valor + '';
        valor = parseInt(valor.replace(/[\D]+/g,''));
        valor = valor + '';
        valor = valor.replace(/([0-9]{2})$/g, ",$1");
      
        if (valor.length > 6) {
          valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }
      
        return valor;
      }
    
    function formatPhone(value){
        return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d{4})(\d)/, "$1-$2");
    }

    async function handleForm(event){
        event.preventDefault();

        if(validateFields()){
            if(id !== undefined){
                await api.put(`/products/change/${id}`, formData)
                .then((response) => {
                    navigate('/produtos/listar');
                })
                .catch((err) => {
                    notifyWarn(err.response.data.error);
                });
            } 
            else{
                await api
                .post("/products/create", formData)
                .then((response) => {
                    navigate('/produtos/listar');
                })
                .catch((err) => {
                    notifyWarn(err.response.data.error);
                });
            }
        }        
    }

    return(        
        <>
            <style type="text/css">
            {`
                .button{
                    margin-right: 5px;
                }
            `}
            </style>
            <Menu />
            <ToastContainer />             
            <Container>
                <h2>Cadastro de produtos</h2>                               
                <br /><br />
                <Form onSubmit={handleForm} className="panel">
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">Nome do produto</Form.Label>
                        <Col sm="10">
                            <Form.Control 
                                type="text" 
                                name="name" 
                                value={formData["name"]}
                                onChange={handleInputChange} />
                        </Col>                        
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Quantidade</Form.Label>
                        <Col sm="4">
                            <Form.Control 
                                type="text" 
                                name="qtd" 
                                value={formData["qtd"]}
                                onChange={handleInputChange} />
                        </Col>
                        <Form.Label column sm="2">Valor</Form.Label>
                        <Col sm="4">
                            <Form.Control 
                                type="text" 
                                name="value" 
                                value={formData["value"]}
                                onChange={handleInputChange} />
                        </Col>
                    </Form.Group>                    
                   
                    <br />                                     

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

export default FormProducts;