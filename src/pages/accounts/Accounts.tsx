import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';

import { getAccounts } from '../../services/accounts-api';
import { AccountContext } from '../../contexts/AccountContext';
import { IAccount } from '../../interfaces/IAccount';

import { AccountDialog } from '../../components/Dialogs/AccountDialog';
import Loading from '../../components/Loading/Loading';
import './Accounts.scss';
import { Card } from 'primereact/card';

export const Accounts = () => {
  const { accounts, setAccounts } = React.useContext(AccountContext);
  const [currentAccount, setCurrentAccount] = useState({} as IAccount);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAccounts().then(({ data }) => {
      setLoading(false);
      setAccounts(data);
    });
  }, [setAccounts]);

  return (
    <div className="container-pages account-container">
      <div className="actions">
        <h2>
          <i className="fa-solid fa-account"></i> Contas{' '}
        </h2>

        <Button
          icon="pi pi-plus"
          rounded
          aria-label="Nova Loja"
          tooltip="Nova Loja"
          onClick={() => {
            setCurrentAccount({} as IAccount);
            setDialogVisible(true);
          }}
        />
      </div>{' '}
      {!loading && accounts.length && (
        <div className="account-body grid">
          <div className="col-12 md:col-8 grid ">
            {accounts.map((account, index) => (
              <Card
                className="col-12 md:col-6 lg:col-3"
                onClick={() => console.log('oi')}
                key={index}
              >
                <h2>
                  {' '}
                  <i className={account.type.icon}></i> {account.name}
                </h2>
              </Card>
            ))}
          </div>
          <div className="col-12 md:col-4 grid info-accounts">
            <Card></Card>
          </div>
        </div>
      )}
      {!loading && !accounts.length && <p> Nenhuma conta cadastrada!</p>}
      {loading && <Loading />}
      <AccountDialog
        visible={dialogVisible}
        onHide={setDialogVisible}
        account={currentAccount}
      />
    </div>
  );
};
