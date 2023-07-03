import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import './SidebarMenu.scss';
import Logo from '../../assets/icon.png';

export const SidebarMenu = () => {
  const [visibleLeft, setVisibleLeft] = useState(false);

  let items = [
    { label: 'Contas', icon: 'pi pi-wallet' },
    { label: 'Transações', icon: 'pi pi-list' },
    { label: 'Cartões', icon: 'pi pi-credit-card' },
    { label: 'Relatorios', icon: 'pi pi-chart-pie' },
    { label: 'Planejamento', icon: 'pi pi-dollar' },
    { label: 'Categorias', icon: 'pi pi-bookmark' },
    { label: 'Tags', icon: 'pi pi-tags' },
    { label: 'Lojas', icon: 'pi pi-shopping-cart' },
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
