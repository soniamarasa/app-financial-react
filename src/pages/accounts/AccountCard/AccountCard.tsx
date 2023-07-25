import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import { Divider } from 'primereact/divider';

import { IAccount } from '../../../interfaces/IAccount';
import { formatNumber } from '../../../helpers/formatNumber';

import { Card } from 'primereact/card';
import { AccountDialog } from '../../../components/Dialogs/AccountDialog';

export const AccountCard = ({
  accountData,
  loadReports,
}: {
  accountData: IAccount;
  loadReports: () => void;
}) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [currentAccount, setCurrentAccount] = useState({} as IAccount);
  const items = [
    {
      label: 'Editar',
      command: () => {
        setCurrentAccount(accountData);
        setDialogVisible(true);
      },
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

  const handleSetAccount = (account: IAccount) => {
    setCurrentAccount(account);
  };

  return (
    <>
      {' '}
      <Card className="account-card">
        <h2>
          <span>
            {' '}
            <i
              style={{ color: '#' + accountData.color }}
              className={accountData.type.icon}
            ></i>{' '}
            {accountData.name}
          </span>
          <SplitButton
            onClick={() => handleSetAccount(accountData)}
            dropdownIcon="fa-solid fa-ellipsis"
            appendTo="self"
            model={items}
            text
          />
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
      </Card>{' '}
      <AccountDialog
        loadReports={loadReports}
        visible={dialogVisible}
        onHide={setDialogVisible}
        account={currentAccount}
      />
    </>
  );
};
