import React, { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useNavigate, useParams  } from "react-router-dom";
import { FaTrash, FaPlus } from 'react-icons/fa';
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

import {Suggestion} from './styles';

import Menu from '../../components/Menu';
import api from "../../services/api";

import MyDocument from '../../Reports/Receipts/receipt';
import MyChecklist from '../../Reports/Receipts/checklist';

const FormReceipts = (props) => {
    const [formData, setFormData] = useState({ 
        key_company: localStorage.getItem('key_company'),
        code: "",
        value: "",
        valueProduct: "", 
        qtd: "",
        date: "", 
        client: "",
        phone: "",
        address: "",
        products: []
    });
    const [clients, setClients] = useState([]);
    const [clientsSuggestions, setClientsSuggestions] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(0);
    const [loadedProducts, setLoadedProducts] = useState([]);
    const [productsSuggestions, setProductsSuggestions] = useState([]);
    const [products, setProducts] = useState([
        { name:"", value: "", qtd: ""}
    ]);
    
    const { id } = useParams();
    const navigate = useNavigate();   
    const notifyWarn = (message) => toast.warn(message);

    useEffect(()=>{
        if(id !== undefined){
            const getReceiptById = async (id) => {
                await api
                .post(`/receipts/find/${id}`, {key_company: localStorage.getItem("key_company")})
                .then((response) => {
                    const { 
                        code,
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
                        value,
                        valueProduct, 
                        qtd,
                        date, 
                        client,
                        phone,
                        address
                    });
        
                    setProducts(response.data.receipt.products);
                    //navigate('/usuarios/listar');
                })
                .catch((err) => {
                    notifyWarn(err.response.data.error);
                });      
            }

            getReceiptById(id);
        }        
    }, [id]);

    useEffect(()=>{        
        const loadClients = async () => {
            await api
            .post("/clients/list", {key_company: localStorage.getItem("key_company")})
            .then((response) => {         
                setClients(response.data.clients);
            })
            .catch((err) => {
                notifyWarn(err.response.data.error);
            });
        }
    
        loadClients();  

        const loadProducts = async () => {
            await api
            .post("/products/list", {key_company: localStorage.getItem("key_company")})
            .then((response) => {         
                setLoadedProducts(response.data.products);
            })
            .catch((err) => {
                notifyWarn(err.response.data.error);
            });
        }

        loadProducts();

    }, []);

    function handleInputChange(event) {
        let { name, value } = event.target;        
        
        if(name === "client"){ 
            let matches = [];  
            if(value.length > 0){
                matches = clients.filter(client=>{
                    const regex = new RegExp(`${value}`, "gi");
                    return client.name.match(regex);
                })
            } 
            setClientsSuggestions(matches.slice(0,5));        
        }        

        if(name === "phone"){            
            value = formatPhone(value);
        }

        setFormData({
          ...formData,
          [name]: value,
        });
    }

    function handleSuggestion(e){
        formData["client"] = e.name;
        setClientsSuggestions([]);
    }

    function handleProductSuggestion(suggestion, index){
        
        let selectedProduct = {
            'name': suggestion.name,
            'value': suggestion.value,
            'qtd': suggestion.qtd,
        };
        
        products[index] = selectedProduct;
        setProducts(products);        
        setProductsSuggestions([]);
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

        formData['products'] = products;
        formData['value']    = formatReal(products.reduce((total, currentValue) => total = total + parseFloat(currentValue.value.replace('.', '').replace(',', '.')),0).toFixed(2));

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

    function handleProductAdd(){
        setProducts([...products, { name:"", value: "", qtd: ""}]);
    }

    function handleProductRemove(index){
        const list = [...products];
        list.splice(index, 1);
        setProducts(list);
    }

    function handleProductChange(event, index){
        let {name, value} = event.target;

        setCurrentProduct(index);

        if(name === "value"){
            value = formatReal(value);
        }

        if(name === "name"){ 
            let matches = [];  
            if(value.length > 0){
                matches = loadedProducts.filter(product=>{
                    const regex = new RegExp(`${value}`, "gi");
                    return product.name.match(regex);
                })
            } 
            setProductsSuggestions(matches.slice(0,5));     
        }  

        /*if(name === "qtd" && value < 0){
            value = 0;
        }

        let list = [...products];
        list[index][name] = value;

        
        setProducts(list);
        
        setFormData({
            ...formData,
            value: value,
        });*/
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
                            <PDFDownloadLink document={<MyDocument products={products} data={formData}/>} fileName={`recibo_${formData["code"].toString().padStart(4, "0")}.pdf`}>
                                <FaFilePdf /> Gerar PDF
                            </PDFDownloadLink>   
                            <PDFDownloadLink style={{ marginLeft: '20px', color: 'red' }} document={<MyChecklist products={products} data={formData}/>} fileName={`checklist_${formData["code"].toString().padStart(4, "0")}.pdf`}>
                                <FaFilePdf /> Gerar Checklist
                            </PDFDownloadLink>                           
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
                                onChange={handleInputChange} 
                                autoComplete="off" autoCorrect="off" />
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
                        <Form.Label column sm="2"></Form.Label>
                        <Col sm="4" style={{marginTop:'-16px', borderRadius: '5px'}}>
                            {clientsSuggestions && clientsSuggestions.map((sug, i) => 
                                <Suggestion key={sug.name} onClick={()=>handleSuggestion(sug)}>{sug.name}</Suggestion>
                            )}
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

                    {products.map((product, index) => (                        
                            <div key={index}>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="2">Produto</Form.Label>
                                    <Col sm="4">
                                        <Form.Control 
                                            type="text" 
                                            name="name" 
                                            value={product.name}
                                            onChange={(e) => handleProductChange(e, index)} 
                                            autoComplete="off" autoCorrect="off" />
                                    </Col> 
                                    <Form.Label column sm="1">Valor</Form.Label>
                                    <Col sm="2">
                                        <Form.Control 
                                        type="text" 
                                        name="value" 
                                        value={product.value}
                                        onChange={(e) => handleProductChange(e, index)}
                                        />
                                    </Col>
                                    <Form.Label column sm="1">Quantidade</Form.Label>
                                    <Col sm="1">
                                        <Form.Control 
                                            type="number" 
                                            name="qtd" 
                                            value={product.qtd}
                                            onChange={(e) => handleProductChange(e, index)}
                                            />
                                    </Col>
                                    <Col sm="1">
                                        <Button variant="outline-danger" style={{width: "100%" }} onClick={() => handleProductRemove(index)} ><FaTrash /></Button> 
                                    </Col>   
                                </Form.Group> 
                                
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="2"></Form.Label>
                                    <Col sm="4" style={{marginTop:'-16px', borderRadius: '5px'}}>
                                        {productsSuggestions && productsSuggestions.map( sug => (
                                                index === currentProduct && <Suggestion key={sug.name} onClick={()=>handleProductSuggestion(sug, currentProduct)}>{sug.name}</Suggestion>
                                            )                                            
                                        )}
                                    </Col>
                                </Form.Group>
                            </div>
                    ))} 
                    <Form.Group as={Row} className="mb-3">                                
                        <Form.Label column sm="2"></Form.Label>
                        <Col sm="10">
                            <Button variant="outline-primary" onClick={handleProductAdd}><FaPlus /></Button> 
                        </Col>  
                    </Form.Group>  
                    <br />                   

                    <Form.Group as={Row} className="mb-3">                       
                        <Form.Label column sm="2">Data do pedido</Form.Label>
                        <Col sm="4">
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