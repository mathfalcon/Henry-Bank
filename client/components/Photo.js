import * as React from 'react';
import { Text, View ,Image, TouchableOpacity} from 'react-native';
import styles from "../Styles/photoStyles.js";

export default function notification({ route, navigation }) {
 const { photo } = route.params;
 
 return (
    <View style={{ flex: 1, alignItems:'center',justifyContent:'center' }}>    
        <Image source={{ uri: photo.uri }} style={{width:380,height:550}}/>
           
        {/* Al parecer estos botones quedan por debajo de la foto */}           

        <TouchableOpacity        
            style={styles.buttonOtra}
        // onPress={changeCamera}
        >
            <Text
                style={styles.textOtra}
            > Tomar otra foto
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.buttonCargar}        
        // onPress={changeCamera}
        >
            <Text
                style={styles.textCargar}
            > Guardar
            </Text>
        </TouchableOpacity>
    </View>
    );
}