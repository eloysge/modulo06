import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatarBtn,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    loading: false,
    endPage: false,
    pageNum: 1,
  };

  componentDidMount() {
    this.handleLoadStars();
  }

  handleLoadStars = async () => {
    const { pageNum, stars, endPage } = this.state;
    if (endPage) {
      return;
    }

    this.setState({ loading: true });
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    try {
      const response = await api.get(
        `/users/${user.login}/starred?page=${pageNum}`
      );
      if (response.data.length !== 0) {
        this.setState({
          stars: [...stars, ...response.data],
          pageNum: pageNum + 1,
          loading: false,
        });
      } else {
        this.setState({
          endPage: true,
          loading: false,
        });
      }
    } catch (error) {
      this.setState({
        endPage: true,
        loading: false,
      });
    }
  };

  handlePressItem = item => {
    const { navigation } = this.props;
    navigation.navigate('Web', { item });
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading } = this.state;
    const user = navigation.getParam('user');
    return (
      <Container>
        <Header loading={loading}>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
          {loading && <ActivityIndicator size="small" color="#0000ff" />}
        </Header>

        <Stars
          onEndReached={this.handleLoadStars}
          onEndReachedThreshold={0.2}
          loading={loading}
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatarBtn onPress={() => this.handlePressItem(item)}>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              </OwnerAvatarBtn>
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      </Container>
    );
  }
}
