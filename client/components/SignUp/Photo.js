import * as React from 'react';
import { Text, View ,Image, TouchableOpacity} from 'react-native';
import styles from "../../Styles/photoStyles.js";

export default function photo({ route, navigation }) {
 const { photo } = route.params;
 
 return (
    <View style={styles.mainView}>

        <Image source={{ uri: photo.uri }} style={styles.image}/>
        <View style={styles.buttoms}>
            <TouchableOpacity        
                style={styles.buttonOtra}
                onPress={() => navigation.goBack()}
            >
                <Text
                    style={styles.textOtra}
                > Try Again
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonCargar}        
                onPress={() => navigation.navigate('third',{ photo })}
            >
                <Text
                    style={styles.textCargar}
                > That's Right
                </Text>
            </TouchableOpacity>
        </View>
    </View>
    );
}