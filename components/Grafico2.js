import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, TextInput, Animated, Text} from 'react-native';
import {SCREEN_WIDTH} from '../strumenti/helper';
import * as path from 'svg-path-properties';
import * as shape from 'd3-shape';
import {scaleTime, scaleLinear,scaleQuantile} from 'd3-scale';
import {Svg,Path, Defs, Line,Stop, LinearGradient} from 'react-native-svg';

const height = 200;
const width = SCREEN_WIDTH - 30;
const verticalPadding = 5;
const cursorRadius = 10;
const labelWidth = 60;


const Grafico2 = props => {
    //var grafico_voti = props.data.map(value => value.voto);
    //var grafico_data = props.data.map(value => value.data);

    const arr = [];
   


    const dataPresi = props.data.map(value =>(
        arr.push(
            {
                x: new Date(value.data[2],value.data[1],value.data[0]),
                y: value.voto
            }
        )
    )) 

    const data2 = arr;
    /*------- Settaggi Dati Grafico -------*/
    const data = [
        { x: new Date(2018, 9, 1), y: 0.5 },
        { x: new Date(2018, 9, 16), y: 3 },
        { x: new Date(2018, 9, 17), y: 4 },
        { x: new Date(2018, 10, 1), y: 5 },
        { x: new Date(2018, 10, 2), y: 6 },
        { x: new Date(2018, 10, 5), y: 7 },
        { x: new Date(2020, 10, 5), y: 6 },
        { x: new Date(2020, 10, 5), y: 6 },
        { x: new Date(2020, 10, 5), y: 6 },
      ];
    
    const scaleX = scaleTime().domain([new Date(2018, 9, 1), new Date(2020, 10, 5)]).range([0, width]);
    const scaleY = scaleLinear().domain([0, 10]).range([height - verticalPadding, verticalPadding]);
    //const scaleLabel = scaleQuantile().domain([0, 10]).range([0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 4.25, 4.5, 4.75, 5, 5.25, 5.5, 5.75, 6, 6.25, 6.5, 6.75, 7, 7.25, 7.5, 7.75, 8, 8.25, 8.5, 8.75, 9, 9.25, 9.5, 9.75, 10]);
    const scaleLabel = scaleQuantile().domain([0, 10]).range([0,1,2,3,4,5,6,7,8,9,10]);
    const scaleLabel2 = scaleQuantile().domain([0, 10]).range(["Aug 1", "Dec 1", "Aug 2", "Aug 1", "Dec 1", "Aug 2","Aug 1", "Dec 1", "Aug 2", "Aug 1", "Dec 1"]);
        const line = shape.line()
        .x(d => scaleX(d.x))
        .y(d => scaleY(d.y))
        .curve(shape.curveMonotoneX)(data);
    const properties = path.svgPathProperties(line);
    const lineLength = properties.getTotalLength();
    

    /*------- Settaggi State -------*/
    const [x, setX] = useState(new Animated.Value(0));
    const [testoDataWidget, setTestoDataWidget] = useState('-');
    const [testoVotoWidget, setTestoVotoWidget] = useState('-');
    const [cursor, setCursor] = useState({ top : 0, left : 0});
    const [line2, setLine] = useState({ x1 : 0 ,  x2 : 0 , y1 : 0 , y2 : 0});

    useEffect(() => {
        x.addListener(({ value }) => moveCursor(value));
        moveCursor(0);
    }, [])

    const moveCursor= (value) => {
        const { x, y } = properties.getPointAtLength(lineLength - value);
        setCursor ({top: y - cursorRadius, left:  x - cursorRadius});
        setLine ({x1 : x - cursorRadius+10,x2 : x - cursorRadius+10, y1 : y + cursorRadius/2, y2 : height});
        const votoText = scaleLabel(scaleY.invert(y));
        const dataMobile = scaleLabel2(scaleY.invert(y));
        setTestoDataWidget(dataMobile);
        setTestoVotoWidget(votoText);
    }
    
     const translateX = x.interpolate({
       inputRange: [0, lineLength],
       outputRange: [width - labelWidth, 0],
       extrapolate: 'clamp',
    });

    return (
        <View style = {styles.principale}>
            <View style={styles.container}>
            <Svg {...{ width, height }}>
                <Defs>
                    <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="100%" stopColor="white" stopOpacity="1" />
                    <Stop offset="0%" stopColor="blue" stopOpacity="0.2" />
                    </LinearGradient>
                </Defs>
                <Path d={line} fill="transparent" stroke="#367be2" strokeWidth={2} />
                <Path d={`${line} L ${width} ${height} L 0 ${height}`} fill="url(#grad)" />
                <Line x1 = {line2.x1} x2 = {line2.x2} y1 = {line2.y1} y2 = {line2.y2}stroke = "white" strokeDasharray="2, 2"/>
                <View top={cursor.top} left={cursor.left} style={styles.cursor} />
            </Svg>
            <Animated.View style={[styles.widgetMobile, { transform: [{ translateX }] }]}>
                <Text style={{color: 'white',fontWeight: '700'}}>{testoDataWidget}</Text>
                <Text style={{color: 'white',fontWeight: '700'}}>{testoVotoWidget}</Text>
            </Animated.View>
            
            <Animated.ScrollView
                style={StyleSheet.absoluteFill}
                contentContainerStyle={{ width: lineLength * 2 }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                bounces={false}
                onScroll={Animated.event(
                    [
                    {
                        nativeEvent: {
                        contentOffset: { x },
                        },
                    },
                    ],
                    { useNativeDriver: true },
                )}
                
                horizontal
            />
            </View>
        </View>
        
        );
    }


const styles = StyleSheet.create({

    root: {
        flex: 1,
        marginLeft : 15,
    },
    container: {
        marginTop: 60,
        height,
        width,
    },
    cursor: {
        width: cursorRadius * 2,
        height: cursorRadius * 2,
        borderRadius: cursorRadius,
        borderColor: '#367be2',
        borderWidth: 3,
        backgroundColor: 'white',
    },
    widgetMobile: {
        position: 'absolute',
        top: -45,
        left: 0,
        backgroundColor: '#3A4475',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#265CDE',
        width: labelWidth,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerColonna: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    item: {
        width: '50%' 
    }
});

export default Grafico2;