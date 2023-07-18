import React, { useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ColorPicker } from 'primereact/colorpicker';
import './Dialog.scss';

import { useToastContext } from '../../contexts/ToastContext';
import { newTag, updateTag } from '../../services/tags-api';
import { ITag } from '../../interfaces/ITag';
import { TagContext } from '../../contexts/TagContext';

export interface Props {
  visible: boolean;
  onHide: any;
  tag?: ITag;
}

export function TagDialog(props: Props) {
  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<any>('EE7863');
  const { showToast } = useToastContext();
  const { setTags } = React.useContext(TagContext);

  const handleSubmit = async () => {
    const response =
      props.tag && Object.keys(props.tag).length
        ? await updateTag({
            ...props.tag,
            name,
            color,
          })
        : await newTag({
            name,
            color,
          });

          console.log(response)
    if (response?.status === 200) {
      if (props.tag && Object.keys(props.tag).length) {
        setTags((old: ITag[]) => {
          let tags: ITag[] = [];
          old.forEach((item: ITag) => {
            if (item._id === response.data.tag._id) {
              tags.push(response.data.tag);
            } else tags.push(item);
          });
          return tags;
        });
      } else {
        setTags((old) => {
          return [...old, response.data.tag];
        });
      }
      showToast('success', response.data.message);
      props.onHide(false);
    } else {
      showToast('error', response.data.message);
    }
  };

  return (
    <Dialog
      header={props.tag ? 'Editar tag' : 'Nova tag'}
      visible={props.visible}
      style={{ width: '400px' }}
      onHide={() => props.onHide(false)}
      appendTo="self"
    >
      <div className="tag-inputs div-fields">
        <div className="div-field input-01">
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
