import React, { useRef } from 'react';
import { MenuItem } from 'primereact/menuitem';
import { TieredMenu } from 'primereact/tieredmenu';
import { Button } from 'primereact/button';

export default function NewTransactionButton() {
  const menu = useRef<TieredMenu>(null);
  const items: MenuItem[] = [
    {
      label: 'Receita',
      className: 'revenue-menu',
      icon: 'pi pi-angle-double-up',
      command: () => {},
    },
    {
      label: 'Despesa',
      className: 'expense-menu',
      icon: 'pi pi-angle-double-down',
      command: () => {},
    },
    {
      label: 'Transação',
      className: 'transaction-menu',
      icon: 'pi pi-arrow-right-arrow-left',
      command: () => {},
    },
    {
      label: 'Despesa Cartão',
      className: 'card-menu',
      icon: 'pi pi-credit-card',
      command: () => {},
    },
  ];

  return (
    <div className="card flex justify-content-center">
      <TieredMenu appendTo={"self"} model={items} popup ref={menu} breakpoint="767px" />
      <Button
        icon="pi pi-plus"
        rounded
        severity="success"
        onClick={(e: any) => menu.current && menu.current.toggle(e)}
      />
    </div>
  );
}
