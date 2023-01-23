import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, TextInput, Animated, Text} from 'react-native';
import {SCREEN_WIDTH} from '../strumenti/helper';
import * as path from 'svg-path-properties';
import * as shape from 'd3-shape';
import {scaleTime, scaleLinear,scaleQuantile} from 'd3-scale';
import {Svg,Path, Defs, Circle, Line,Stop, LinearGradient} from 'react-native-svg';
import AccordionListItem from './fisarmonica';
import {converti, controlla, aggiungiVotiFisarmonica, creaArray} from '../strumenti/helperGraph';

const height = 200;
const width = SCREEN_WIDTH - 30;
const verticalPadding = 5;
const cursorRadius = 10;
const labelWidth = 130;

const GraficoP = props => {
   /* var grafico_voti = props.data.map(value => value.voto);
    var grafico_data = props.data.map(value => value.data);
    //var maxDate=new Date(Math.min.apply(null,grafico_data));

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

    const data1 = props.data;
    
    const data = [
        { x: new Date(2020, 10, 15), y: 9 },
        { x: new Date(2020, 10, 19), y: 9.5 },
        { x: new Date(2020, 10, 26), y: 9 },
        { x: new Date(2020, 11, 3), y: 9 },
        { x: new Date(2020, 11, 5), y: 9.5 },
        { x: new Date(2020, 11, 11), y: 9 },
        { x: new Date(2020, 11, 11), y: 8 },
        { x: new Date(2020, 11, 12), y: 10 },
        { x: new Date(2020, 11, 14), y: 7 },
        { x: new Date(2020, 11, 17), y: 8 },
        { x: new Date(2020, 11, 18), y: 9 },
        { x: new Date(2020, 11, 20), y: 10 },
        { x: new Date(2020, 11, 21), y: 7 },
        { x: new Date(2020, 12, 3), y: 8},
        { x: new Date(2020, 12, 3), y: 6 },
        { x: new Date(2020, 12, 4), y: 7 },
        { x: new Date(2020, 12, 10), y: 8.5 },
        { x: new Date(2020, 12, 19), y: 7.5 },
        { x: new Date(2021, 1, 15), y: 8 },
        { x: new Date(2021, 1, 18), y: 8 },
        { x: new Date(2021, 1, 20), y: 9 },
        { x: new Date(2021, 1, 21), y: 7 },
      ];
    const arr = creaArray (data)

    /*console.log("mie: ",  data1)
    console.log("statici: ", data)*/
    
    const scaleX = scaleTime().domain([new Date(2020, 10, 15), new Date(2021, 1, 21)]).range([0, width]);
    const scaleY = scaleLinear().domain([0, 10]).range([height - verticalPadding, verticalPadding]);
    //const scaleLabel = scaleQuantile().domain([0, 10]).range([0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 4.25, 4.5, 4.75, 5, 5.25, 5.5, 5.75, 6, 6.25, 6.5, 6.75, 7, 7.25, 7.5, 7.75, 8, 8.25, 8.5, 8.75, 9, 9.25, 9.5, 9.75, 10]);
    //const scaleLabel = scaleQuantile().domain([0, 10]).range([0,1,2,3,4,5,6,7,8,9,10]);
    //const scaleLabel2 = scaleQuantile().domain([0, 10]).range(["Aug 1", "Dec 1", "Aug 2", "Aug 1", "Dec 1", "Aug 2","Aug 1", "Dec 1", "Aug 2", "Aug 1", "Dec 1"]);
    const line = shape.line()
        .x(d => scaleX(d.x))
        .y(d => scaleY(d.y))
    .curve(shape.curveMonotoneX)(arr);
    const properties = path.svgPathProperties(line);
    const lineLength = properties.getTotalLength();

    const cerchi = [
        {
          cx: scaleX (arr [0] ['x']),
          cy: (scaleY (arr [0] ['y'])),
          r : '3',
        },
        {
            cx: scaleX (arr [1] ['x']),
            cy: (scaleY (arr [1] ['y'])),
            r : '3',
        },
        {
            cx: scaleX (arr [2] ['x']),
            cy: (scaleY (arr [2] ['y'])),
            r : '3',
        },
        {
            cx: scaleX (arr [3] ['x']),
            cy: (scaleY (arr [3] ['y'])),
            r : '3',
        },
        {
            cx: scaleX (arr [4] ['x']),
            cy: (scaleY (arr [4] ['y'])),
            r : '3',
        },
        {
            cx: scaleX (arr [5] ['x']),
            cy: (scaleY (arr [5] ['y'])),
            r : '3',
        },
      ];

    /*------- Settaggi State -------*/
    const [x, setX] = useState(new Animated.Value(0));
    const [prossimita, setProssimita] = useState(false);
    const [titleF, setTitleF] = useState ('-');

    const cursor2 = useRef();
    const lineRef = useRef ();
    const votoLabel = useRef ();
    const dataLabel = useRef ();
    const fisarmonica = useRef ();

    var gg = "ffffff";


    useEffect(() => {
        x.addListener(({ value }) => moveCursor(value));
        moveCursor(0);
    }, [])

    const moveCursor= (value) => {
        const { x, y } = properties.getPointAtLength(lineLength - value);
        cursor2.current.setNativeProps({ cy: y - cursorRadius + 7, cx: x - cursorRadius +10 });
        lineRef.current.setNativeProps ({x1 : x - cursorRadius+10,x2 : x - cursorRadius+10, y1 : y + cursorRadius/2, y2 : height});
        var index = controlla (scaleX.invert (x),arr);
        if (index)
        {
            setProssimita (true);
            var i = index;
        }
        else
        {
            setProssimita (false);
            var i = 0;
        }
        const votoText = arr [i] ['y'].toFixed(2);
        const dataMobile =   arr [i] ['x'].getDate() + " " + converti (data [i] ['x'].getMonth());
        const votiAggiunti = aggiungiVotiFisarmonica (scaleX.invert (x), data);
        setTitleF (dataMobile)
        votoLabel.current.setNativeProps ({text : `Media ${votoText}`});
        dataLabel.current.setNativeProps ({text : `${dataMobile}`});
        fisarmonica.current.setNativeProps ({text : votiAggiunti});
    }
    
    const translateX = x.interpolate({
       inputRange: [0, lineLength],
       outputRange: [width - labelWidth, 0],
       extrapolate: 'clamp',
    });

    return (
        <View style={styles.container}>
            <View style={styles.grafico}>
                <Svg {...{ width, height }}>
                    <Defs>
                        <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="0">
                            <Stop offset="100%" stopColor="#265CDE" stopOpacity="0.2" />
                            <Stop offset="50%" stopColor="#265CDE" stopOpacity="0.2" />
                        </LinearGradient>
                    </Defs>
                    <Path d={line} fill="transparent" stroke="#367be2" strokeWidth={2} />
                    <Path d={`${line} L ${width} ${height} L 0 ${height}`} fill="url(#grad)" />
                    <Line ref = {lineRef} stroke = "white" strokeDasharray="2, 2"/>
                    {cerchi.map (
                    i => 
                    <Circle cx={i.cx} cy={i.cy} r={i.r} fill="white" stroke = "#367be2"/>)
                    }
                    <Circle ref ={cursor2} r = {8} fill="white" stroke="#367be2" strokeWidth="2"/>
                </Svg>
                {prossimita ?
                    <Animated.View style={[styles.widgetMobile, { transform: [{ translateX }] }]}>
                        <TextInput ref = {votoLabel} style={{color: 'white',fontWeight: '700'}}/>
                        <TextInput ref = {dataLabel} style={{color: 'white',fontWeight: '700'}}/>
                    </Animated.View>
                    :
                    <Animated.View style={[styles.widgetMobile2, { transform: [{ translateX }] }]}>
                        <TextInput ref = {votoLabel} style={{display : 'none'}}/>
                        <TextInput ref = {dataLabel} style={{display : 'none'}}/>
                    </Animated.View>
                }
            </View>
            
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
            {<AccordionListItem title= {titleF}> 
                {
                    prossimita ? 
                        <TextInput multiline = {true} ref = {fisarmonica} />
                    :
                        <TextInput ref = {fisarmonica} />
                }
            </AccordionListItem>}
        </View>
    );
}
    


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10
    },
    grafico: {
        borderRadius: 20,
        backgroundColor: 'white',
        overflow: 'hidden'
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
        top: 15,
        left: -10,
        backgroundColor: '#3A4475',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#265CDE',
        width: labelWidth,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
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

export default GraficoP;