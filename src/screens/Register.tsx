import { useState } from 'react';
import { HStack, VStack } from 'native-base';
import {Alert} from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Register() {
  const [isLoading, setIsLoading ] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');
  
  const navigation = useNavigation();

  function handleNewOrderRegister() {
    if(!patrimony || !description ) {
      return Alert.alert('Registrar', 'Preencha todos os campos.')
    }

    setIsLoading(true);

    firestore()
      .collection('orders') // vai na coleção de ordens e adiciona 
      .add({
        patrimony,
        description,
        status: 'open',
        created_at: firestore.FieldValue.serverTimestamp() //quando a solicitação foi enviada
      })
      .then(() => {
        Alert.alert('Solicitação', 'Solicitação registrada com sucesso')
        navigation.goBack();//volta para a tela do usuário
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        return Alert.alert('Solicitação', 'Não foi possível registrar o pedido')

      })
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
        <Header title='Solicitação'/>

        <Input
            placeholder='Número do patrimônio'
            mt={4}
            onChangeText={setPatrimony}
        />
        <Input
        placeholder='Descrição do problema'
        mt={5}
        flex={1}
        multiline
        textAlignVertical='top'
        onChangeText={setDescription}
        />
        <Button
            title='Cadastrar'
            mt={5}
            isLoading={isLoading}
            onPress={handleNewOrderRegister}
        />
    </VStack>
  );
}