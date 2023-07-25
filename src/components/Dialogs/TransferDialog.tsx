import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import './Dialog.scss';
import { useToastContext } from '../../contexts/ToastContext';
import { TransactionContext } from '../../contexts/TransactionContext';
import { ITransaction } from '../../interfaces/ITransaction';
import { IAccount } from '../../interfaces/IAccount';
import {
  newTransaction,
  updateTransaction,
} from '../../services/transactions-api';
import { getAccounts } from '../../services/accounts-api';

export interface Props {
  visible: boolean;
  onHide: any;
  transfer?: ITransaction;
  loadReports: () => void;
}

export function TransferDialog(props: Props) {
  const { showToast } = useToastContext();
  const { setTransactions } = React.useContext(TransactionContext);
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({});
  const defaultValues = {} as ITransaction;

  const required = 'Campo obrigatório!';

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
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

  const onSubmit = async (data: ITransaction) => {
    setFormData(data);
    const response =
      props.transfer && Object.keys(props.transfer).length
        ? await updateTransaction({
            ...props.transfer,
            ...data,
          })
        : await newTransaction(data);

    if (response?.status === 200) {
      if (props.transfer && Object.keys(props.transfer).length) {
        setTransactions((old: ITransaction[]) => {
          let transfers: ITransaction[] = [];
          old.forEach((item: ITransaction) => {
            if (item._id === response.data.transfer._id) {
              transfers.push(response.data.transfer);
            } else transfers.push(item);
          });
          return transfers;
        });
      } else {
        setTransactions((old) => {
          return [...old, response.data.transfer];
        });
      }
      showToast('success', response.data.message);
      props.onHide(false);
      props.loadReports();
    } else {
      showToast('error', response.data.message);
    }
  };

  const setProps = React.useCallback((transfer?: ITransaction) => {
    setValue('description', transfer ? transfer.description : 'Transferência');
    setValue('value', transfer ? transfer.value : 0);
    setValue(
      'inputAccount',
      transfer ? transfer.inputAccount : ({} as IAccount)
    );
    setValue(
      'outputAccount',
      transfer ? transfer.outputAccount : ({} as IAccount)
    );
    setValue('date', transfer ? transfer.date : new Date());
    setValue('effected', transfer ? transfer.effected : true);
  }, []);

  const typeTemplate = (option: any, props?: any) => {
    if (option) {
      return (
        <div className="select-type">
          <i className={option.icon}></i>
          <span>{option.name}</span>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  useEffect(() => {
    getAccounts().then(({ data }) => {
      setAccounts(data);
    });
    if (props.transfer && Object.keys(props.transfer).length) {
      setProps(props.transfer);
    } else {
      setProps();
    }
  }, [setAccounts, props.transfer, setProps]);

  return (
    <Dialog
      header={props.transfer?._id ? 'Editar conta' : 'Nova conta'}
      visible={props.visible}
      style={{ width: '400px' }}
      onHide={() => props.onHide(false)}
      appendTo="self"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="transfer-form">
        <div className="grid div-fields">
          <div className="div-field col-12">
            <label
              htmlFor="description"
              className={classNames({ 'p-error': errors.description })}
            >
              Instituição Financeira | Nome
            </label>

            <Controller
              name="description"
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
            {getFormErrorMessage('description')}
          </div>
        </div>
        <div className="grid">
          <div className="div-field col-12 sm:col-10">
            <label
              htmlFor="value"
              className={classNames({ 'p-error': errors.value })}
            >
              Saldo Atual
            </label>

            <Controller
              name="value"
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
            {getFormErrorMessage('value')}
          </div>
          <div className="div-field col-12 sm:col-6">
            <label
              htmlFor="date"
              className={classNames({ 'p-error': errors.date })}
            >
              Data Nasc.
            </label>

            <Controller
              name="date"
              control={control}
              rules={{ required: required }}
              render={({ field }) => (
                <Calendar
                  id={field.name}
                  value={field.value}
                  onChange={(e: any) => field.onChange(e.value)}
                  dateFormat="dd/mm/yy"
                  mask="99/99/9999"
                  showIcon
                />
              )}
            />
            {getFormErrorMessage('date')}
          </div>
        </div>

        <div className="grid ">
          <div className="div-field col-12">
            <label
              htmlFor="outputAccount"
              className={classNames({ 'p-error': errors.outputAccount })}
            >
              Tipo
            </label>

            <Controller
              name="outputAccount"
              control={control}
              rules={{ required: required }}
              render={({ field, fieldState }) => (
                <Dropdown
                  appendTo={document.getElementById('transfer')}
                  id={field.name}
                  value={field?.value}
                  options={accounts}
                  valueTemplate={typeTemplate}
                  itemTemplate={typeTemplate}
                  optionLabel="name"
                  placeholder="Selecione..."
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                  onChange={(e) => field.onChange(e.value)}
                />
              )}
            />
            {getFormErrorMessage('outputAccount')}
          </div>
          <div className="div-field col-12">
            <label
              htmlFor="inputAccount"
              className={classNames({ 'p-error': errors.inputAccount })}
            >
              Tipo
            </label>

            <Controller
              name="inputAccount"
              control={control}
              rules={{ required: required }}
              render={({ field, fieldState }) => (
                <Dropdown
                  appendTo={document.getElementById('transfer')}
                  id={field.name}
                  value={field?.value}
                  options={accounts}
                  valueTemplate={typeTemplate}
                  itemTemplate={typeTemplate}
                  optionLabel="name"
                  placeholder="Selecione..."
                  className={classNames({ 'p-invalid': fieldState.invalid })}
                  onChange={(e) => field.onChange(e.value)}
                />
              )}
            />
            {getFormErrorMessage('inputAccount')}
          </div>
        </div>

        <div className="p-dialog-footer">
          <Button type="submit" rounded label="Salvar" />
        </div>
      </form>
    </Dialog>
  );
}
