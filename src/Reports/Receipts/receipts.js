import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

function dataFormatada(oldDate){
    var data = new Date(oldDate),
        dia  = data.getDate().toString(),
        diaF = (dia.length === 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length === 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
}

function receiptsPDF(receiptData) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;


    const reportTitle = [{
        text: 'Ordem de serviço',
        alignment: 'center',
        fontSize: 24,
        bold: true,
        margin: [15, 20, 0, 45]
    }];

    const details = [
        {
            style: 'tableExample',
            color: '#444',
            table: {
                widths: ['auto', 223, 223],                
                body: [
                    [
                        {text: 'Informações', style: 'tableHeader', colSpan: 3, alignment: 'center', fillColor: '#782b2b', color: '#fff'}, 
                        {}, 
                        {}
                    ],
                    [   
                        {text: 'Identificação do recibo', style: 'tableHeader', alignment: 'center', colSpan: 3, fillColor: '#9f3232', color: '#fff'}, 
                        {}, 
                        {}
                    ],
                    [   
                        {text: receiptData.name, style: 'tableHeader', alignment: 'center', colSpan: 3}, 
                        {}, 
                        {}
                    ],
                    [   
                        {text: 'Código do recibo', style: 'tableHeader', alignment: 'left', fillColor: '#ad5f5f', color: '#fff'}, 
                        {text: '000'.concat(receiptData.code), style: 'tableHeader', alignment: 'center', colSpan: 2}, 
                        {}
                    ],
                    [   
                        {text: 'Data do recibo', style: 'tableHeader', alignment: 'left', fillColor: '#ad5f5f', color: '#fff'}, 
                        {text: dataFormatada(receiptData.date), style: 'tableHeader', alignment: 'center', colSpan: 2}, 
                        {}
                    ]
                ]
            }, 
        },
        {text: '', margin: [0, 20, 0, 0]},
        {
            style: 'tableExample',
            color: '#444',
            table: {
                widths: ['auto', 226, 226],       
                headerRows: 2,
                body: [                    
                    [   
                        {text: 'Cliente', style: 'tableHeader', alignment: 'center', colSpan: 3, fillColor: '#9f3232', color: '#fff'}, 
                        {}, 
                        {}
                    ],
                    [   
                        {text: 'Nome', style: 'tableHeader', alignment: 'center', colSpan: 1, fillColor: '#ad5f5f', color: '#fff'}, 
                        {text: receiptData.client, style: 'tableHeader', alignment: 'center', colSpan:2}, 
                        {}
                    ],
                    [   
                        {text: 'Telefone', style: 'tableHeader', alignment: 'center', colSpan: 1, fillColor: '#ad5f5f', color: '#fff'}, 
                        {text: receiptData.phone, style: 'tableHeader', alignment: 'center', colSpan:2}, 
                        {}
                    ],
                    [   
                        {text: 'Endereço do cliente', style: 'tableHeader', alignment: 'center', colSpan: 3, fillColor: '#9f3232', color: '#fff'}, 
                        {}, 
                        {}
                    ],
                    [   
                        {text: receiptData.address, style: 'tableHeader', alignment: 'center', colSpan: 3}, 
                        {}, 
                        {}
                    ]
                ]
            }, 
        },
        {text: '', margin: [0, 20, 0, 0]},
        {
            style: 'tableExample',
            color: '#444',
            table: {
                widths: ['auto', 247, 250],                   
                headerRows: 2,
                body: [                    
                    [   
                        {text: 'Descrição', style: 'tableHeader', alignment: 'center', colSpan: 3, fillColor: '#9f3232', color: '#fff'}, 
                        {}, 
                        {}
                    ],
                    [   
                        {text: receiptData.description, style: 'tableHeader', alignment: 'center', colSpan: 3}, 
                        {}, 
                        {}
                    ]
                ]
            }, 
        },
        {text: '', margin: [0, 20, 0, 0]},
        {
            style: 'tableExample',
            color: '#444',
            table: {
                widths: ['auto', 238, 238],                   
                headerRows: 2,
                body: [                    
                    [   
                        {text: 'Valor', style: 'tableHeader', alignment: 'center', colSpan: 1, fillColor: '#ad5f5f', color: '#fff'}, 
                        {text: "R$ ".concat(receiptData.value), style: 'tableHeader', alignment: 'center', colSpan:2}, 
                        {}
                    ],
                    [   
                        {text: 'Quantidade', style: 'tableHeader', alignment: 'center', colSpan: 1, fillColor: '#ad5f5f', color: '#fff'}, 
                        {text: receiptData.qtd, style: 'tableHeader', alignment: 'center', colSpan:2}, 
                        {}
                    ]
                ]
            }, 
        }
    ];

    const rodape = [];

    const docDefinitions = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],

        header: [reportTitle],
        content: [details],
        footer: [rodape],
    };

    pdfMake.createPdf(docDefinitions).download(`recibo_${receiptData.code}.pdf`);
}

export default receiptsPDF;