import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'

export default function PageInicial(){
    return(

        <View style={styles.container}>
            <View>
                <Text style={styles.textDe}>Menino Jesus</Text>
            </View>

            <View>
                <Image source={require('../../../imgs/teste.png')} style={styles.img1}/>
            </View>

        </View>


        
    );
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'antiquewhite',
        justifyContent:'space-between',
        alignItems:'center',

    },

    textDe:{
        display:'flex',
        fontWeight:'bold',
        fontFamily:'arial',
        alignItems:'center',
        fontSize:'3@s',
        height:'10@s',
        marginLeft:'5@s'
    },

    img1:{
        resizeMode:'contain',
        borderWidth:1,
        width:'10@s',
        height:'10@s',
        marginRight: '5@s'
    }
    

});