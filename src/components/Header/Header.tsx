import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TieredMenu } from 'primereact/tieredmenu';
import { MenuItem } from 'primereact/menuitem';
import { SidebarMenu } from '../SidebarMenu/SidebarMenu';
import { CalendarInput } from './Calendar/Calendar';
import { Button } from 'primereact/button';
import NewTransactionButton from './NewTransactionButton/NewTransactionButton';
import User from '../../assets/user-default.png';
import './Header.scss';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const rotes = ['/auth', '/signup', '/password-reset'];
  const menu = useRef<TieredMenu>(null);
  const items: MenuItem[] = [
    {
      label: 'Perfil',
      className: 'icon-menu',
      icon: 'pi pi-user',
    },
    {
      label: 'Tema',
      className: 'icon-menu',
      icon: 'pi pi-palette',
    },
    {
      label: 'Sair',
      className: 'icon-menu',
      icon: 'pi pi-fw pi-power-off',
    },
  ];

  return (
    <>
      {' '}
      {!rotes.includes(location.pathname) && (
        <div className="header">
          <div className="header-container">
            <div className="actions">
              <SidebarMenu />
              <NewTransactionButton />
            </div>

            <CalendarInput />
            <div className="user-actions">
              <div className="user-data">
                <img src={User} alt="" />
                <span> Usuario </span>
              </div>
              <TieredMenu
                appendTo={'self'}
                model={items}
                popup
                ref={menu}
                breakpoint="767px"
              />
              <Button
                rounded
                text
                icon="pi pi-chevron-circle-down "
                onClick={(e: any) => menu.current && menu.current.toggle(e)}
              />
            </div>
          </div>
        </div>
      )}{' '}
    </>
  );
};
