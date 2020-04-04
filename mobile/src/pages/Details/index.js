import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute} from '@react-navigation/native'; 
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import  * as MailComposer from 'expo-mail-composer';

import Logo from '../../assets/logo.png';

import styles from './styles';


function Detail(){
    const navigation = useNavigation();
    const route = useRoute();

    const incidents = route.params.incident;
    const message = `Olá ${incidents.name}, estou entrando em contato pois gostaria de ajudar no caso ${incidents.title} com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incidents.value)}.`;

    function navigateBack(){
        navigation.goBack();
    }

    function sendMail(){ //função abre o app do email no seu cel carregando os dados. Verificar uma forma de enviar o email.
        MailComposer.composeAsync({
            subject: `Heroi do caso: ${incidents.title}`,
            recipients: [incidents.email],  
            body: message
        });
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=+55${incidents.whatsapp}&text=${message}`);
    }

    return (
        <View style = {styles.container}>
            <View style={styles.header}>
                <Image source={ Logo }/>

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e02041"/>
                </TouchableOpacity>
            </View>             

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG</Text>
               <Text style={styles.incidentValue}>{incidents.name} de {incidents.city}/{incidents.uf}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incidents.description}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue} >
                        {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incidents.value)}
                    </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato.</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.actionsButton} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionsButton} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}


export default Detail;