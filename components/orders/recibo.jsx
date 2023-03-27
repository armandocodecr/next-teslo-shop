import {
    Document,
    Page,
    View,
    Image,
    Text
} from '@react-pdf/renderer'

import { formatDate, stylesPDF } from '../../utils';

const Recibo = ( { infoReceipt }) => {

    return (
        <Document>
            <Page size="A4">
                <View style={{ padding: "15px" }}>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
                            <Image
                                style={{ width: "100px" }}
                                src="https://res.cloudinary.com/dyuj1zglt/image/upload/v1677013007/LOGOS/pldfstlm7yd7fg6mbhdv.png"
                            />
                        </View>
                        <View style={{ flex: 2 }}>
                            <View
                                style={{ 
                                    display: "flex" ,
                                    flexDirection: "column",
                                    alignItems: "center"
                                }}
                            >
                                <Text style={{ textAlign: "center", fontSize: "16px", fontWeight: "bold", borderBottom: "1px solid #000" }}>
                                    {`TESLO STYLE'S`}
                                </Text>
                                <Text style={{ textAlign: "center", fontSize: "13px", fontWeight: "bold", marginTop: 10 }}>WHOLESALE AND REDUCED PRICE</Text>
                                <Text style={{ textAlign: "center", fontSize: "13px", fontWeight: "bold" }}>San José - Costa Rica</Text>
                                <Text style={{ textAlign: "center", fontSize: "13px", fontWeight: "bold" }}>Street 13 - Nro. 150</Text>
                                <Text style={{ textAlign: "center", fontSize: "13px", fontWeight: "bold" }}>Phone: 3424234354</Text>
                            </View>
                        </View>
                        <View style={{ flex: 2 }}>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    margin: "5px",
                                    border: "1px solid #000",
                                    padding: "20px",
                                    borderRadius: "10px",
                                }}
                            >
                                <Text style={{ textAlign: "center", fontSize: "14px", fontWeight: "bold" }}>Proof of payment</Text>
                                <Text style={{ textAlign: "center", fontSize: "14px", fontWeight: "bold" }}>N° { infoReceipt._id }</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", marginTop: "20px" }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                                Client: { infoReceipt.shippingAddress.firstName } { infoReceipt.shippingAddress.lastName }
                            </Text>
                            <Text style={{ fontSize: "12px", fontWeight: "bold" }}>Address: { infoReceipt.shippingAddress.address }</Text>
                            <Text style={{ fontSize: "12px", fontWeight: "bold" }}>Phone: { infoReceipt.shippingAddress.phone }</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                            Date of issue: { formatDate(infoReceipt.createdAt) }
                            </Text>
                            <Text style={{ fontSize: "12px", fontWeight: "bold" }}>Expiration date: ONLINE PAYMENT</Text>
                            <Text style={{ fontSize: "12px", fontWeight: "bold" }}>Tax on the total sale: 13%</Text>
                        </View>
                    </View>
                    <View style={ stylesPDF.tabla }>
                        <View style={stylesPDF.tablaFila}>
                            <View style={stylesPDF.tablaColumna1}>
                                <Text style={stylesPDF.tablaCeldaHeader}>ITEM</Text>
                            </View>
                            <View style={stylesPDF.tablaColumna1}>
                                <Text style={stylesPDF.tablaCeldaHeader}>Quantity</Text>
                            </View>
                            <View style={stylesPDF.tablaColumna2}>
                                <Text style={stylesPDF.tablaCeldaHeader}>PRODUCT ID</Text>
                            </View>
                            <View style={stylesPDF.tablaColumna2}>
                                <Text style={stylesPDF.tablaCeldaHeader}>UNIT</Text>
                            </View>
                            <View style={stylesPDF.tablaColumna2}>
                                <Text style={stylesPDF.tablaCeldaHeader}>UNIT PRICE</Text>
                            </View>
                            <View style={stylesPDF.tablaColumna2}>
                                <Text style={stylesPDF.tablaCeldaHeader}>TOTAL</Text>
                            </View>
                        </View>
                        
                        {
                            infoReceipt.orderItems.map( (order, index) => (
                                <View style={stylesPDF.tablaFila} key={ order._id }>
                                    <View style={stylesPDF.anchoColumna1}>
                                        <Text style={stylesPDF.tablaCelda}>{ index + 1 }</Text>
                                    </View>
                                    <View style={stylesPDF.anchoColumna1}>
                                        <Text style={stylesPDF.tablaCelda}>{ order.quantity }</Text>
                                    </View>
                                    <View style={stylesPDF.anchoColumna2}>
                                        <Text style={stylesPDF.tablaCelda}>{ order._id }</Text>
                                    </View>
                                    <View style={stylesPDF.anchoColumna2}>
                                        <Text style={stylesPDF.tablaCelda}> { order.title } </Text>
                                    </View>
                                    <View style={stylesPDF.anchoColumna2}>
                                        <Text style={stylesPDF.tablaCelda}>{ order.price }</Text>
                                    </View>
                                    <View style={stylesPDF.anchoColumna2}>
                                        <Text style={stylesPDF.tablaCelda}>
                                            { order.quantity * order.price }
                                        </Text>
                                    </View>
                                </View>
                            ))  
                        }      

                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            marginBottom: "70px",
                            justifyContent: "flex-end"
                        }}
                    >
                        <Text style={{ fontSize: "10px", fontWeight: "bold", marginTop: 10 }}>
                            TOTAL AMOUNT (PLUS TAX): ${ infoReceipt.total }
                        </Text>
                    </View>
                </View>
            </Page>
        </Document>
    )

}

export default Recibo;