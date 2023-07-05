import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TieredMenu } from 'primereact/tieredmenu';
import { MenuItem } from 'primereact/menuitem';
import { Button } from 'primereact/button';
import './ActionsMenu.scss';
import { ThemeDialog } from '../../Dialogs/ThemeDialog';
import { logout } from '../../../services/user-api';
import { removeLocalStorage } from '../../../helpers/LocalStorage';

export const ActionsMenu = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const navigate = useNavigate();
  const menu = useRef<TieredMenu>(null);
  const items: MenuItem[] = [
    {
      label: 'Perfil',
      className: 'icon-menu',
      icon: 'pi pi-user',
      command: () => {
        navigate('/user');
      },
    },
    {
      label: 'Tema',
      className: 'icon-menu',
      icon: 'pi pi-palette',
      command: () => {
        setDialogVisible(true);
      },
    },
    {
      label: 'Sair',
      className: 'icon-menu',
      icon: 'pi pi-fw pi-power-off',
      command: () => {
        logout().then(() => {
          removeLocalStorage('auth');
          removeLocalStorage('userId');
          navigate('/auth');
        });
      },
    },
  ];

  return (
    <>
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
      <ThemeDialog visible={dialogVisible} onHide={setDialogVisible} />
    </>
  );
};
