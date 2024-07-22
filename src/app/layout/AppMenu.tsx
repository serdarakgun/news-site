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
              to: '/news/cumhuriyet',
            },
            {
              label: 'Habertürk',
              to: '/news/cumhuriyet',
            },
            {
              label: 'Karar',
              to: '/news/cumhuriyet',
            },
            {
              label: 'Sabah',
              to: '/news/cumhuriyet',
            },
          ],
        },
        {
          label: 'Futbol',
          to: 'football/Leagues',
        },
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
