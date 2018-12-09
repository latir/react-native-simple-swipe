import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, PanResponder, Animated, View, StyleSheet, TouchableOpacity, Easing } from 'react-native';
import { BORDER_COLOUR_TABLE, BACKGROUND_COLOUR_LIGHT, TEXT_COLOUR_PRIMARY } from '../../config/theme';

const propTypes = {
  children: PropTypes.shape().isRequired,
  swipeButtonOnPress: PropTypes.func.isRequired,
  swipeButtonText: PropTypes.string,
  reference: PropTypes.func,
  disabled: PropTypes.bool,
  styles: PropTypes.shape()
};

const defaultProps = {
  swipeButtonText: 'Clear',
  disabled: false,
  styles: {},
  reference: null
};

class SwipeToClear extends Component {
  constructor(props) {
    super(props);
    this.scrollViewEnabled = true;

    const position = new Animated.ValueXY({ x: -200, y: 0 });

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onPanResponderTerminationRequest: () => false,
      onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderRelease
    });

    this.panResponder = panResponder;

    this.state = {
      buttonWidth: 0,
      swipeOpen: false,
      position
    };
  }

  componentDidMount() {
    if (this.props.swipeButtonOnPress) {
      this.triggerSwipePeak();
    }
  }

  onMoveShouldSetPanResponder = (evt, gestureState) => gestureState.dx < -5 || gestureState.dx > 5;

  onPanResponderMove = (evt, gestureState) => {
    if (this.props.disabled) return;

    const { swipeOpen, buttonWidth, position } = this.state;
    const newX = gestureState.dx;

    if (gestureState.dx < 0 && !swipeOpen) {
      position.setValue({ x: newX, y: 0 });
    } else if (swipeOpen) {
      position.setValue({ x: -buttonWidth + newX, y: 0 });
    }
  };

  onPanResponderRelease = (evt, gestureState) => {
    if (this.props.disabled) return;

    const { swipeOpen, buttonWidth } = this.state;

    if (gestureState.dx > (swipeOpen ? buttonWidth : -buttonWidth) / 2) {
      this.animatePosition(0, () => this.setState({ swipeOpen: false }));
    } else {
      this.animatePosition(-buttonWidth, () => this.setState({ swipeOpen: true }));
    }
  };

  animatePosition = (x, callback) =>
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: 150,
      easing: Easing.linear
    }).start(callback);

  triggerSwipePeak = () => {
    Animated.sequence([
      Animated.delay(400),
      Animated.timing(this.state.position, {
        toValue: { x: 0, y: 0 },
        duration: 1200,
        easing: Easing.inOut(Easing.exp)
      })
    ]).start();
  };

  closeSwipe = () => {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 },
      duration: 400
    }).start(() => {
      this.setState({ swipeOpen: false });
    });
  };

  setButtonWidth = event => this.setState({ buttonWidth: event.nativeEvent.layout.width });

  render() {
    const { disabled, children, styles, swipeButtonOnPress, swipeButtonText } = this.props;
    const { swipeOpen, position } = this.state;

    const swipeStyle = {
      left: disabled
        ? 0
        : position.x.interpolate({
            inputRange: [-this.state.buttonWidth, 0],
            outputRange: [-this.state.buttonWidth, 0],
            extrapolate: 'clamp'
          })
    };

    return (
      <View style={[defaultStyles.swipeableWidgetContainer, styles.swipeableWidgetContainer]}>
        <TouchableOpacity onPress={swipeButtonOnPress} activeOpacity={0.9} style={[defaultStyles.swipeButtonContainer, styles.swipeButtonContainer]}>
          <View onLayout={this.setButtonWidth} style={[defaultStyles.swipeButton, styles.swipeButton]}>
            <Text style={[defaultStyles.buttonText, styles.buttonText]}>{swipeButtonText}</Text>
          </View>
        </TouchableOpacity>
        <Animated.View style={[defaultStyles.childrenContainer, styles.childrenContainer, swipeStyle]} {...this.panResponder.panHandlers}>
          {children}
          {swipeOpen && <TouchableOpacity onPress={this.closeSwipe} style={defaultStyles.noInteractionOverlay} />}
        </Animated.View>
      </View>
    );
  }
}

const defaultStyles = StyleSheet.create({
  noInteractionOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  swipeableWidgetContainer: {
    margin: 15,
    marginLeft: -15,
    borderTopRightRadius: 4,
    overflow: 'hidden',
    borderBottomRightRadius: 4
  },
  childrenContainer: {
    marginLeft: 30,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    overflow: 'hidden'
  },
  swipeButtonContainer: {
    height: '100%',
    maxWidth: '75%',
    minWidth: '33%',
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4
  },
  swipeButton: {
    backgroundColor: BACKGROUND_COLOUR_LIGHT,
    borderLeftColor: BORDER_COLOUR_TABLE,
    borderLeftWidth: 1,
    height: '100%',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#000000',
    fontSize: 16
  }
});

SwipeToClear.propTypes = propTypes;
SwipeToClear.defaultProps = defaultProps;

export default SwipeToClear;
