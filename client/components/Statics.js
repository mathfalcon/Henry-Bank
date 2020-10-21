import React from "react";
import {
    Text,
    View,
    Dimensions,
} from "react-native";

import { DatePicker, DateTimePicker } from 'native-base'
import styles from '../Styles/staticsStyles'
import { BarChart } from "react-native-chart-kit";

export default function Statics() {

    const showDatepicker = () => {
        showMode('date');
    };
    return (
        <View >
            <View style={styles.calendarOne}>
                <Text>From:</Text>
                <DatePicker
                    defaultDate={new Date()}
                    maximumDate={new Date()}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Touch here to select a date.."
                    textStyle={{ color: "black" }}
                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                    onDateChange={(date) =>
                        setFieldValue("birth", date.toString().substr(4, 12))
                    }
                    disabled={false}
                />
            </View>
            <View style={styles.calendarOne}>
                <Text>To:</Text>
                <DatePicker
                    defaultDate={new Date()}
                    maximumDate={new Date()}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Touch here to select a date.."
                    textStyle={{ color: "black" }}
                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                    onDateChange={(date) =>
                        setFieldValue("birth", date.toString().substr(4, 12))
                    }
                    disabled={false}
                />
            </View>
            <View  >
                <View style={styles.graph}>
                    <Text style={styles.movements} >Movements</Text>
                    <BarChart
                        data={{
                            labels: ["Mon", "Tue", "Wed", "Tue", "Fri"],
                            datasets: [
                                {
                                    data: [
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100
                                    ]
                                }
                            ]
                        }}
                        width={Dimensions.get("window").width} // from react-native
                        height={220}
                        yAxisLabel="$"
                        yAxisSuffix="k"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: "white",
                            backgroundGradientFrom: "black",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                </View>
            </View>
        </View >
    );
};