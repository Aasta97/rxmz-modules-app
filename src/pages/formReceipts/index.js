import React, { useState, useEffect } from 'react';
import { useNavigate, useParams  } from "react-router-dom";
import { FaFilePdf } from 'react-icons/fa';
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

import receiptsPDF from '../../Reports/Receipts/receipts';
import checklistPDF from '../../Reports/Receipts/checklist';

const FormReceipts = (props) => {
    const [formData, setFormData] = useState({ 
        code: "",
        name: "", 
        description: "", 
        value: "",
        valueProduct: "", 
        qtd: "",
        date: "", 
        client: "",
        phone: "",
        address: ""
    });
    
    const { id } = useParams();
    const navigate = useNavigate();   
    const notifyWarn = (message) => toast.warn(message);

    useEffect(()=>{
        if(id !== undefined){
            getReceiptById(id);
        }        
    }, []);

    function handleInputChange(event) {
        let { name, value } = event.target;
        if(name === "value"){
            value = formatReal(value);
        }

        if(name === "qtd" && value < 0){
            value = 0;
        }

        if(name === "phone"){            
            value = formatPhone(value);
        }

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
        if(formData.description === ""){ 
            notifyWarn("A descrição não pode ser vázio"); 
            validForm = false;
        }
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

    async function getReceiptById(id){
        await api
        .get(`/receipts/${id}`)
        .then((response) => {
            const { 
                code,
                name, 
                description, 
                value,
                valueProduct, 
                qtd,
                date, 
                client,
                phone,
                address
              } = response.data.receipt;

            setFormData({ 
            code,
            name, 
            description, 
            value,
            valueProduct, 
            qtd,
            date, 
            client,
            phone,
            address
            });
            //navigate('/usuarios/listar');
        })
        .catch((err) => {
            notifyWarn(err.response.data.error);
        });      
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
                await api.put(`/receipts/change/${id}`, formData)
                .then((response) => {
                    navigate('/recibos/listar');
                })
                .catch((err) => {
                    notifyWarn(err.response.data.error);
                });
            } 
            else{
                await api
                .post("/receipts/create", formData)
                .then((response) => {
                    navigate('/recibos/listar');
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
                <h2>Cadastro de recibos</h2>
                <hr />
                {
                    id !== undefined && (
                        <>
                            <Button type="submit" variant="danger" className="button" onClick={(e) => {receiptsPDF(formData)}} ><FaFilePdf /> Gerar PDF</Button>
                            <Button type="submit" variant="primary" onClick={(e) => {checklistPDF(formData)}} ><FaFilePdf /> Gerar checklist</Button> 
                        </>
                    )
                }
                               
                <br /><br />
                <Form onSubmit={handleForm} className="panel">
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">Cliente</Form.Label>
                        <Col sm="4">
                            <Form.Control 
                                type="text" 
                                name="client" 
                                value={formData["client"]}
                                onChange={handleInputChange} />
                        </Col>
                        <Form.Label column sm="2">Telefone</Form.Label>
                        <Col sm="4">
                            <Form.Control 
                                type="text" 
                                name="phone" 
                                value={formData["phone"]}
                                onChange={handleInputChange} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">Endereço</Form.Label>
                        <Col sm="10">
                            <Form.Control 
                                type="text" 
                                name="address" 
                                value={formData["address"]}
                                onChange={handleInputChange} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">identificação do recibo</Form.Label>
                        <Col sm="10">
                            <Form.Control 
                                type="text" 
                                name="name" 
                                value={formData["name"]}
                                onChange={handleInputChange} />
                        </Col>                        
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">Descrição</Form.Label>
                        <Col sm="10">
                            <Form.Control 
                                as="textarea"
                                name="description" 
                                value={formData["description"]}
                                onChange={handleInputChange} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">Valor</Form.Label>
                        <Col sm="3">
                            <Form.Control 
                                type="text" 
                                name="value" 
                                value={formData["value"]}
                                onChange={handleInputChange}
                                />
                        </Col>
                        <Form.Label column sm="1">Quantidade</Form.Label>
                        <Col sm="2">
                            <Form.Control 
                                type="number" 
                                name="qtd" 
                                value={formData["qtd"]}
                                onChange={handleInputChange}
                                />
                        </Col>  
                        <Form.Label column sm="1">Data</Form.Label>
                        <Col sm="3">
                            <Form.Control 
                                type="date" 
                                name="date" 
                                value={formData["date"]}
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

export default FormReceipts;