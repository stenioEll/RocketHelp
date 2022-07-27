import { useState, useEffect } from 'react'
import {NavigationContainer} from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

import { SignIn } from '../screens/SignIn';//as duas telas que quero exibir
import { AppRoutes } from './app.routes'; // se tiver logado o user deve vim para cá
import { Loading } from '../components/Loading';

export function Routes(){
    const [loading, setIsLoading] = useState(true); //estado se tá carregando
    const [user, setUser] = useState<FirebaseAuthTypes.User>() //se tá logado aqui teremos a info do user
    
    useEffect(() => {
        const subscriber = auth()
        .onAuthStateChanged(response => {
            setUser(response);
            setIsLoading(false);
        }) //observa se o usuário tá autenticado ou nao

        return subscriber; 
    }, []);

    if(loading) {
        return <Loading/>
    }

    return(
        <NavigationContainer>
            {user ? <AppRoutes/> : <SignIn />}
        </NavigationContainer>
    )
}