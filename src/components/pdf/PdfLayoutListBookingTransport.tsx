import {IBookingTransport} from "../../interfaces/IBookingTransport";
import {PDFViewer,Document,Page,View,Text, StyleSheet, Font} from "@react-pdf/renderer";
import {useTranslate} from "@pankod/refine-core";
import moment from "moment";

Font.register({
    family: "Roboto",
    src:
        "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
});

type PdfProps = {
    records: IBookingTransport[] | undefined;
}


export const PdfLayoutListBookingTransport: React.FC<PdfProps> = ({ records }) => {
    const t = useTranslate();
    return(
        <PDFViewer style={styles.viewer}>
            <Document>
                <Page style={styles.page} orientation={'landscape'} size={'A4'}>
                    <View style={styles.table}>
                        <View style={styles.tableHeader}>
                            <Text style={[
                                styles.tableHeaderItem,
                                { width: "5%", },
                            ]}>
                                {t("booking_transport.fields.is_active")}
                            </Text>
                            <Text style={[
                                styles.tableHeaderItem,
                                { width: "12%" },
                            ]}>
                                {t("booking_transport.fields.startDate")}
                                 (дата время)
                            </Text>
                            <Text style={[
                                styles.tableHeaderItem,
                                { width: "20%" },
                            ]}>
                                {t("booking_transport.fields.title")}
                                (заказ, адрес)
                            </Text>
                            <Text style={[
                                styles.tableHeaderItem,
                                { width: "5%" },
                            ]}>
                                Прод. (ч)
                                {/*{t("booking_transport.fields.duration")}*/}
                            </Text>
                            <Text style={[
                                styles.tableHeaderItem,
                                { width: "20%" },
                            ]}>
                                {t("booking_transport.fields.subunit")}
                            </Text>
                            <Text style={[
                                styles.tableHeaderItem,
                                { width: "5%" },
                            ]}>
                                {/*{t("booking_transport.fields.count_man")}*/}
                                Кол. чел.
                            </Text>
                            <Text style={[
                                styles.tableHeaderItem,
                                { width: "15%" },
                            ]}>
                                {t("booking_transport.fields.transport")}
                            </Text>
                            <Text style={[
                                styles.tableHeaderItem,
                                { width: "20%" },
                            ]}>
                                {t("booking_transport.fields.description")}
                            </Text>

                        </View>
                        {records?.map((item)=>{
                            if (item.is_active)
                                return(
                                    <View key={item.id} style={styles.tableRow}>
                                        <Text
                                            style={[
                                                styles.tableCol,
                                                { width: "5%", textAlign: "center", },
                                            ]}
                                        >
                                            {item.is_active ? 'A':'X'}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.tableCol,
                                                { width: "12%" },
                                            ]}
                                        >
                                            {moment(item.startDate).format("DD.MM.YYYY (HH:mm)")}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.tableCol,
                                                { width: "20%" },
                                            ]}
                                        >
                                            {item.title}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.tableCol,
                                                { width: "5%", textAlign: "center", },
                                            ]}
                                        >
                                            {item.duration}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.tableCol,
                                                { width: "20%" },
                                            ]}
                                        >
                                            {item.subunit.title}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.tableCol,
                                                { width: "5%", textAlign: "center",},
                                            ]}
                                        >
                                            {item.count_man}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.tableCol,
                                                { width: "15%" },
                                            ]}
                                        >
                                            {item.transport?.title}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.tableCol,
                                                { width: "20%" },
                                            ]}
                                        >
                                            {item.description}
                                        </Text>
                                    </View>
                                )
                        })}
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    )
};

const styles = StyleSheet.create({
    viewer: {
        paddingTop: 32,
        width: "100%",
        height: "80vh",
        border: "none",
    },
    page: {
        display: "flex",
        padding: "0.4in 0.4in",
        color: "#333",
        backgroundColor: "#fff",
    },
    table: {
        marginTop: 20,
    },
    tableHeader: {
        display: "flex",
        flexDirection: "row",
        textAlign: "center",

    },
    tableHeaderItem: {
        paddingVertical: 8,
        border: "1px solid #000",
        //borderBottom: "none",
        fontSize: '8px',
        fontFamily : "Roboto"
    },
    tableRow: {
        display: "flex",
        flexDirection: "row",
        fontFamily : "Roboto",
        fontSize: '8px',
    },
    tableCol: {
        paddingVertical: 1,
        paddingHorizontal: 4,
        border: "0.6px solid #000",
    },
})