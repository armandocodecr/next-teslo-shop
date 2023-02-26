//Este archivo es .js debido a la incompatibilidad del valor "table" en el display

import { StyleSheet } from '@react-pdf/renderer'

const COL_ANCHO_1 = 10;
const COL_ANCHO_2 = 20;

export const stylesPDF = StyleSheet.create({
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