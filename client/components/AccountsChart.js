import React, { useEffect, useState } from "react";
import Svg, { Text, Rect } from "react-native-svg";

import { Alert, Dimensions, StyleSheet } from "react-native";
import { Container, View } from "native-base";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";
import { api } from "./Constants/constants";

export default AccountMovementsChart = ({ userLogged }) => {
  const today = new Date();
  const [pastDaysBalance, setBalance] = useState([]);
  const [decoratorValue, setDecoratorValue] = useState('0');
  const [decoratorX, setDecoratorX] = useState(300);
  const [decoratorY, setDecoratorY] = useState(0);
  useEffect(() => {
    getPastDaysBalance();
  }, []);

  const getPastDaysBalance = async () => {
    const response = await axios(
      `${api}/transactions/history/weekly/${userLogged.user.id}`
    );
    setBalance(response.data);
  };
  const decoratorView = StyleSheet.create({
    container: {
      opacity: 1
    }
  })
  
  return (
    <LineChart
      fromZero
      data={{
        labels: [
          today.getDate() - 7,
          today.getDate() - 6,
          today.getDate() - 5,
          today.getDate() - 4,
          today.getDate() - 3,
          today.getDate() - 2,
          "Yesterday",
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
      height={200}
      yAxisLabel="$"
      decorator={() => {
        return (
          <View style={decoratorView.container}>
            <Svg>
              <Rect
                x={decoratorX}
                y={decoratorY +10}
                width="70"
                height="30"
                fill="black"
                textAnchor="middle"
              />
              <Text
                x={decoratorX + 35}
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
        setDecoratorValue(`$${data.value}`)
        if(data.x > 300){
          setDecoratorX(parseInt(data.x -50))
        setDecoratorY(parseInt(data.y))
        } else{
        setDecoratorX(parseInt(data.x))
        setDecoratorY(parseInt(data.y))
        }
      }}
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: "#ffff57",
        backgroundGradientFrom: "whitesmoke",
        backgroundGradientTo: "whitesmoke",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 10) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        propsForDots: {
          r: "3",
          strokeWidth: "2",
          stroke: "#151515",
        },
      }}
      bezier
      style={{
        elevation: 15,
      }}
      withHorizontalLines={false}
      formatYLabel={(num) => parseInt(num)}
    />
  );
};
