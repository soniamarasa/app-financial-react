import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import './Auth.scss';
import ImgAuth from '../../assets/svg-auth.svg';
import Logo from '../../assets/icon.png';
import { login } from '../../services/user-api';
import { setLocalStorage } from '../../helpers/LocalStorage';
import { RecoveryDialog } from '../../components/Dialogs/RecoveryDialog';

export const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleSubmit = async () => {
    const user = { email, password };

    const response = await login(user);

    if (response?.status === 200) {
      let auth = {
        isAuthenticated: true,
        user: response.data.user,
      };

      setLocalStorage('auth', auth);
      setLocalStorage('userId', auth.user.id);

      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  };

  return (
    <div className="grid auth-container">
      <div className="img-auth-container col-12  md:col-5 lg:col-6">
        <img src={ImgAuth} alt="" />
      </div>
      <div className="login-container col-12  md:col-7 lg:col-6">
        <div className="login">
          <h2> LOGIN </h2>

          <div className="card input-01">
            <label>E-mail</label>
            <InputText
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="card input-01">
            <label>Senha</label>
            <Password
              toggleMask
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              feedback={false}
            />
            <small onClick={() => setDialogVisible(true)}>
              Esqueci a minha senha
            </small>
          </div>

          <div>
            <Button
              disabled={!password || !email}
              onClick={() => handleSubmit()}
              rounded
              label="Entrar"
            />
          </div>
        </div>

        <div className="sign-up">
          <span>Ainda não tem uma conta?</span>
          <a onClick={() => navigate('/signup')}>Cadastre-se</a>
        </div>
      </div>

      <RecoveryDialog visible={dialogVisible} onHide={setDialogVisible} />
    </div>
  );
};
