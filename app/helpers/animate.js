import * as React from 'react';
import {Animated, Easing} from 'react-native';

export class SlideUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.animate, {
      toValue: 1,
      duration: 350,
      easing: Easing.elastic(0.4),
      useNativeDriver: true,
    }).start();
  }

  render() {
    const {animate} = this.state;
    const {vfrom, vto, style} = this.props;
    const slideUp = animate.interpolate({
      inputRange: [0, 1],
      outputRange: [vfrom, vto],
    });
    return (
      <Animated.View
        style={[
          style,
          {
            transform: [
              {
                translateY: slideUp,
              },
            ],
          },
        ]}>
        {this.props.children}
      </Animated.View>
    );
  }
}
