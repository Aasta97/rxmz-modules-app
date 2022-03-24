import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';

function formatStringData(data) {
  var dia  = data.split("-")[2];
  var mes  = data.split("-")[1];
  var ano  = data.split("-")[0];

  return ("0"+dia).slice(-2) + '/' + ("0"+mes).slice(-2) + '/' + ano;
}

const MyDocument = ({ data, products }) => (  
    <Document>
        <Page style={{margin: 20}}>
          <View style={{
                display: "flex", 
                flexDirection: "row", 
                width:'90%',
                height:'150px',
                padding:'5px 30px',
                margin: '3px 15px',
                border: '2px solid #333',
                borderRadius: '5px'}}>
                <View>
                  <Text style={{margin: 8, fontSize: '25px'}}>PAULISTA <Text style={{fontSize: '18px'}}>Portões Automáticos e Esquadrias</Text></Text>
                  <Text style={{margin: 8, fontSize: '18px'}}>Esquadrias de Mdeira, Chapa e Alumínio</Text>
                  <Text style={{margin: 8, fontSize: '18px'}}>Aceitamos cartão</Text>
                  <Text style={{margin: 8, fontSize: '18px'}}>Telefone: (11) 2727-2193 / 95357-7993</Text>
                  <Text style={{margin: 8, fontSize: '18px'}}>Av. Rio das Pedras, 1013 - jd. Aricanduva - São Paulo - SP</Text>
                </View>     
            </View>
            <View style={{
                display: "flex", 
                flexDirection: "row", 
                width:'90%',
                height:'120px',
                padding:'20px 30px',
                margin: '3px 15px',
                border: '2px solid #333',
                borderRadius: '5px'}}>
                <View style={{flex: 1}}>
                  <Text style={{flex: 1}}>Data: {formatStringData(data.date)}</Text>
                  <Text style={{flex: 1}}>Nome: {data.client}</Text>
                  <Text style={{flex: 1}}>Endereço: {data.address}</Text>
                </View>
                <View>
                  <Text style={{flex: 1, color: 'red', fontSize: 23}}>{data.code.toString().padStart(4, "0")}</Text>
                  <Text style={{flex: 1}}>{data.phone}</Text>
                  <Text style={{flex: 1}}></Text>
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
                  <Text style={{flex: 1, border: '1px solid #333', padding: '5px 10px', backgroundColor: '#f9f9f9'}}>Qtd.</Text>
                  {products.map((product) => (
                    <Text key={product.name} style={{flex: 1, border: '1px solid #333', padding: '5px 10px'}}>{product.qtd}</Text>
                  ))}
                  
                </View>
                <View style={{width: '70%'}}>
                  <Text style={{flex: 1, border: '1px solid #333', padding: '5px 10px', backgroundColor: '#f9f9f9'}}>Produto</Text>
                  {products.map((product) => (
                    <Text key={product.name} style={{flex: 1, border: '1px solid #333', padding: '5px 10px'}}>{product.name}</Text>
                  ))}
                </View> 
                <View style={{width: '20%'}}>
                  <Text style={{flex: 1, border: '1px solid #333', padding: '5px 10px', backgroundColor: '#f9f9f9', fontSize: '14px'}}>Valor Unit.</Text>
                  {products.map((product) => (
                    <Text key={product.name} style={{flex: 1, border: '1px solid #333', padding: '5px 10px', fontSize: '14px' }}>R$ {(parseFloat(product.value.replace(',', '.'))/product.qtd).toFixed(2).toString().replace('.', ',')}</Text>
                  ))}
                </View>   
                <View style={{width: '20%'}}>
                  <Text style={{flex: 1, border: '1px solid #333', padding: '5px 10px', backgroundColor: '#f9f9f9', fontSize: '14px'}}>Valor</Text>
                  {products.map((product) => (
                    <Text key={product.name} style={{flex: 1, border: '1px solid #333', padding: '5px 10px', fontSize: '14px' }}>R$ {product.value}</Text>
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
                  <Text style={{ flex: 1 }}>Valor Total: <Text style={{fontSize: '22px'}}>{data.value}</Text></Text>
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