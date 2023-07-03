import React from 'react';
import CardDash from '../CardDash/CardDash';
import './HeaderDashboard.scss'

export default function HeaderDashboard(props: any) {
  return (
    <div className="header-dash-container grid">
      <CardDash></CardDash>
      <CardDash></CardDash>
      <CardDash></CardDash>
      <CardDash></CardDash>
    </div>
  );
}
