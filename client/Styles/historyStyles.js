import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "whitesmoke",
        width:"100%"
    },
    container2:{
        display: 'flex',
        flexDirection: 'column',
        width:"100%",
    },
    headerMovement:{
        flexDirection: 'row',
        margin: 15,

    },   
    background:{
        width: "100%",
    },
    title:{
        marginVertical: "15%",
        marginHorizontal: "5%",
        fontSize: 20,
        fontFamily: 'Poppins'
    },
    header: {
        backgroundColor: '#151515',
        display: 'flex',
    },
    headerTitle:{
        color:'white',
        alignItems: 'center',
        left: "10%",
        width: '100%',
    },
    continue: {
        color:'white',
        left: "130%",
        width: '100%',
    },
    textFilter:{
        alignSelf:'center',
        fontSize: 20,
        marginBottom:5,       
    },
    datePicker:{
        flexDirection:'column',
        justifyContent:'space-around',
        marginBottom: 0,  
        bottom: "70%",
    },
    fromTo:{
        flexDirection:'row',
        top: "80%",
        marginVertical: "3%",
    },
    date:{
        alignSelf:'center',
        fontSize: 20,
        marginLeft: 25,
        marginRight: "28%",
    },
    list:{
        marginBottom:45
    },
    card:{
        flexDirection:'column',
        marginVertical: 1, 
        alignSelf:"flex-start",
    },
    item:{
        top: "8%",
        marginVertical: 1,
        marginHorizontal: 20,
        fontSize: 13,
        alignSelf:"flex-start",
    },
    myName:{
        flexDirection:'row',
        alignSelf:'flex-start',
        marginLeft:10,        
        lineHeight: 20,
        left: "20%",
        fontSize: 15,
        fontWeight: "bold",
    },
    menuOp:{        
        height:60,
        marginTop:-40,        
        backgroundColor:"black",
    },
    money:{
        width: "140%",
        alignSelf:'flex-start',
        bottom: 20,
        right: 45,
        fontSize: 18,
        fontWeight: "bold",
    },
    moneyP:{
        color: "green"
    },
    moneyN:{
        color: "red"
    },
    filterButtom: {
        alignSelf:"center",
        backgroundColor: "#151515",
        height: 35,
        width: 125,
        justifyContent: "center",
        bottom: "18%"
      },
      filterText: {
       alignSelf: "center",
       color: "whitesmoke",
    },
    divider:{   
    },    
})