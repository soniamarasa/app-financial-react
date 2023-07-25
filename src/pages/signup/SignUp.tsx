import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

import './SignUp.scss';
import Logo from '../../assets/icon.png';
import { IUser } from '../../interfaces/IUser';

import { createAccount } from '../../services/user-api';
import { useToastContext } from '../../contexts/ToastContext';
import { genders } from '../../utils/valueTypes';

export const SignUp = () => {
  const navigate = useNavigate();
  const { showToast } = useToastContext();

  const today = new Date();
  const minDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  const [formData, setFormData] = useState({});
  const defaultValues = {
    name: '',
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
    birthdate: minDate,
    gender: null,
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

    delete data.passwordConfirm;

    const user = {
      ...data,
      username: data?.username?.trim().toLowerCase(),
      gender: data.gender,
    };

    const response = await createAccount(user);

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
    <div className="grid sign-up-container">
      <div className="logo-container col-12">
        <img onClick={() => navigate('/')} src={Logo} alt="" />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sign-up col-12 md:col-10  lg:col-8"
      >
        <h2> CADASTRO </h2>

        <div className="grid">
          <div className="card input-01 col-12 md:col-6">
            <label
              htmlFor="name"
              className={classNames({ 'p-error': errors.name })}
            >
              Nome
            </label>

            <Controller
              name="name"
              control={control}
              rules={{ required: required }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  type="text"
                  autoFocus
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            {getFormErrorMessage('name')}
          </div>

          <div className="card input-01 col-12 md:col-6">
            <label
              htmlFor="email"
              className={classNames({ 'p-error': errors.email })}
            >
              E-mail
            </label>

            <Controller
              name="email"
              control={control}
              rules={{ required: required }}
              render={({ field, fieldState }) => (
                <InputText
                  type="email"
                  id={field.name}
                  {...field}
                  autoFocus
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            {getFormErrorMessage('email')}
          </div>
        </div>
        <div className="grid">
          <div className="card input-01 col-12 sm:col-12 md:col-4">
            <label
              htmlFor="username"
              className={classNames({ 'p-error': errors.username })}
            >
              Usuário
            </label>

            <Controller
              name="username"
              control={control}
              rules={{ required: required }}
              render={({ field, fieldState }) => (
                <InputText
                  maxLength={14}
                  type="text"
                  id={field.name}
                  {...field}
                  autoFocus
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            {getFormErrorMessage('username')}
          </div>
          <div className="card input-01 col-12 sm:col-6 md:col-4">
            <label
              htmlFor="gender"
              className={classNames({ 'p-error': errors.gender })}
            >
              Gênero
            </label>

            <Controller
              name="gender"
              control={control}
              rules={{ required: required }}
              render={({ field, fieldState }) => (
                <Dropdown
                  id={field.name}
                  value={field?.value}
                  options={genders}
                  optionLabel="name"
                  placeholder="Selecione..."
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                  onChange={(e) => field.onChange(e.value)}
                />
              )}
            />
            {getFormErrorMessage('gender')}
          </div>
          <div className="card input-01 col-12 sm:col-6 md:col-4">
            <label
              htmlFor="birthdate"
              className={classNames({ 'p-error': errors.birthdate })}
            >
              Data Nasc.
            </label>

            <Controller
              name="birthdate"
              control={control}
              rules={{ required: required }}
              render={({ field }) => (
                <Calendar
                  id={field.name}
                  value={field.value}
                  onChange={(e: any) => field.onChange(e.value)}
                  maxDate={minDate}
                  dateFormat="dd/mm/yy"
                  mask="99/99/9999"
                  showIcon
                />
                // <InputMask
                //   id={field.name}
                //   value={field.value}
                //   mask="99/99/9999"
                //   placeholder="dd/mm/yyyy"
                //   slotChar="mm/dd/yyyy"
                //   onChange={(e: any) => field.onChange(e.value)}
                // ></InputMask>
              )}
            />
            {getFormErrorMessage('birthdate')}
          </div>
        </div>
        <div className="grid">
          <div className="card input-01 col-12 md:col-6 ">
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
          <div className="card input-01 col-12 md:col-6 ">
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
                  value === getValues('password') || 'As senhas não coincidem',
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
  );
};
