import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';

import '../Profile/style.css'

import Logo from '../../assets/logo.svg';

import api  from '../../services/api';

function Profile(){
    const [incidents, setIncidents] = useState([]);
    
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('profile', {
            headers:{ 
                Authorization: ongId,
        }
    }).then( response => {
        setIncidents(response.data);
    })
    }, [ongId]); //[são os parametros para execução do useEffect. Quando vazia, é chamada uma unica vez. 
    //Quando contem, sempre que alterado o valor do parametro e chamado].

    async function handledeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }    
            });
            setIncidents(incidents.filter(incidents => incidents.id !== id)); //mantem no meu estado apenas 
                                                                              // os incidents com id diferente do que eu deletei no momento      
        }
        catch(err){
            alert('Falha ao remover o caso, tente novamente.');
        }
        console.log(ongId);
        console.log(id);
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={Logo} alt="Be To Hero"/>
                <span>Bem vinda, {ongName}</span>
                <Link className='button' to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041"></FiPower>
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul> {/* estrutura usada para lista <ul> com <li> interna*/}
                {incidents.map(incidents => ( //.map vai percorrer o array populado com o response. 
                        <li key={incidents.id}> {/*sempre que existe um foreach, map, é necessário o key no primeiro item 
                                                para ajudar o react a identificar o item a ser removido, alterado*/}
                            <strong>Caso:</strong>
                            <p>{incidents.title}</p>
        
                            <strong>Descrição:</strong>
                            <p>{incidents.description}</p>
        
                            <strong>Valor:</strong>
                            <p>{Intl.NumberFormat('pt-BR', 
                            {style: 'currency', currency: 'BRL'}).format(incidents.value)}</p>
        
                            <button type="button" onClick={() => handledeleteIncident(incidents.id)}>
                                <FiTrash2 size={20} color="a8a8b3"></FiTrash2>
                            </button>
                        </li>   
                        )
                    )
                }
            </ul>
        </div>
    );
}


export default Profile;