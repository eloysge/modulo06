/**
 * dependencia de icones:
 * yarn add react-native-vector-icons
 *
 * link:
 * react-native link react-native-vector-icons
 *
 * axios:
 * yarn add axios
 *
 * local storage:
 * yarn add @react-native-community/async-storage
 * react-native link @react-native-community/async-storage
 */

import React, { Component } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
import {
  Container,
  Form,
  Input,
  SubmitButton,
  ClearButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

export default class Main extends Component {
  state = {
    newUser: '',
    users: [],
    loading: false,
    empty: true,
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');
    if (users) {
      this.setState({ users: JSON.parse(users), empty: false });
    }
  }

  // (propState, prevState) propriedades atual e anterior
  async componentDidUpdate(_, prevState) {
    const { users } = this.state;
    if (prevState.users !== users) {
      await AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    const { users, newUser } = this.state;
    if (users.find(user => user.login === newUser)) {
      return;
    }

    this.setState({
      loading: true,
    });
    const response = await api.get(`/users/${newUser}`);
    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    this.setState({
      newUser: '',
      users: [...users, data],
      loading: false,
      empty: false,
    });

    Keyboard.dismiss();
  };

  handleClearAll = async () => {
    await AsyncStorage.removeItem('users');
    this.setState({
      empty: true,
      users: [],
    });
  };

  render() {
    const { users, newUser, loading, empty } = this.state;
    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome do usuário"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Icon name="account-box" size={20} color="#FFF" />
            )}
          </SubmitButton>
          <ClearButton empty={empty} onPress={this.handleClearAll}>
            <Icon name="clear" size={20} color="#FFF" />
          </ClearButton>
        </Form>
        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>
              <ProfileButton onPress={() => {}}>
                <ProfileButtonText>ver perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}

Main.navigationOptions = {
  title: 'Sge Informática',
};
