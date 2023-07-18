import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import './SidebarMenu.scss';
import Logo from '../../assets/icon.png';

export const SidebarMenu = () => {
  const [visibleLeft, setVisibleLeft] = useState(false);

  let items = [
    { label: 'Contas', icon: 'fa-solid fa-building-columns', url: '/accounts' },
    { label: 'Transações', icon: 'fa-solid fa-list', url: '/transactions' },
    { label: 'Cartões', icon: 'fa-solid fa-credit-card', url: '/cards' },
    { label: 'Relatorios', icon: 'fa-solid fa-chart-pie', url: '/reports' },
    { label: 'Planejamento', icon: 'fa-solid fa-dollar', url: '/plan' },
    { label: 'Categorias', icon: 'fa-solid fa-bookmark' , url: '/categories'},
    { label: 'Tags', icon: 'fa-solid fa-tags', url: '/tags' },
    { label: 'Lojas', icon: 'fa-solid fa-store', url: '/stores' },
  ];

  return (
    <div>
      <div>
        <Button
          icon="pi pi-bars"
          onClick={() => setVisibleLeft(true)}
          rounded
          text
          aria-label="Filter"
        />
      </div>

      <Sidebar
        appendTo={'self'}
        visible={visibleLeft}
        position="left"
        onHide={() => setVisibleLeft(false)}
      >
        <div className="logo-container-menu">
          {' '}
          <img className="logo-menu" src={Logo} alt="" />
          <h3> Budget Tracker</h3>
        </div>

        <Menu model={items} />
      </Sidebar>
    </div>
  );
};
