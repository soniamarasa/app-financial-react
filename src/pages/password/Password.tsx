import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { classNames } from 'primereact/utils';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

import './Password.scss';
import Logo from '../../assets/icon.png';

import { IUser } from '../../interfaces/IUser';
import { resetPassword } from '../../services/user-api';
import { useToastContext } from '../../contexts/ToastContext';

export const RecoverPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const { showToast } = useToastContext();

  const [formData, setFormData] = useState({});
  const defaultValues = {
    password: '',
    passwordConfirm: '',
  };

  const required = 'Campo obrigatório!';

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = async (data: IUser) => {
    setFormData(data);

    const password = data.password;

    const response =
      password && token ? await resetPassword(password, token) : null;

    if (response?.status === 200) {
      reset();
      setTimeout(() => {
        navigate('/auth');
        showToast('success', response.data.message);
      }, 1000);
    } else {
      showToast('error', response);
    }
  };

  const getFormErrorMessage = (name: any) => {
    return (
      errors[name as keyof typeof defaultValues] && (
        <small className="p-error">
          {errors[name as keyof typeof defaultValues]?.message}
        </small>
      )
    );
  };

  return (
    <div className="new-password-container">
      <div className="logo-container">
        <img className="logo" onClick={() => navigate('/')} src={Logo} alt="" />
        <h3> Budget Tracker </h3>
      </div>

      <div className="grid">
        {' '}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="new-password col-12 sm:col-6 lg:col-3"
        >
          {' '}
          <h2> Nova senha </h2>
          <div className="grid">
            <div className="card input-01 col-12 ">
              <label
                htmlFor="password"
                className={classNames({ 'p-error': errors.password })}
              >
                Senha
              </label>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: required,
                  minLength: {
                    value: 8,
                    message: 'Senha deve ter no mínimo 8 caracteres',
                  },
                }}
                render={({ field, fieldState }) => (
                  <Password
                    id={field.name}
                    {...field}
                    toggleMask
                    className={classNames({ 'p-invalid': fieldState.invalid })}
                    promptLabel="Digite uma senha"
                    weakLabel="Senha fraca"
                    mediumLabel="Senha média"
                    strongLabel="Senha forte"
                  />
                )}
              />
              {getFormErrorMessage('password')}
            </div>
            <div className="card input-01 col-12 ">
              <label
                htmlFor="passwordConfirm"
                className={classNames({ 'p-error': errors.passwordConfirm })}
              >
                Confirme a senha
              </label>

              <Controller
                name="passwordConfirm"
                control={control}
                rules={{
                  required: required,
                  validate: (value) =>
                    value === getValues('password') ||
                    'As senhas digitadas não coincidem',
                }}
                render={({ field, fieldState }) => (
                  <Password
                    id={field.name}
                    {...field}
                    toggleMask
                    className={classNames({ 'p-invalid': fieldState.invalid })}
                    feedback={false}
                  />
                )}
              />
              {getFormErrorMessage('passwordConfirm')}
            </div>
          </div>
          <div>
            <Button type="submit" rounded label="Salvar" />
          </div>
        </form>
      </div>
    </div>
  );
};
