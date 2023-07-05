import React from 'react';
import { Dialog } from 'primereact/dialog';
import { OverlayPanel } from 'primereact/overlaypanel';

export interface Props {
  op: any;
}

export function ExpenseCardDialog(props: Props) {
  return (
    <OverlayPanel ref={props.op}>
      <img
        src={
          'https://primefaces.org/cdn/primereact/images/product/bamboo-watch.jpg'
        }
        alt="Bamboo Watch"
      ></img>
    </OverlayPanel>
  );
}
