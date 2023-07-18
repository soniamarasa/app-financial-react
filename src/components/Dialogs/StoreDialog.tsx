import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ColorPicker } from 'primereact/colorpicker';
import './Dialog.scss';

import { useToastContext } from '../../contexts/ToastContext';
import { newStore, updateStore } from '../../services/stores-api';
import { IStore } from '../../interfaces/IStore';
import { StoreContext } from '../../contexts/StoreContext';

export interface Props {
  visible: boolean;
  onHide: any;
  store?: IStore;
}

export function StoreDialog(props: Props) {
  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<any>('EE7863');
  const { showToast } = useToastContext();
  const { setStores } = React.useContext(StoreContext);

  const handleSubmit = async () => {
    const response =
      props.store && Object.keys(props.store).length
        ? await updateStore({
            ...props.store,
            name,
            color,
          })
        : await newStore({
            name,
            color,
          });

    if (response?.status === 200) {
      if (props.store && Object.keys(props.store).length) {
        setStores((old: IStore[]) => {
          let stores: IStore[] = [];
          old.forEach((item: IStore) => {
            if (item._id === response.data.store._id) {
              stores.push(response.data.store);
            } else stores.push(item);
          });
          return stores;
        });
      } else {
        setStores((old) => {
          return [...old, response.data.store];
        });
      }
      showToast('success', response.data.message);
      props.onHide(false);
    } else {
      showToast('error', response.data.message);
    }
  };

  const setProps = React.useCallback((store?: IStore) => {
    setName(store ? store.name : '');
    setColor(store ? store.color : 'EE7863');
  }, []);

  useEffect(() => {
    if (props.store && Object.keys(props.store).length) setProps(props.store);
    else setProps();
  }, [props.store, setProps]);

  return (
    <Dialog
      header={props.store?._id ? 'Editar loja' : 'Nova loja'}
      visible={props.visible}
      style={{ width: '400px' }}
      onHide={() => props.onHide(false)}
      appendTo="self"
    >
      <div className="store-inputs div-fields">
        <div className="div-field">
          <label>Nome</label>
          <InputText
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </div>

        <div className="div-field input-color">
          <label> Cor:</label>
          <ColorPicker
            className=""
            value={color}
            onChange={(e) => setColor(e.value)}
          ></ColorPicker>
        </div>
      </div>
      <div className="p-dialog-footer">
        <Button
          disabled={!name}
          onClick={() => handleSubmit()}
          rounded
          label="Salvar"
        />
      </div>
    </Dialog>
  );
}
