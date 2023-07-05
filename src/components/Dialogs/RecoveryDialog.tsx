import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { retrievePassword } from '../../services/user-api';
import { useToastContext } from '../../contexts/ToastContext';
import { Button } from 'primereact/button';
import './Dialog.scss';

export interface Props {
  visible: boolean;
  onHide: any;
}

export function RecoveryDialog(props: Props) {
  const [email, setEmail] = useState<string>('');
  const { showToast } = useToastContext();

  const handleSubmit = async () => {
    const response = await retrievePassword({
      email,
      host: window.location.origin,
    });

    if (response?.status === 200) {
      showToast('success', response.data.message);
      props.onHide(false);
      setEmail('');
    } else {
      showToast('error', response);
    }
  };

  return (
    <Dialog
      header="Recuperação de senha"
      visible={props.visible}
      style={{ width: '400px' }}
      onHide={() => props.onHide(false)}
      appendTo="self"
      className="recovery-dialog"
    >
      <div className="card">
        <span>
          Para recuperar a senha, digite o e-mail cadastrado no campo abaixo:
        </span>
        <InputText
          required
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
      </div>

      <div className="p-dialog-footer">
        <Button
          disabled={!email}
          onClick={() => handleSubmit()}
          rounded
          label="Enviar"
        />
      </div>
    </Dialog>
  );
}
