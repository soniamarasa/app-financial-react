import React, { useEffect, useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { ColorPicker } from 'primereact/colorpicker';
import { IconsOverlayPanel } from '../IconsOverlayPanel/IconsOverlayPanel';
import './Dialog.scss';

import { useToastContext } from '../../contexts/ToastContext';
import { newCategory, updateCategory } from '../../services/categories-api';
import { ICategory } from '../../interfaces/ICategory';
import { CategoryContext } from '../../contexts/CategoryContext';

export interface Props {
  visible: boolean;
  onHide: any;
  category?: ICategory;
  type: number;
}

export function CategoryDialog(props: Props) {
  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<any>('EE7863');
  const [currentIcon, setCurrentIcon] = useState<any>('fa-solid fa-shapes');
  const op = useRef<OverlayPanel>(null);
  const { showToast } = useToastContext();
  const { setCategories } = React.useContext(CategoryContext);

  const iconStyle = {
    backgroundColor: `#${color}`,
  };

  const handleIconValue = (value: string) => {
    setCurrentIcon(value);
  };

  const handleSubmit = async () => {
    const response =
      props.category && Object.keys(props.category).length
        ? await updateCategory({
            ...props.category,
            name,
            color,
            icon: currentIcon,
          })
        : await newCategory({
            name,
            color,
            icon: currentIcon,
            type: props.type,
          });

    if (response?.status === 200) {
      if(props.category && Object.keys(props.category).length) {
        setCategories((old: ICategory[]) => {
          let categories: ICategory[] = []
          old.forEach((item: ICategory) => {
            if(item._id === response.data.category._id) {
              categories.push(response.data.category)
            } else categories.push(item)
          })
          return categories
        })
      } else {
        setCategories((old) => {
          return [...old, response.data.category]
        })
      }
 
      showToast('success', response.data.message);
      props.onHide(false);
    
    } else {
      showToast('error', response);
    }
  };

  const setProps = React.useCallback((cat?: ICategory) => {
    setName(cat ? cat.name : '');
    setColor(cat ? cat.color : 'EE7863');
    setCurrentIcon(cat ? cat.icon : 'fa-solid fa-shapes');
  }, []);

  useEffect(() => {
    if (props.category && Object.keys(props.category).length)
      setProps(props.category);
    else setProps();
  }, [props.category, setProps]);

  return (
    <Dialog
      header={props.category ? 'Editar categoria' : 'Nova categoria'}
      visible={props.visible}
      style={{ width: '350px' }}
      onHide={() => props.onHide(false)}
      appendTo="self"
    >
      <div className="card input-01">
        <label>Nome</label>
        <InputText
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
      </div>
      <div className=" card category-inputs">
        <div className="input-color">
          <label> Icone:</label>

          <div
            style={iconStyle}
            onClick={(e) => op.current && op.current.toggle(e)}
            className="btn-icon-category"
          >
            <i className={currentIcon}></i>{' '}
            <IconsOverlayPanel onIconValueChange={handleIconValue} op={op} />
          </div>
        </div>

        <div className="input-color">
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
