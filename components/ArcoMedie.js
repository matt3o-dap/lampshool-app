import React from 'react';
import {Text, StyleSheet, View, Animated, Easing} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import responsiveFontSize  from "../strumenti/responsiveFontSize";


const ArcoMedie = props => {
    const color = (props.tipo == 'scritto') ? '#9FABFF' : (props.tipo == 'orale') ? '#C69BFF' : '#FD76FF'
    
    return(
        <View style={{alignItems: 'center'}}>
        <AnimatedCircularProgress
            size = {70}
            width={7}
            backgroundWidth={3}
            fill = {(props.media)*10}
            tintColor = {color}
            tintTransparency = {true}
            rotation = {240}
            arcSweepAngle = {240}
            duration = {1000}
            lineCap="round"
            easing = { Easing.out(Easing.ease)}
            backgroundColor={color+'30'}>
            {
            (fill) => (
                <Text style={{fontSize: responsiveFontSize(12), fontWeight: '800', color: color}}>{props.media}</Text>
            )
            }
        </AnimatedCircularProgress>
        <Text style={{fontSize: responsiveFontSize(9), fontWeight: '300', color: color, textTransform: 'capitalize'}}>Media</Text>
        <Text style={{fontSize: responsiveFontSize(10), fontWeight: '800', color: color, textTransform: 'capitalize'}}>{props.tipo}</Text>
        </View>

    )
}


const styles = StyleSheet.create({
})

export default ArcoMedie;