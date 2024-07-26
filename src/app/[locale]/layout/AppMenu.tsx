import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import { useTranslations } from 'next-intl';

const AppMenu = () => {
  const t = useTranslations('SideBar');
  const model: any[] = [
    {
      label: t('headerLabel'),
      items: [
        {
          label: t('news'),
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
          label: t('football'),
          to: '/football/Leagues',
        },
        { label: t('religion'), to: '/religion' },
        { label: t('weather'), to: '/weather' },
        {
          label: 'economy',
          items: [
            { label: 'altın', to: '/economy/gold' },
            { label: 'döviz', to: '/economy/exchange' },
          ],
        },
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
