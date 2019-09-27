/**
 * dependencia webview:
 * yarn add react-native-webview
 *
 * link:
 * react-native link react-native-webview
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

// import { Container } from './styles';

export default class MyWeb extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('item').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    return <WebView source={{ uri: item.html_url }} style={{ marginTop: 1 }} />;
  }
}
