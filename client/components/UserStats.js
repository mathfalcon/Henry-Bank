import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View, Dimensions, Text } from "react-native";
import Svg, { Rect } from "react-native-svg";
import { Button, Card, DatePicker, DateTimePicker } from "native-base";
import styles from "../Styles/staticsStyles";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";
import { api } from "./Constants/constants";

export default function userStats({ navigation }) {
  const [sortBy, setSort] = useState("month");
  const [data, setData] = useState({});
  const [dataValues, setDataValues] = useState([1]);
  const userLogged = useSelector((state) => state.auth.user);
  const [decoratorValue, setDecoratorValue] = useState("0");
  const [decoratorX, setDecoratorX] = useState(300);
  const [decoratorY, setDecoratorY] = useState(0);

  useEffect(() => {
    getTransactionData();
  }, [sortBy]);

  const getTransactionData = async () => {
    const response = await axios.post(
      `${api}/transactions/account/graph/byTime`,
      {
        userId: userLogged.id,
        sortBy: sortBy,
      }
    );
    setData(response.data);
    let arrayToSet = [];
    for (let key in response.data) {
      arrayToSet.push(response.data[key]);
    }
    setDataValues(arrayToSet);
  };
  console.log(data);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.view1}>
        <Text style={styles.title}>My Stats</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
            marginTop: 50,
          }}
        >
          <Button dark onPress={() => setSort("month")}>
            <Text style={styles.sortByText}>Sort by month</Text>
          </Button>
          <Button dark onPress={() => setSort("year")}>
            <Text style={styles.sortByText}>Sort by year</Text>
          </Button>
        </View>
      </View>
      <View style={styles.view2}>
        <View style={styles.graph}>
          <Text style={styles.movements}>My account's balance variation</Text>
          <Card>
            <LineChart
              fromZero
              data={{
                labels: Object.keys(data).sort((a,b)=> a-b) || [1],
                datasets: [
                  {
                    data: dataValues || [1],
                  },
                ],
              }}
              width={Dimensions.get("window").width - 20} // from react-native
              height={250}
              yAxisLabel="$"
              // decorator={() => {
              //   return (
              //     <View>
              //       <Svg>
              //         <Rect
              //           x={decoratorX}
              //           y={decoratorY + 10}
              //           width="70"
              //           height="30"
              //           fill="black"
              //           textAnchor="middle"
              //         />
              //         <Text
              //           x={decoratorX + 35}
              //           y={decoratorY + 30}
              //           fill="white"
              //           fontSize="16"
              //           fontWeight="bold"
              //           textAnchor="middle"
              //         >
              //           {decoratorValue}
              //         </Text>
              //       </Svg>
              //     </View>
              //   );
              // }}
              // onDataPointClick={(data) => {
              //   setDecoratorValue(`$${data.value}`);
              //   if (data.x > 300) {
              //     setDecoratorX(parseInt(data.x - 50));
              //     setDecoratorY(parseInt(data.y));
              //   } else {
              //     setDecoratorX(parseInt(data.x));
              //     setDecoratorY(parseInt(data.y));
              //   }
              // }}
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
                propsForVerticalLabels:{
                  fontSize: 12
                }
              }}
              bezier
              withHorizontalLines={false}
              formatYLabel={(num) => parseInt(num)}
              formatXLabel={(num) => num % 2 === 0 && Object.keys(data).length > 12 ? '': num}
            />
          </Card>
        </View>
      </View>

      <View style={styles.menuOp}>
        <MenuOperation navigation={navigation} screen={"stats"} />
      </View>
    </View>
  );
}
