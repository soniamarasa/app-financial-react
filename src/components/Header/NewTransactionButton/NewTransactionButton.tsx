import React, { ReactElement, useRef, useState } from 'react';
import { MenuItem } from 'primereact/menuitem';
import { TieredMenu } from 'primereact/tieredmenu';
import { Button } from 'primereact/button';
import { ExpenseDialog } from '../../Dialogs/ExpenseDialog';
import { TransferDialog } from '../../Dialogs/TransferDialog';
import { IncomeDialog } from '../../Dialogs/IncomeDialog';
import { ExpenseCardDialog } from '../../Dialogs/ExpenseCardDialog';

export function NewTransactionButton() {
  const menu = useRef<TieredMenu>(null);

  const [transactionDialogVisible, setTransactionDialogVisible] =
    useState(false);
  const [incomeDialogVisible, setIncomeDialogVisible] = useState(false);
  const [expenseDialogVisible, setExpenseDialogVisible] = useState(false);
  const [expenseCardDialogVisible, setExpenseCardDialogVisible] =
    useState(false);

  const items: MenuItem[] = [
    {
      label: 'Receita',
      className: 'revenue-menu',
      icon: 'pi pi-angle-double-up',
      command: () => {
        setIncomeDialogVisible(true);
      },
    },
    {
      label: 'Despesa',
      className: 'expense-menu',
      icon: 'pi pi-angle-double-down',
      command: () => {
        setExpenseDialogVisible(true);
      },
    },
    {
      label: 'Transação',
      className: 'transaction-menu',
      icon: 'pi pi-arrow-right-arrow-left',
      command: () => {
        setTransactionDialogVisible(true);
      },
    },
    {
      label: 'Despesa Cartão',
      className: 'card-menu',
      icon: 'pi pi-credit-card',
      command: () => {
        setExpenseCardDialogVisible(true);
      },
    },
  ];

  return (
    <>
      <div className="card flex justify-content-center">
        <TieredMenu
          appendTo={'self'}
          model={items}
          popup
          ref={menu}
          breakpoint="767px"
        />
        <Button
          icon="pi pi-plus"
          rounded
          severity="success"
          onClick={(e: any) => menu.current && menu.current.toggle(e)}
        />
      </div>

      <ExpenseDialog
        visible={expenseDialogVisible}
        onHide={setExpenseDialogVisible}
      />

      <ExpenseCardDialog
        visible={expenseCardDialogVisible}
        onHide={setExpenseCardDialogVisible}
      />
      <IncomeDialog
        visible={incomeDialogVisible}
        onHide={setIncomeDialogVisible}
      />
      <TransferDialog
        visible={transactionDialogVisible}
        onHide={setTransactionDialogVisible}
      />
    </>
  );
}
