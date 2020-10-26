import React, { useEffect, useState } from "react";
import Svg, { Text, Rect } from "react-native-svg";

import { Alert, Dimensions } from "react-native";
import { Container, View } from "native-base";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";
import { api } from "./Constants/constants";

export default AccountMovementsChart = ({ userLogged }) => {
  const today = new Date();
  const [pastDaysBalance, setBalance] = useState([]);

  useEffect(() => {
    getPastDaysBalance();
  }, []);

  const getPastDaysBalance = () => {
    axios(
      `${api}/transactions/history/weekly/${userLogged.user.id}`
    )
    .then((response) => console.log(response.data))
    .catch( err => console.log( err ))
  };
    const getData = () => {
    let currentBalance = userLogged.user.account.balance;
    let toReturn = [];
    pastDaysBalance.reverse().forEach((e) => {
      currentBalance -= e;
      toReturn.push(currentBalance)
    });
    console.log(toReturn)
    return toReturn.reverse()
  };
  return (
    <LineChart
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
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
            ],
          },
        ],
      }}
      width={Dimensions.get("window").width - 40} // from react-native
      height={200}
      yAxisLabel="$"
      yAxisSuffix="k"
      decorator={() => {
        return (
          <View>
            <Svg>
              <Rect x={80} y={110} width="40" height="30" fill="black" />
              <Text
                x={100}
                y={130}
                fill="white"
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle"
              >
                0.0
              </Text>
            </Svg>
          </View>
        );
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
        marginVertical: 8,
        elevation: 15,
      }}
    />
  );
};
