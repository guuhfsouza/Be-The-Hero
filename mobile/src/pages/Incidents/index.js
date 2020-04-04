import React, {useEffect, useState} from 'react';
import {View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import {Feather} from '@expo/vector-icons';

import api from '../../services/api';

import Logo from '../../assets/logo.png';

import styles from './styles';

function Incidents(){
    const [ incidents, setIncidents]= useState([]);
    const [ totals, setTotals]= useState(0);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    async function loadIncidents(){
        if(loading){
            return;
        }
        if(totals > 0 && incidents.length === totals){
            return;
        }
        setLoading(true);    
        console.log(page);
        const response = await api.get('incidents',{
            params: page
        });
        console.log(response.data);
        setIncidents([...incidents, ...response.data]);
        setTotals(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []) 

    const navigation = useNavigation();

    function navigationToDetail( incident ){
        navigation.navigate('Details', {incident});
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={ Logo }/>
                <Text stye={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{totals} casos.</Text>
                </Text>
            </View> 

            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList style={styles.incidentList}
             data={incidents} 
             keyExtractor={incident => String(incident.id)}
             onEndReached={() => loadIncidents()}
             onEndReachedThreshold={0.2}
             showsHorizontalScrollIndicator={false}
             renderItem={({item: incident}) =>(   
                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>

                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue} >
                        {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}
                    </Text>

                    <TouchableOpacity style={styles.detailsButton} onPress={() => navigationToDetail(incident)}>
                        <Text style={styles.buttonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#e02041"></Feather>
                    </TouchableOpacity>
            </View>
            )}
            />

        </View>
    );
}


export default Incidents;