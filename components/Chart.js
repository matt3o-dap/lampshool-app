// @flow
import React from 'react';
import {
  StyleSheet, View, SafeAreaView, Dimensions, Animated, TextInput,Text
} from 'react-native';
import {Svg,Path, Defs, Line,Stop, LinearGradient} from 'react-native-svg';
import * as path from 'svg-path-properties';
import * as shape from 'd3-shape';
import {SCREEN_WIDTH} from './helper';

import {
  scaleTime,
  scaleLinear,
  scaleQuantile,
} from 'd3-scale';

const d3 = {
  shape,
};

const height = 200;
const width = SCREEN_WIDTH - 30;
const verticalPadding = 5;
const cursorRadius = 10;
const labelWidth = 100;

const data = [
  { x: new Date(2018, 9, 1), y: 0 },
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
const scaleLabel = scaleQuantile().domain([0, 10]).range([0,1, 2,3,4,5,6,7,8,9,10]);
const scaleLabel2 = scaleQuantile().domain([0, 10]).range(["Aug 1", "Dec 1", "Aug 2", "Aug 1", "Dec 1", "Aug 2","Aug 1", "Dec 1", "Aug 2", "Aug 1", "Dec 1"]);
const line = d3.shape.line()
  .x(d => scaleX(d.x))
  .y(d => scaleY(d.y))
  .curve(d3.shape.curveBasis)(data);
const properties = path.svgPathProperties(line);
const lineLength = properties.getTotalLength();

export default class App extends React.Component {
  cursor = React.createRef();
  line = React.createRef ();

  label = React.createRef();
  label2 = React.createRef();

  state = {
    x: new Animated.Value(0),
  };

  moveCursor(value) {
    const { x, y } = properties.getPointAtLength(lineLength - value);
    this.cursor.current.setNativeProps({ top: y - cursorRadius, left: x - cursorRadius });
    this.line.current.setNativeProps({ x1 : x - cursorRadius+10,  x2 : x - cursorRadius+10, y1 : y + cursorRadius/2, y2 : height }); 
    const label = scaleLabel(scaleY.invert(y));
    const label2 = scaleLabel2(scaleY.invert(y));
    this.label.current.setNativeProps({ text: `Media ${label}` });
    this.label2.current.setNativeProps({ text: `Giorno ${label2}` });
  }

  componentDidMount() {
    this.state.x.addListener(({ value }) => this.moveCursor(value));
    this.moveCursor(0);
  }

  render() {
    const { x } = this.state;
    const translateX = x.interpolate({
      inputRange: [0, lineLength],
      outputRange: [width - labelWidth, 0],
      extrapolate: 'clamp',
    });
    
    return (
      <View style = {styles.principale}>
      <SafeAreaView style={styles.root}>
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
            <Line ref = {this.line} stroke = "white" strokeDasharray="2, 2"/>
            <View ref={this.cursor} style={styles.cursor} />
          </Svg>
          <Animated.View style={[styles.label, { transform: [{ translateX }] }]}>
            <TextInput ref={this.label} />
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
      </SafeAreaView>
      </View>
      
    );
  }
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
  label: {
    position: 'absolute',
    top: -45,
    left: 0,
    backgroundColor: 'lightgray',
    width: labelWidth,
  },
  containerColonna: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' // if you want to fill rows left to right
  },
  item: {
    width: '50%' // is 50% of container width
  }
});
