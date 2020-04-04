import React, { useState } from 'react';
import {FiArrowLeft} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';

import Logo from '../../assets/logo.svg';

import '../NewIncident/style.css';
import api  from '../../services/api';

function NewIncident(){
    const history = useHistory();

    const[title, setTitle] = useState('');
    const[description, setdescription] = useState('');
    const[value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value
        }
        try{
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            });
            alert('Cadastro efetuado com sucesso.')
            history.push('/profile');
        }catch{
            alert('Cadastro efetuado com sucesso.')
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={Logo} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>
                        Desccreva o caso detalhadamente para encontrar um herói para resolver isso.
                    </p>
                    <Link to="/profile" className="back-link">
                    <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para Home.
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título do caso"/>
                    <textarea value={description} onChange={e => setdescription(e.target.value)} placeholder="Descrição"/>
                    <input value={value} onChange={e => setValue(e.target.value)} placeholder="Valor em reais"/>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default NewIncident;