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
                height:'80px',
                padding:'5px 30px',
                margin: '3px 15px',
                border: '2px solid #333',
                borderRadius: '5px'}}>
                <View>
                  <Text style={{fontSize: '16px'}}>PAULISTA <Text style={{fontSize: '10px'}}>Portões Automáticos e Esquadrias</Text></Text>
                  <Text style={{fontSize: '10px'}}>Esquadrias de Mdeira, Chapa e Alumínio</Text>
                  <Text style={{fontSize: '10px'}}>Aceitamos cartão</Text>
                  <Text style={{fontSize: '10px'}}>Telefone: (11) 2727-2193 / 95357-7993</Text>
                  <Text style={{fontSize: '10px'}}>Av. Rio das Pedras, 1013 - jd. Aricanduva - São Paulo - SP</Text>
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
                <View style={{width: '90%'}}>
                  <Text style={{flex: 1, border: '1px solid #333', padding: '2px 5px', backgroundColor: '#f9f9f9'}}>Produto</Text>
                  {products.map((product) => (
                    <Text key={product.name} style={{flex: 1, border: '1px solid #333', padding: '2px 5px', fontSize: '10px'}}>{product.name}</Text>
                  ))}
                </View>    
            </View>
        </Page>
    </Document>
);

export default MyDocument;