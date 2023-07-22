import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import { Divider } from 'primereact/divider';


import { IAccount } from '../../../interfaces/IAccount';
import { formatNumber } from '../../../helpers/formatNumber';

import { Card } from 'primereact/card';

export const AccountCard = ({
  accountData,
  index,
}: {
  accountData: IAccount;
  index: number;
}) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const items = [
    {
      label: 'Editar',
      command: () => {},
    },
    {
      label: 'Transações',
      command: () => {},
    },
    {
      label: 'Rejuste de Saldo',
      command: () => {},
    },
  ];


  return (
    <Card className='account-card' onClick={() => console.log('oi')}>
      <h2>
        <span>
          {' '}
          <i
            style={{ color: '#' + accountData.color }}
            className={accountData.type.icon}
          ></i>{' '}
          {accountData.name}
        </span> 
        <SplitButton dropdownIcon="fa-solid fa-ellipsis" appendTo="self" model={items} text />
      </h2>
      <p className="balance-container">
        <strong>Saldo Atual:</strong>{' '}
        <span
          className={
            accountData?.currentBalance >= 0 ? 'pos-balance' : 'neg-balance'
          }
        >
          {formatNumber(accountData.currentBalance)}{' '}
        </span>
      </p>
      <p className="balance-container">
        <strong>Saldo Previsto:</strong>{' '}
        <span
          className={
            accountData?.forecastBalance >= 0 ? 'pos-balance' : 'neg-balance'
          }
        >
          {formatNumber(
            accountData.forecastBalance ? accountData.forecastBalance : 0
          )}{' '}
        </span>
      </p>
      <Divider></Divider>
      <div className="p-card-footer">
        <Button label="Adicionar despesa" text />
      </div>
    </Card>
  );
};
