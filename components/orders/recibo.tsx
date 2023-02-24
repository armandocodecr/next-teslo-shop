import {
    Document,
    Page,
    View,
    Image,
    Text,
    StyleSheet
} from '@react-pdf/renderer'
import { formatDate } from '../../utils';
import { IOrder } from '../../interfaces';

const COL_ANCHO_1 = 10;
const COL_ANCHO_2 = 20;

const styles = StyleSheet.create({
    tabla: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderColor: "#000",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        marginTop: 20
    },
    tablaFila: {
        margin: "auto",
        flexDirection: "row"
    },
    tablaColumna1: {
        width: COL_ANCHO_1 + "%",
        borderStyle: "solid",
        borderColor: "#000",
        borderBottomColor: "#000",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tablaColumna2: {
        width: COL_ANCHO_2 + "%",
        borderStyle: "solid",
        borderColor: "#000",
        borderBottomColor: "#000",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tablaCeldaHeader: {
        margin: 5,
        fontSize: 10,
        fontWeight: 500,
    },
    anchoColumna1: {
        width: COL_ANCHO_1 + "%",
        borderStyle: "solid",
        borderColor: "#000",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    anchoColumna2: {
        width: COL_ANCHO_2 + "%",
        borderStyle: "solid",
        borderColor: "#000",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tablaCelda: {
        margin: 5,
        fontSize: 10,
    },
})

interface Props {
    infoReceipt: IOrder
}

const Recibo = ( { infoReceipt }: Props ) => {
    console.log(infoReceipt)
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
                                <Text style={{ textAlign: "center", fontSize: "13px", fontWeight: "bold", marginTop: 10 }}>VENTA AL POR MAYOR Y MENOR PRECIO</Text>
                                <Text style={{ textAlign: "center", fontSize: "13px", fontWeight: "bold" }}>San José - Costa Rica</Text>
                                <Text style={{ textAlign: "center", fontSize: "13px", fontWeight: "bold" }}>Calle 13 - Nro. 150</Text>
                                <Text style={{ textAlign: "center", fontSize: "13px", fontWeight: "bold" }}>Celular: 3424234354</Text>
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
                                <Text style={{ textAlign: "center", fontSize: "14px", fontWeight: "bold" }}>Comprobante de pago</Text>
                                <Text style={{ textAlign: "center", fontSize: "14px", fontWeight: "bold" }}>N° { infoReceipt._id }</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", marginTop: "20px" }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                                Cliente: { infoReceipt.shippingAddress.firstName } { infoReceipt.shippingAddress.lastName }
                            </Text>
                            <Text style={{ fontSize: "12px", fontWeight: "bold" }}>Direccion: { infoReceipt.shippingAddress.address }</Text>
                            <Text style={{ fontSize: "12px", fontWeight: "bold" }}>Celular: { infoReceipt.shippingAddress.phone }</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                                Fecha de Emisión: { formatDate(infoReceipt.createdAt!) }
                            </Text>
                            <Text style={{ fontSize: "12px", fontWeight: "bold" }}>Fecha de vencimiento: PAGO ONLINE</Text>
                            <Text style={{ fontSize: "12px", fontWeight: "bold" }}>Impuesto sobre el total de la venta: 13%</Text>
                        </View>
                    </View>
                    <View style={styles.tabla}>
                        <View style={styles.tablaFila}>
                            <View style={styles.tablaColumna1}>
                                <Text style={styles.tablaCeldaHeader}>ITEM</Text>
                            </View>
                            <View style={styles.tablaColumna1}>
                                <Text style={styles.tablaCeldaHeader}>CANTIDAD</Text>
                            </View>
                            <View style={styles.tablaColumna2}>
                                <Text style={styles.tablaCeldaHeader}>ID DEL PRODUCTO   </Text>
                            </View>
                            <View style={styles.tablaColumna2}>
                                <Text style={styles.tablaCeldaHeader}>UNIDAD</Text>
                            </View>
                            <View style={styles.tablaColumna2}>
                                <Text style={styles.tablaCeldaHeader}>PRECIO UNITARIO</Text>
                            </View>
                            <View style={styles.tablaColumna2}>
                                <Text style={styles.tablaCeldaHeader}>IMPORTE TOTAL</Text>
                            </View>
                        </View>
                        
                        {
                            infoReceipt.orderItems.map( (order, index) => (
                                <View style={styles.tablaFila} key={ order._id }>
                                    <View style={styles.anchoColumna1}>
                                        <Text style={styles.tablaCelda}>{ index + 1 }</Text>
                                    </View>
                                    <View style={styles.anchoColumna1}>
                                        <Text style={styles.tablaCelda}>{ order.quantity }</Text>
                                    </View>
                                    <View style={styles.anchoColumna2}>
                                        <Text style={styles.tablaCelda}>{ order._id }</Text>
                                    </View>
                                    <View style={styles.anchoColumna2}>
                                        <Text style={styles.tablaCelda}> { order.title } </Text>
                                    </View>
                                    <View style={styles.anchoColumna2}>
                                        <Text style={styles.tablaCelda}>{ order.price }</Text>
                                    </View>
                                    <View style={styles.anchoColumna2}>
                                        <Text style={styles.tablaCelda}>
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
                            IMPORTE TOTAL (MÁS IMPUESTOS): ${ infoReceipt.total }
                        </Text>
                    </View>
                </View>
            </Page>
        </Document>
    )

}

export default Recibo;