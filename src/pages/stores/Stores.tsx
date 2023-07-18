import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import { getStores } from '../../services/stores-api';
import { StoreContext } from '../../contexts/StoreContext';
import { IStore } from '../../interfaces/IStore';

import { StoreDialog } from '../../components/Dialogs/StoreDialog';
import Loading from '../../components/Loading/Loading';
import './Stores.scss';

export const Stores = () => {
  const { stores, setStores } = React.useContext(StoreContext);
  const [currentStore, setCurrentStore] = useState({} as IStore);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const colorStore = (rowData: any) => {
    const color = rowData.color;
    return <i style={{ color: '#' + color }} className="fa-solid fa-store"></i>;
  };

  const actionsStore = (store: IStore) => {
    return (
      <div className="actions-store">
        <Button
          icon="fa-solid fa-file-lines"
          rounded
          text
          aria-label="Relatórios"
          tooltip="Relatórios"
        />
        <Button
          icon="fa-solid fa-pen"
          rounded
          text
          aria-label="Editar"
          tooltip="Editar"
          onClick={() => {
            setCurrentStore(store);
            setDialogVisible(true);
          }}
        />
      </div>
    );
  };

  useEffect(() => {
    setLoading(true);
    getStores().then(({ data }) => {
      setLoading(false);
      setStores(data);
    });
  }, [setStores]);

  return (
    <div className="container-pages store-container">
      <div className="actions">
        <h2><i className="fa-solid fa-store"></i> Lojas </h2>

        <Button
          icon="pi pi-plus"
          rounded
          aria-label="Nova Loja"
          tooltip="Nova Loja"
          onClick={() => {
            setCurrentStore({} as IStore);
            setDialogVisible(true);
          }}
        />
      </div>{' '}
      {!loading && (
        <DataTable
          emptyMessage="Nenhuma loja encontrada."
          paginator
          paginatorDropdownAppendTo="self"
          rows={5}
          rowsPerPageOptions={[5, 10, 20, 40]}
          value={stores}
        >
          <Column sortable field="name" header="Nome"></Column>
          <Column filterField="color" body={colorStore} header="Cor"></Column>
          <Column
            header="Ações"
            filterField="store"
            body={actionsStore}
          ></Column>
        </DataTable>
      )}
      {loading && <Loading />}
      <StoreDialog
        visible={dialogVisible}
        onHide={setDialogVisible}
        store={currentStore}
      />
    </div>
  );
};
