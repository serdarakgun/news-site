import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';

const AppMenu = () => {
  const model: any[] = [
    {
      label: 'Haberler',
      items: [
        {
          label: 'Gazete Haberleri',
          items: [
            {
              label: 'Cumhuriyet',
              to: '',
            },
            {
              label: 'Habertürk',
              to: '',
            },
            {
              label: 'Karar',
              to: '',
            },
            {
              label: 'Sabah',
              to: '',
            },
          ],
        },
        { label: 'Süper Lig Puan Durumu', to: '' },
        { label: 'Namaz Vakitleri', to: '' },
      ],
    },
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
