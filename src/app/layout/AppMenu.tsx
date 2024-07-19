import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';

const AppMenu = () => {
  const model: any[] = [
    {
      label: 'Menü 1',
      items: [
        {
          label: 'Alt Menü 1',
          items: [
            {
              label: 'Alt Menü 1 - 1',
              to: '',
            },
          ],
        },
        { label: 'Alt Menü 2', to: '' },
        { label: 'Alt Menü 3', to: '' },
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
