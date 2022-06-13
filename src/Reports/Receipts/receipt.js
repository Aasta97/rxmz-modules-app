import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';

function formatStringData(data) {
  var dia  = data.split("-")[2];
  var mes  = data.split("-")[1];
  var ano  = data.split("-")[0];

  return ("0"+dia).slice(-2) + '/' + ("0"+mes).slice(-2) + '/' + ano;
}

const MyDocument = ({ data, products, company }) => (  
    <Document>
        <Page style={{margin: 20}}>
          <View style={{
                display: "flex", 
                flexDirection: "row", 
                width:'90%',
                height:'80px',
                padding:'5px 30px',
                margin: '3px 15px',
                border: '2px solid #333',
                borderRadius: '5px'}}>
                <View>
                  <Text style={{fontSize: '16px'}}>{company === '92d7b77a-9b19-4c16-8281-eaeaf47684f9' ? 'INOVAÇÃO ESQUADRIAS':'PAULISTA'} <Text style={{fontSize: '10px'}}>Portões Automáticos e Esquadrias</Text></Text>
                  <Text style={{fontSize: '10px'}}>Esquadrias de Madeira, Chapa e Alumínio</Text>
                  <Text style={{fontSize: '10px'}}>Aceitamos cartão</Text>
                  <Text style={{fontSize: '10px'}}>{company === '92d7b77a-9b19-4c16-8281-eaeaf47684f9' ? 'Telefone: (11) 2011-6716 / 98357-5011':'Telefone: (11) 2727-2193 / 95357-7993'}</Text>
                  <Text style={{fontSize: '10px'}}>{company === '92d7b77a-9b19-4c16-8281-eaeaf47684f9' ? 'Av. Mateo Bei, 234 - jd. Tietê - São Paulo - SP':'Av. Rio das Pedras, 1013 - jd. Aricanduva - São Paulo - SP'}</Text>
                </View>     
            </View>
            <View style={{
                display: "flex", 
                flexDirection: "row", 
                width:'90%',
                height:'70px',
                padding:'20px 30px',
                margin: '3px 15px',
                border: '2px solid #333',
                borderRadius: '5px'}}>
                <View>
                  <Text style={{fontSize: 10}}>Data: {formatStringData(data.date)}</Text>
                  <Text style={{fontSize: 10}}>Nome: {data.client}</Text>
                  <Text style={{fontSize: 10}}>Endereço: {data.address}</Text>
                </View>
                <View>
                  <Text style={{marginLeft: '90px',color: 'red', fontSize: 16}}>{data.code.toString().padStart(4, "0")}</Text>
                  <Text style={{marginLeft: '90px',fontSize: 10}}>{data.phone}</Text>
                  <Text style={{fontSize: 10}}></Text>
                </View>        
            </View>
            <View style={{
                display: "flex", 
                flexDirection: "row", 
                width:'90%',
                height:'auto',
                minHeight: '15%',
                margin: '3px 15px',                
                border: '2px solid #333',
                borderRadius: '5px'}}>
                <View style={{width: '10%'}}>
                  <Text style={{flex: 1, border: '1px solid #333', padding: '2px 5px', backgroundColor: '#f9f9f9'}}>Qtd.</Text>
                  {products.map((product) => (
                    <Text key={product.name} style={{flex: 1, border: '1px solid #333', padding: '2px 5px'}}>{product.qtd}</Text>
                  ))}
                  
                </View>
                <View style={{width: '70%'}}>
                  <Text style={{flex: 1, border: '1px solid #333', padding: '2px 5px', backgroundColor: '#f9f9f9'}}>Produto</Text>
                  {products.map((product) => (
                    <Text key={product.name} style={{flex: 1, border: '1px solid #333', padding: '2px 5px', fontSize: '10px'}}>{product.name}</Text>
                  ))}
                </View> 
                <View style={{width: '20%'}}>
                  <Text style={{flex: 1, border: '1px solid #333', padding: '2px 5px', backgroundColor: '#f9f9f9', fontSize: '10px'}}>Valor Unit.</Text>
                  {products.map((product) => (
                    <Text key={product.name} style={{flex: 1, border: '1px solid #333', padding: '2px 5px', fontSize: '10px' }}>R$ {(parseFloat(product.value.replace(',', '.'))/product.qtd).toFixed(2).toString().replace('.', ',')}</Text>
                  ))}
                </View>   
                <View style={{width: '20%'}}>
                  <Text style={{flex: 1, border: '1px solid #333', padding: '2px 5px', backgroundColor: '#f9f9f9', fontSize: '10px'}}>Valor</Text>
                  {products.map((product) => (
                    <Text key={product.name} style={{flex: 1, border: '1px solid #333', padding: '2px 5px', fontSize: '10px' }}>R$ {product.value}</Text>
                  ))}
                </View>      
            </View>
            <View style={{
                display: "flex", 
                flexDirection: "row", 
                justifyContent: "space-between",
                alignItems: "right",
                width:'90%',
                height:'auto',
                minHeight: '15%',
                margin: '0 15px 0 15px',                  
                borderRadius: '5px'}}>
                <View style={{width: '10px'}}></View>  
            	  <View style={{width: '190px', textAlign: "right"}}>
                  <Text style={{ flex: 1 }}>Valor Total: <Text style={{fontSize: '16px'}}>{data.value}</Text></Text>
                </View> 
            </View>
            <View style={{
                  display: "flex", 
                  flexDirection: "row", 
                  justifyContent: "space-between",
                  alignItems: "right",
                  width:'90%',
                  height:'auto',
                  minHeight: '15%',
                  margin: '0 15px 0 15px',                  
                  borderRadius: '5px'}}>
                  <View style={{width: '170px', textAlign: "right", borderBottom: "1px solid black"}}></View>
              	  <View style={{width: '170px', textAlign: "right", borderBottom: "1px solid black"}}></View> 
            </View>
            <View style={{
              display: "flex", 
              flexDirection: "row", 
              justifyContent: "space-between",
              alignItems: "right",
              width:'90%',
              height:'auto',
              minHeight: '5%',
              margin: '0 15px 0 15px',                  
              borderRadius: '5px'}}>
              <View style={{width: '170px', textAlign: "center" }}>
                  <Text>Empresa</Text>	  
              </View>
              <View style={{width: '170px', textAlign: "center" }}>
                  <Text>Cliente</Text>	  
              </View> 
            </View>
        </Page>
    </Document>
);

export default MyDocument;