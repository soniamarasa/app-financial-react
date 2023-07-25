import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

import { AccountCard } from './AccountCard/AccountCard';
import { AccountDialog } from '../../components/Dialogs/AccountDialog';
import Loading from '../../components/Loading/Loading';
import { ReportsContext } from '../../contexts/ReportContext';
import { AccountContext } from '../../contexts/AccountContext';
import { getReports } from '../../services/reports-api';
import { getAccounts } from '../../services/accounts-api';
import { IReports } from '../../interfaces/IReports';
import { formatNumber } from '../../helpers/formatNumber';
import './Accounts.scss';

export const Accounts = () => {
  const { accounts, setAccounts } = React.useContext(AccountContext);
  const { reports, setReports } = React.useContext(ReportsContext);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadReports = React.useCallback(() => {
    console.log('oi')
    getReports().then(({ data }) => {
      setReports(data);
    });
  }, [setReports]);

  useEffect(() => {
    setLoading(true);
    getAccounts().then(({ data }) => {
      setAccounts(data);
      loadReports();
      setLoading(false);
    });
  }, [setAccounts, loadReports]);

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
            setDialogVisible(true);
          }}
        />
      </div>{' '}
      {!!accounts.length && !loading && (
        <div className="grid account-body ">
          <div className="col-12 md:col-7 lg:col-9">
            <div className="grid">
              {accounts.map((account, index) => (
                <div key={index} className="col-12 lg:col-6">
                  <AccountCard loadReports={loadReports} accountData={account}></AccountCard>
                </div>
              ))}
            </div>
          </div>

          <div className="col-12 md:col-5 lg:col-3 info-accounts">
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
        loadReports={loadReports}
        visible={dialogVisible}
        onHide={setDialogVisible}
      />
    </div>
  );
};
