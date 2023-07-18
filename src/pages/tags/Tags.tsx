import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import { getTags } from '../../services/tags-api';
import { TagContext, TagStorage } from '../../contexts/TagContext';
import { ITag } from '../../interfaces/ITag';

import { TagDialog } from '../../components/Dialogs/TagDialog';
import Loading from '../../components/Loading/Loading';
import './Tags.scss';

export const Tags = () => {
  const { tags, setTags } = React.useContext(TagContext);
  const [currentTag, setCurrentTag] = useState({} as ITag);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const colorTag = (rowData: any) => {
    const color = rowData.color;
    return <i style={{ color: '#' + color }} className="fa-solid fa-tag"></i>;
  };

  const actionsTag = (tag: ITag) => {
    return (
      <div className="actions-tag">
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
            setCurrentTag(tag);
            setDialogVisible(true);
          }}
        />
      </div>
    );
  };

  const loadTags = React.useCallback(() => {
    setLoading(true);
    getTags().then(({ data }) => {
      setLoading(false);
      setTags(data);
    });
  }, [setTags]);

  useEffect(() => {
    loadTags();
  }, [loadTags]);

  return (
    <TagStorage>
      <div className="container-pages tag-container">
        <div className="actions">
          <h2> Tags</h2>

          <Button
            icon="pi pi-plus"
            rounded
            aria-label="Nova Tag"
            tooltip="Nova Tag"
            onClick={() => {
              setCurrentTag({} as ITag);
              setDialogVisible(true);
            }}
          />
        </div>{' '}
        {!loading && (
          <DataTable
            emptyMessage="Nenhuma tag encontrada."
            paginator
            paginatorDropdownAppendTo="self"
            rows={5}
            rowsPerPageOptions={[5, 10, 20, 40]}
            value={tags}
          >
            <Column sortable field="name" header="Nome"></Column>
            <Column filterField="color" body={colorTag} header="Cor"></Column>
            <Column header="Ações" filterField="tag" body={actionsTag}></Column>
          </DataTable>
        )}
        {/* {!loading && !tags.length && <p> Nenhuma tag cadastrada!</p>} */}
        {loading && <Loading />}
        <TagDialog
          visible={dialogVisible}
          onHide={setDialogVisible}
          tag={currentTag}
        />
      </div>
    </TagStorage>
  );
};
