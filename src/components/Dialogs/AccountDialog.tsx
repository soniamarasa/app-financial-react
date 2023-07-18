import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { ColorPicker } from 'primereact/colorpicker';
import './Dialog.scss';

import { useToastContext } from '../../contexts/ToastContext';
import { newAccount, updateAccount } from '../../services/accounts-api';
import { IAccount } from '../../interfaces/IAccount';
import { AccountContext } from '../../contexts/AccountContext';
import { ThemeContext } from '../../contexts/ThemeContext';

export interface Props {
  visible: boolean;
  onHide: any;
  account?: IAccount;
}

export function AccountDialog(props: Props) {
  const { theme } = React.useContext(ThemeContext) || {};
  const { showToast } = useToastContext();
  const { setAccounts } = React.useContext(AccountContext);

  const [formData, setFormData] = useState({});
  const defaultValues = {
    name: '',
    currentBalance: 0,
    color: 'EE7863',
    type: { name: 'Conta corrente', icon: 'fa-solid fa-building-columns' },
  };

  const required = 'Campo obrigatório!';

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const getFormErrorMessage = (name: any) => {
    return (
      errors[name as keyof typeof defaultValues] && (
        <small className="p-error">
          {errors[name as keyof typeof defaultValues]?.message}
        </small>
      )
    );
  };

  const accountTypes = [
    { name: 'Conta corrente', icon: 'fa-solid fa-building-columns' },
    { name: 'Poupança', icon: 'fa-solid fa-sack-dollar' },
    { name: 'Dinheiro', icon: 'fa-solid fa-money-bill' },
    { name: 'Investimento', icon: 'fa-solid fa-arrow-trend-up' },
    { name: 'Outros', icon: 'fa-solid fa-ellipsis' },
  ];

  const onSubmit = async (data: IAccount) => {
    setFormData(data);
    const response =
      props.account && Object.keys(props.account).length
        ? await updateAccount({
            ...props.account,
            ...data,
          })
        : await newAccount({
            ...data,
          });

    if (response?.status === 200) {
      if (props.account && Object.keys(props.account).length) {
        setAccounts((old: IAccount[]) => {
          let accounts: IAccount[] = [];
          old.forEach((item: IAccount) => {
            if (item._id === response.data.account._id) {
              accounts.push(response.data.account);
            } else accounts.push(item);
          });
          return accounts;
        });
      } else {
        setAccounts((old) => {
          return [...old, response.data.account];
        });
      }
      showToast('success', response.data.message);
      props.onHide(false);
    } else {
      showToast('error', response.data.message);
    }
  };

  const setProps = React.useCallback((account?: IAccount) => {}, []);

  useEffect(() => {
    if (props.account && Object.keys(props.account).length)
      setProps(props.account);
    else setProps();
  }, [props.account, setProps]);

  return (
    <Dialog

      header={props.account?._id ? 'Editar conta' : 'Nova conta'}
      visible={props.visible}
      style={{ width: '400px' }}
      onHide={() => props.onHide(false)}
      appendTo="self"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="account-form">
        <div className="grid div-fields">
          <div className="div-field col-12">
            <label
              htmlFor="name"
              className={classNames({ 'p-error': errors.name })}
            >
              Instituição Financeira | Nome
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
        </div>
        <div className="grid">
          <div className="div-field col-12 sm:col-8">
            <label
              htmlFor="currentBalance"
              className={classNames({ 'p-error': errors.currentBalance })}
            >
              Saldo Atual
            </label>

            <Controller
              name="currentBalance"
              control={control}
              rules={{ required: required }}
              render={({ field, fieldState }) => (
                <InputNumber
                  id={field.name}
                  ref={field.ref}
                  value={field.value}
                  onBlur={field.onBlur}
                  onValueChange={(e: any) => field.onChange(e.value)}
                  mode="currency"
                  currency="BRL"
                  locale="pt-BR"
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            {getFormErrorMessage('currentBalance')}
          </div>
          <div className="input-color col-12 sm:col-4">
            <label
              htmlFor="color"
              className={classNames({ 'p-error': errors.color })}
            >
              Cor
            </label>

            <Controller
              name="color"
              control={control}
              rules={{ required: required }}
              render={({ field }) => (
                <ColorPicker
                  className=""
                  id={field.name}
                  value={field.value}
                  onChange={(e: any) => field.onChange(e.value)}
                ></ColorPicker>
              )}
            />
            {getFormErrorMessage('color')}
          </div>
        </div>

        <div className="grid">
          <div className="div-field col-12">
            <label
              htmlFor="gender"
              className={classNames({ 'p-error': errors.type })}
            >
              Tipo
            </label>

            <Controller
              name="type"
              control={control}
              rules={{ required: required }}
              render={({ field, fieldState }) => (
                <Dropdown
                appendTo={null}
                  id={field.name}
                  value={field?.value}
                  options={accountTypes}
                  optionLabel="name"
                  placeholder="Selecione..."
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                  onChange={(e) => field.onChange(e.value)}
                />
              )}
            />
            {getFormErrorMessage('type')}
          </div>
        </div>

        <div className='p-dialog-footer'>
          <Button type="submit" rounded label="Salvar" />
        </div>
      </form>
    </Dialog>
  );
}
