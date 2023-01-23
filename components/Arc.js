import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Svg,Path, Defs, Line,Stop, LinearGradient} from 'react-native-svg';




const Arc = props => {
    return(
        <Svg width="140" height="110" viewbox="0 -5 140 110" style="background:#efefef">
            <Defs>
                <clipPath id="my-clip">
                <Path
                    d="M 50 8 A 1 1 0 0 1 50 92"
                />
                </clipPath>
            </Defs>
            <Path
                clip-path="url(#my-clip)"
                d="M 50 8 A 1 1 0 0 1 50 92"
                fill="none"
                stroke="skyblue"
                stroke-width="55"
            />
            <Path
                d="M 50 8 A 1 1 0 0 1 50 92"
                fill="none"
                stroke="blue"
                stroke-width="15"
            />
        </Svg>
    )
}


const styles = StyleSheet.create({

})

export default Arc;