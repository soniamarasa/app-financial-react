import React, { useState } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import './IconsOverlayPanel.scss';

export interface Props {
  op: any;
  onIconValueChange: any;
}

export function IconsOverlayPanel(props: Props) {
  const icons = [
    'fa-solid fa-tooth',
    'fa-solid fa-car',
    'fa-solid fa-bus',
    'fa-solid fa-cart-shopping',
    'fa-solid fa-bag-shopping',
    'fa-solid fa-shirt',
    'fa-solid fa-glasses',
    'fa-solid fa-suitcase',
    'fa-solid fa-briefcase',
    'fa-solid fa-suitcase-rolling',
    'fa-solid fa-graduation-cap',
    'fa-solid fa-syringe',
    'fa-solid fa-credit-card',
    'fa-solid fa-hospital',
    'fa-solid fa-headset',
    'fa-solid fa-headphones',
    'fa-solid fa-briefcase-medical',
    'fa-solid fa-plane',
    'fa-solid fa-home',
    'fa-solid fa-book',
    'fa-solid fa-laptop',
    'fa-solid fa-computer',
    'fa-solid fa-building',
    'fa-solid fa-bowl-rice',
    'fa-solid fa-burger',
    'fa-solid fa-umbrella-beach',
    'fa-solid fa-film',
    'fa-solid fa-palette',
    'fa-solid fa-print',
    'fa-solid fa-house-lock',
    'fa-solid fa-toilet-paper',
    'fa-solid fa-baby-carriage',
    'fa-solid fa-phone',
    'fa-solid fa-hotel',
    'fa-solid fa-ellipsis',
    'fa-solid fa-coins',
    'fa-solid fa-list',
    'fa-solid fa-bookmark',
    'fa-solid fa-tree',
    'fa-solid fa-piggy-bank',
    'fa-solid fa-hand-holding-dollar',
    'fa-solid fa-chart-line',
    'fa-solid fa-brazilian-real-sign',
    'fa-solid fa-money-bill-1',
    'fa-solid fa-building-columns',
    'fa-solid fa-money-bill-trend-up',
    'fa-solid fa-wallet',
    'fa-solid fa-shapes',
    'fa-solid fa-book-open-reader',
    'fa-solid fa-cat',
    'fa-solid fa-dog',
    'fa-solid fa-paw',
    'fa-solid fa-fish',
    'fa-solid fa-envelope',
    'fa-solid fa-pen',
    'fa-solid fa-marker',
    'fa-solid fa-percent',
    'fa-solid fa-scissors',
    'fa-solid fa-kitchen-set',
    'fa-solid fa-lightbulb',
    'fa-solid fa-plug',
    'fa-solid fa-mobile-screen',
    'fa-solid fa-user-astronaut',
    'fa-solid fa-moon',
    'fa-solid fa-globe',
    'fa-solid fa-vault',
    'fa-solid fa-store',
    'fa-solid fa-utensils',
    'fa-solid fa-heart',
    'fa-solid fa-shop-lock',
    'fa-solid fa-gift',
    'fa-solid fa-star',
    'fa-solid fa-key',
    'fa-brands fa-pagelines',
    'fa-solid fa-sack-dollar',
    'fa-solid fa-arrow-right',
    'fa-solid fa-arrow-left',
  ];

  const [currentIcon, setCurrentIcon] = useState<any>('fa-solid fa-shapes');
 
  const handleIconChange = (icon: string) => {
    setCurrentIcon(icon);
    props.onIconValueChange(icon); 
  };

  return (
    <OverlayPanel ref={props.op}>
      <div className="icons-container">
        {icons.map((icon, index) => (
          <div  onClick={() => handleIconChange(icon)} key={index}>
            <i className={icon}></i>
          </div>
        ))}
      </div>
    </OverlayPanel>
  );
}
