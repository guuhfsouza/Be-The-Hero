import React, {useState} from 'react';
import {Link,  useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import './style.css';

import Logo from '../../assets/logo.svg';

import api  from '../../services/api';

function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        const data = {
            name, email, whatsapp, city, uf
        }

        try{
            const response = await api.post('ongs', data);
            alert('Seu ID de acesso: ' + response.data.id);
            history.push('/');
        }
        catch{
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return(
        <div className='register-container'>
            <div className="content">
                <section>
                    <img src={Logo} alt="Be The Hero"/>
                    <h1>Cadastro </h1>
                    <p>
                        Faça seu cadastro, entre na plataforma e ajude as pessoas a encontrarem os casos da sua ONG 
                    </p>
                    <Link to="/" className="back-link">
                    <FiArrowLeft size={16} color="#E02041"/>
                        Não tenho cadastro.
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input riquered type="text" placeholder="Name" 
                    value={name} onChange={e => setName(e.target.value)}/>

                    <input riquered type="email" placeholder="E-mail" 
                    value={email} onChange={e => setEmail(e.target.value)}/>
                    
                    <input riquered type="text" placeholder="WhatsApp" maxLength="11" minLength="10" 
                    value={whatsapp} onChange={e => setWhatsapp(e.target.value)}/>
                    
                    <div className="input-group">
                        <input riquered placeholder="Cidade" 
                        value={city} onChange={e => setCity(e.target.value)}/>
                        
                        <input riquered placeholder="UF" style={{width:80}} maxLength="2"  
                        value={uf} onChange={e => setUf(e.target.value)}/>
                    </div>
                   
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default Register;