import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SplitButton } from 'primereact/splitbutton';
import { Button } from 'primereact/button';

import { getCategories } from '../../services/categories-api';
import { CategoryContext } from '../../contexts/CategoryContext';
import { ICategory } from '../../interfaces/ICategory';

import { CategoryDialog } from '../../components/Dialogs/CategoryDialog';
import Loading from '../../components/Loading/Loading';
import './Categories.scss';

export const Categories = () => {
  const { categories, setCategories } = React.useContext(CategoryContext);
  const [currentCategory, setCurrentCategory] = useState({} as ICategory);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState(1);

  const types = [
    {
      label: 'Despesa',
      className: 'expense-menu',
      icon: 'pi pi-angle-double-down',
      command: () => {
        setType(1);
        loadCategories(1);
      },
    },
    {
      label: 'Receita',
      className: 'revenue-menu',
      icon: 'pi pi-angle-double-up',
      command: () => {
        setType(2);
        loadCategories(2);
      },
    },
  ];

  const iconCategory = (rowData: any) => {
    const icon = rowData.icon;
    return <i className={icon}></i>;
  };

  const colorCategory = (rowData: any) => {
    const color = rowData.color;
    return (
      <div
        className="color-category"
        style={{ backgroundColor: '#' + color }}
      ></div>
    );
  };

  const actionsCategory = (category: ICategory) => {
    return (
      <div className="actions-category">
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
            setCurrentCategory(category);
            setDialogVisible(true);
          }}
        />
      </div>
    );
  };

  const loadCategories = React.useCallback(
    (type?: number) => {
      setLoading(true);
      getCategories(type).then(({ data }) => {
        setCategories(data);
        setLoading(false);
      });
    },
    [setCategories]
  );

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return (
    <div className="container-pages category-container">
      <div className="actions">
        <SplitButton
          appendTo={'self'}
          rounded
          className={type === 2 ? 'btn-revenue' : 'btn-expense'}
          label={
            type === 1 ? 'Categorias de Despesas' : 'Categorias de Receitas'
          }
          dropdownIcon="pi pi-angle-down"
          model={types}
        ></SplitButton>

        <Button
          icon="pi pi-plus"
          rounded
          aria-label="Nova Categoria"
          tooltip="Nova Categoria"
          onClick={() => {
            setCurrentCategory({} as ICategory);
            setDialogVisible(true);
          }}
        />
      </div>{' '}
      {!loading && categories && categories.length > 0 && (
        <DataTable
          emptyMessage="Nenhuma categoria encontrada."
          paginator
          paginatorDropdownAppendTo="self"
          rows={5}
          rowsPerPageOptions={[5, 10, 20, 40]}
          value={categories}
        >
          <Column sortable field="name" header="Nome"></Column>
          <Column
            filterField="icon"
            body={iconCategory}
            header="Icone"
          ></Column>
          <Column
            filterField="color"
            body={colorCategory}
            header="Cor"
          ></Column>
          <Column
            header="Ações"
            filterField="category"
            body={actionsCategory}
          ></Column>
        </DataTable>
      )}
      {loading && <Loading />}
      <CategoryDialog
        visible={dialogVisible}
        type={type}
        onHide={setDialogVisible}
        category={currentCategory}
      />
    </div>
  );
};
