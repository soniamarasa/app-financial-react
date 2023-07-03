import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import './SignUp.scss';
import Logo from '../../assets/icon.png';

export const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string | Date | Date[] | null>();
  const [gender, setGender] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  const genders = [
    { name: 'Feminino', code: 'female' },
    { name: 'Masculino', code: 'male' },
  ];

  return (
    <div className="grid sign-up-container">
      <div className="logo-container col-12">
        <img src={Logo} alt="" />
      </div>
      <div className="sign-up col-12  lg:col-8">
        <h2> CADASTRO </h2>

        <div className="grid">
          <div className="card input-01 col-12 md:col-6">
            <label>Nome</label>
            <InputText
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
          </div>
          <div className="card input-01 col-12 md:col-6">
            <label>Usuário</label>
            <InputText
              value={userName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserName(e.target.value)
              }
            />
          </div>
        </div>
        <div className="grid">
          <div className="card input-01 col-12 sm:col-12 md:col-5">
            <label>E-mail</label>
            <InputText
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>
          <div className="card input-01 col-12 sm:col-6 md:col-3">
            <label>Genero</label>
            <Dropdown
              value={gender}
              onChange={(e) => setGender(e.value)}
              options={genders}
              optionLabel="name"
              placeholder="Selecione..."
            />
          </div>
          <div className="card input-01 col-12 sm:col-6 md:col-4">
            <label>Data Nasc.</label>
            <Calendar
              value={birthdate}
              onChange={(e: CalendarChangeEvent) => setBirthdate(e.value)}
              showIcon
            />
          </div>
        </div>
        <div className="grid">
          <div className="card input-01 col-12 md:col-6 ">
            <label>Senha</label>
            <Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              promptLabel="Choose a password"
              weakLabel="Senha fraca"
              mediumLabel="Senha média"
              strongLabel="Senha forte"
              toggleMask
            />
          </div>
          <div className="card input-01 col-12 md:col-6 ">
            <label>Confirme a senha</label>

            <Password
              value={passwordConfirm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPasswordConfirm(e.target.value)
              }
              feedback={true}
              toggleMask
            />
          </div>
        </div>

        <div>
          <Button rounded label="Entrar" />
        </div>
      </div>
    </div>
  );
};
