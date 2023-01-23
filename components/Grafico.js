import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text,StyleSheet} from 'react-native';
import {SCREEN_WIDTH} from '../strumenti/helper'
import {LineChart} from "react-native-chart-kit";


const Grafico = props => {
    let [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 })
    const data2 = {
        labels: [],
        datasets: [
          {
            data: [10], //Settiamo il massimo valore delle Y-axis
            color: () => `rgba(0, 0, 0, 0)`
          },
          {
            data: [],
          }
          
        ]
      }
    
    data2.datasets[1].data = props.data.map(value => value.voto);
    
    function* yLabel() {
        yield* [0,5,10];
    }

    const ciao = yLabel();  
    
    return(
        <View>
            <LineChart
                style={styles.container}
                data={data2}    
                bezier
                yLabelsOffset={10}
                verticalLabelRotation={30}
                width={SCREEN_WIDTH-50}
                height={250}
                withInnerLines = {false}
                withOuterLines = {true}
                //withHorizontalLabels = {false}
                segments={2}
                fromZero={true}
                yAxisInterval={1} 
                formatYLabel={() => ciao.next().value}
                
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#FFFFFF",
                    backgroundGradientTo: "#FFFFFF",
                    decimalPlaces: 2, 
                    color: (opacity = 1) => `rgba(96, 143, 247, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(38, 92, 222, ${opacity})`,
                    /*propsForDots: {
                        r: "3",
                        strokeWidth: "2",
                        stroke: "#323A66"
                    },*/
                }}
                decorator={() => {
                    return tooltipPos.visible ? 
                        <View style={[styles.labelPuntoGrafico, {top: tooltipPos.y  + 10,left: tooltipPos.x - 40}]}>
                            <Text style={{fontWeight: '700',color: 'white'}}>{tooltipPos.value.toFixed(2)}</Text>
                        </View> : null
                }}

                onDataPointClick={(data) => {
                    let isSamePoint = (tooltipPos.x === data.x && tooltipPos.y === data.y)
                    isSamePoint ? setTooltipPos((previousState) => {
                        return { 
                                  ...previousState,
                                  value: data.value,
                                  visible: !previousState.visible
                               }
                    }) : setTooltipPos({ x: data.x, value: data.value, y: data.y, visible: true });
                }}
            />
            </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        borderRadius: 27,  
    },
    labelPuntoGrafico: {
        position: 'relative',
        borderColor: '#265CDE',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: '#3A4475',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 80,
        zIndex: 1000,
    },
})

export default Grafico;