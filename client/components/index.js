import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { getUserLogged } from "../redux/actions/authActions";

/* ------------------------------- COMPONENTS ------------------------------- */
// import AccountHistory from "./AccountHistory";
// import Contacts from "./Contacts";
import ForgotPass from "./ForgotPass";
import Home from "./Home";
import HomePosition from "./HomePosition/HomePosition";
import LogIn from "./LogIn";
// import MyCards from "./MyCards";
import Position from "./Position";
import RechargeMoney from "../views/RechargeMoney";
import SendMoney from "./SendMoney";
import SignupForm from "./SignupForm";
import ResetPassword from "./ResetPassword";

/* ------------------------------- ADMIN ------------------------------- */
import AdminPanel from "./Admin/AdminPanel";
import ManageUsers from "./Admin/ManageUsers";
import ManageAccounts from "./Admin/ManageAccounts";
import ManageTransactions from "./Admin/ManageTransactions";
import SeeStats from "./Admin/SeeStats";
// import userStats from "./UserStats";

const LoggedFalseStack = createStackNavigator();
const LoggedTrueStack = createStackNavigator();

export default function Index() {
  const dispatch = useDispatch()
  const userLogged = useSelector((state) => state.auth);  

  useEffect(() => dispatch(getUserLogged()), []);
  return (
    <NavigationContainer>
      {
        // La condicion "role === undefined" podria estar separada cargando un "spinner" si es "true"
        userLogged.user.role === undefined ||
        userLogged.user.role === "guest" ? (
          <>
            <LoggedFalseStack.Navigator headerMode="none">
              <LoggedFalseStack.Screen name="home" component={Home} />
              <LoggedFalseStack.Screen name="login" component={LogIn} />
              <LoggedFalseStack.Screen name="sign" component={SignupForm} />
              <LoggedFalseStack.Screen
                name="forgotPass"
                component={ForgotPass}
              />
              <LoggedFalseStack.Screen
                name="resetPassword"
                component={ResetPassword}
              />
            </LoggedFalseStack.Navigator>
            </>
            )
          :
            (
              <>
              <LoggedTrueStack.Navigator headerMode="none">                
                {/* <LoggedTrueStack.Screen name="contacts" component={Contacts} />        
                <LoggedTrueStack.Screen name="myCards" component={MyCards} />         */}
                <LoggedTrueStack.Screen name="homePosition" component={HomePosition} />
                <LoggedTrueStack.Screen name="position" component={Position} />
                <LoggedTrueStack.Screen name="recharge" component={RechargeMoney} />
                <LoggedTrueStack.Screen name="sendMoney" component={SendMoney} />
                {/* <LoggedTrueStack.Screen name="accountHistory" component={AccountHistory} />
                <LoggedTrueStack.Screen name="userStats" component={userStats} /> */}
                <LoggedTrueStack.Screen name="adminPanel" component={AdminPanel} />
                <LoggedTrueStack.Screen name="manageUsers" component={ManageUsers} />
                <LoggedTrueStack.Screen name="manageAccounts" component={ManageAccounts} />
                <LoggedTrueStack.Screen name="manageTransactions" component={ManageTransactions} />
                <LoggedTrueStack.Screen name="seeStats" component={SeeStats} />
                
              </LoggedTrueStack.Navigator>
              </>
            )
          }
    </NavigationContainer>
  );
}

// De volver a la estructura que estaba ( la que quedó comentada abajo, descomentar linea 52 del componente login y borrar la 53
// y descomentar la linea 36 del componente position y borrar la 37 )

// import "react-native-gesture-handler";
// import React, { useEffect } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { useDispatch, useSelector } from "react-redux";
// import { getUserLogged } from "../redux/actions/authActions";

// /* ------------------------------- COMPONENTS ------------------------------- */
// import AccountHistory from "./AccountHistory";
// import Contacts from "./Contacts";
// import ForgotPass from "./ForgotPass";
// import Home from "./Home";
// import LogIn from "./LogIn";
// import MyCards from './MyCards';
// import Position from "./Position";
// import RechargeMoney from "../views/RechargeMoney";
// import SendMoney from './SendMoney';
// import SignupForm from "./SignupForm";

// /* ------------------------------- ADMIN ------------------------------- */
// import AdminPanel from "./Admin/AdminPanel";
// import ManageUsers from "./Admin/ManageUsers";
// import ManageAccounts from "./Admin/ManageAccounts";
// import ManageTransactions from "./Admin/ManageTransactions";
// import SeeStats from "./Admin/SeeStats";

// const Stack = createStackNavigator();

// export default function Index() {
//   const dispatch = useDispatch();
//   const userLogged = useSelector((state) => state.auth);

//   useEffect(() => dispatch(getUserLogged()), []);
//   return (
//     <NavigationContainer>
//             <Stack.Navigator headerMode="none">
//               <Stack.Screen name="home" component={Home} />
//               <Stack.Screen name="login" component={LogIn} />
//               <Stack.Screen name="sign" component={SignupForm} />
//               <Stack.Screen name="forgotPass" component={ForgotPass} />

//                 <Stack.Screen name="position" component={Position} />
//                 <Stack.Screen name="contacts" component={Contacts} />
//                 <Stack.Screen name="myCards" component={MyCards} />
//                 <Stack.Screen name="recharge" component={RechargeMoney} />
//                 <Stack.Screen name="sendMoney" component={SendMoney} />
//                 <Stack.Screen name="accountHistory" component={AccountHistory} />

//                 <Stack.Screen name="adminPanel" component={AdminPanel} />
//                 <Stack.Screen name="manageUsers" component={ManageUsers} />
//                 <Stack.Screen name="manageAccounts" component={ManageAccounts} />
//                 <Stack.Screen name="manageTransactions" component={ManageTransactions} />
//                 <Stack.Screen name="seeStats" component={SeeStats} />
//         </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
