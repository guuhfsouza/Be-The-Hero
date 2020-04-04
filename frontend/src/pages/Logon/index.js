import React, {useState} from 'react';
import {FiLogIn} from 'react-icons/fi';
import {Link, useHistory} from  'react-router-dom';

import './style.css';

import HeroIms from '../../assets/heroes.png';
import Logo from '../../assets/logo.svg';

import api  from '../../services/api';

function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();
    
    async function hendleLogin(e){
        e.preventDefault();
        try{
            const response = await api.post('sessions', {id});

            localStorage.setItem('ongId', id); //salva os dados no storage do navegador
            localStorage.setItem('ongName', response.data.name) //salva os dados no storage do navegador
            history.push('profile');
        }
        catch (err){
            alert('Falha ao autenticar, tente mais tarde');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={Logo} alt="Logo"></img>
                <form onSubmit={hendleLogin}>
                    <h1> Faça seu Login</h1>
                    <input placeholder="Sua ID" 
                    value={id} onChange={e => setId(e.target.value)}/>
                    
                    <button className="button" type="submit">Entrar</button>
                    
                    <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro.
                    </Link>
                </form>
            </section>

            <img src={HeroIms} alt="Heroes"></img>
        </div>
    );
}


export default Logon;