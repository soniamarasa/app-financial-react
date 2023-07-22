import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from 'primereact/button';

import { getAccounts } from '../../services/accounts-api';
import { AccountContext } from '../../contexts/AccountContext';
import { IAccount } from '../../interfaces/IAccount';

import { AccountDialog } from '../../components/Dialogs/AccountDialog';
import Loading from '../../components/Loading/Loading';
import './Accounts.scss';
import { Card } from 'primereact/card';
import { AccountCard } from './AccountCard/AccountCard';

import { formatNumber } from '../../helpers/formatNumber';
import { ReportsContext } from '../../contexts/ReportContext';
import { getReports } from '../../services/reports-api';
import { IReport, IReports } from '../../interfaces/IReports';

export const Accounts = () => {
  const { accounts, setAccounts } = React.useContext(AccountContext);
  const { reports, setReports } = React.useContext(ReportsContext);
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

  useEffect(() => {
    getReports().then(({ data }) => {
      console.log(data);
      setReports(data);
    });
  }, [setReports]);

  const reportsFiltered = useMemo(() => {
    return Object.keys(reports).filter(
      (report: string) =>
        reports[report as keyof IReports]._id === 1 ||
        reports[report as keyof IReports]._id === 4
    );
  }, [reports]);

  return (
    <div id="account" className="container-pages account-container">
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
      {!!accounts.length && !loading && (
        <div className="grid account-body ">
          <div className="col-12 md:col-8">
            <div className="grid">
              {accounts.map((account, index) => (
                <div key={index} className="col-12 md:col-6">
                  <AccountCard
                    accountData={account}
                    index={index}
                  ></AccountCard>
                </div>
              ))}
            </div>
          </div>

          <div className="col-12 md:col-4 info-accounts">
            {reportsFiltered.map((report: string, index: number) => (
              <Card key={index}>
                <h4>{reports[report as keyof IReports].name}</h4>
                <h2
                  className={
                    reports[report as keyof IReports].total >= 0
                      ? 'pos-balance'
                      : 'neg-balance'
                  }
                >
                  {formatNumber(reports[report as keyof IReports].total)}
                </h2>
              </Card>
            ))}{' '}
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
