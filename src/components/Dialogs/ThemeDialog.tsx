import React from 'react';
import { Dialog } from 'primereact/dialog';

export interface Props {
  visible: boolean;
  onHide: any;
}

export function ThemeDialog(props: Props) {
  return (
    <Dialog
      header="Escolha o tema"
      visible={props.visible}
      style={{ width: '50vw' }}
      onHide={() => props.onHide(false)}
      appendTo="self"
    >
      <p className="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </Dialog>
  );
}
