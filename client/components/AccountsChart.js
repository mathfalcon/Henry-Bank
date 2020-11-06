import React, { useEffect, useState } from "react";
import Svg, { Text, Rect } from "react-native-svg";

import { Alert, Dimensions, StyleSheet } from "react-native";
import { Container, View } from "native-base";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";
import { api } from "./Constants/constants";
import moment from 'moment';
moment().format();

export default AccountMovementsChart = ({ userLogged }) => {
  const [pastDaysBalance, setBalance] = useState([]);
  const [decoratorValue, setDecoratorValue] = useState("0");
  const [decoratorX, setDecoratorX] = useState(700);
  const [decoratorY, setDecoratorY] = useState(0);

  useEffect(() => {
    getPastDaysBalance();
  }, [decoratorValue]);

  const getPastDaysBalance = async () => {
    const response = await axios(
      `${api}/transactions/history/weekly/${userLogged.user.id}`
    );
    setBalance(response.data);
  };

  const decoratorView = StyleSheet.create({
    container: {
      opacity: 1,
    },
  });

  return (
    <LineChart
      fromZero
      data={{
        labels: [
          moment().subtract(6, 'days').date().toString()+ '/' + moment().subtract(6, 'days').month(),
          moment().subtract(5, 'days').date().toString()+ '/' + moment().subtract(5, 'days').month(),
          moment().subtract(4, 'days').date().toString()+ '/' + moment().subtract(4, 'days').month(),
          moment().subtract(3, 'days').date().toString()+ '/' + moment().subtract(3, 'days').month(),
          moment().subtract(2, 'days').date().toString()+ '/' + moment().subtract(2, 'days').month(),
          moment().subtract(1, 'days').date().toString()+ '/' + moment().subtract(1, 'days').month(),
          moment().date().toString()+ '/' + moment().month(),
        ],
        datasets: [
          {
            data: [
              pastDaysBalance[1] || 0,
              pastDaysBalance[2] || 0,
              pastDaysBalance[3] || 0,
              pastDaysBalance[4] || 0,
              pastDaysBalance[5] || 0,
              pastDaysBalance[6] || 0,
              pastDaysBalance[7] || 0,
            ],
          },
        ],
      }}
      width={Dimensions.get("window").width - 40} // from react-native
      height={180}
      yAxisLabel="$"
      decorator={() => {
        return (
          <View style={decoratorView.container} >
            <Svg>
              <Rect
                x={decoratorX}
                y={decoratorY + 10}
                width="80"
                height="30"
                fill="#2D2D2D"
                textAnchor="middle"
              />
              <Text
                x={decoratorX + 40}
                y={decoratorY + 30}
                fill="white"
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle"
              >
                {decoratorValue}
              </Text>
            </Svg>
          </View>
        );
      }}
      onDataPointClick={(data) => {
        setDecoratorValue(`$${data.value}`);
        if (data.x > 300) {
          setDecoratorX(parseInt(data.x - 50));
          setDecoratorY(parseInt(data.y));
        } else {
          setDecoratorX(parseInt(data.x));
          setDecoratorY(parseInt(data.y));
        }
      }}
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: "#151515",
        backgroundGradientFrom: "#151515",
        backgroundGradientTo: "#151515",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 10) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        propsForDots: {
          r: "2",
          strokeWidth: "1",
          stroke: "white",
        },
      }}
      bezier
      style={{
        elevation: 15,
        alignSelf: "center",
      }}
      yLabelsOffset={5}
      withHorizontalLines={false}
      formatYLabel={(num) => parseInt(num)}
    />
  );
};
