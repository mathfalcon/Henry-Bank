import React from "react";
import Svg, { Text, Rect } from "react-native-svg";

import { Dimensions } from "react-native";
import { Container, View } from "native-base";
import { LineChart } from "react-native-chart-kit";

export default AccountMovementsChart = () => {
  return (
    <LineChart
      data={{
        labels: ["Mon", "Tue", "Wed", "Tue", "Fri", "Sat", "Sun"],
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
