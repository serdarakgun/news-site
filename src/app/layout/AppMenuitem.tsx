'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';
import React, { Suspense, useContext, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { MenuContext } from './context/menucontext';

const AppMenuitem = (props: any) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { activeMenu, setActiveMenu } = useContext(MenuContext);
  const item = props.item;
  const key = props.parentKey ? props.parentKey + '-' + props.index : String(props.index);
  const isActiveRoute = item!.to && pathname.includes(item!.to);
  const active = activeMenu === key || activeMenu.startsWith(key + '-');
  const onRouteChange = (url: string) => {
    if (item!.to && url.includes(item!.to)) {
      setActiveMenu(key);
    }
  };

  useEffect(() => {
    onRouteChange(pathname);
  }, [pathname, searchParams]);

  const itemClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (item!.disabled) {
      event.preventDefault();
      return;
    }
    if (item!.command) {
      item!.command({ originalEvent: event, item: item });
    }
    if (item!.items) setActiveMenu(active ? (props.parentKey as string) : key);
    else setActiveMenu(key);
  };

  const subMenu = item!.items && item!.visible !== false && (
    <CSSTransition timeout={{ enter: 1000, exit: 450 }} classNames="layout-submenu" in={props.root ? true : active} key={item!.label}>
      <ul>
        {item!.items.map((child: any, i: any) => {
          return <AppMenuitem item={child} index={i} className={child.badgeClass} parentKey={key} key={child.label} />;
        })}
      </ul>
    </CSSTransition>
  );

  return (
    <Suspense>
      <li className={classNames({ 'layout-root-menuitem': props.root, 'active-menuitem': active })}>
        {props.root && item!.visible !== false && <div className="layout-menuitem-root-text">{item!.label}</div>}
        {(!item!.to || item!.items) && item!.visible !== false ? (
          <a href={item!.url} onClick={(e) => itemClick(e)} className={classNames(item!.class, 'p-ripple')} target={item!.target} tabIndex={0}>
            <span className="layout-menuitem-text">{item!.label}</span>
            {item!.items && <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>}
            <Ripple />
          </a>
        ) : null}
        {item!.to && !item!.items && item!.visible !== false ? (
          <Link
            href={item!.to}
            replace={item!.replaceUrl}
            target={item!.target}
            onClick={(e) => itemClick(e)}
            className={classNames(item!.class, 'p-ripple', { 'active-route': isActiveRoute })}
            tabIndex={0}
          >
            <span className="layout-menuitem-text">{item!.label}</span>
            {item!.items && <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>}
            <Ripple />
          </Link>
        ) : null}

        {subMenu}
      </li>
    </Suspense>
  );
};

export default AppMenuitem;
