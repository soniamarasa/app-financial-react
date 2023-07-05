import React from 'react';
import { Card } from 'primereact/card';

export default function CardDash() {
  return (
    <div className="col-12 md:col-6 lg:col-3">
      <Card className="shadow-3">
        <div>
          <h5>Titulo</h5>
          <h2>R$1000,00</h2>
        </div>
      </Card>
    </div>
  );
}
