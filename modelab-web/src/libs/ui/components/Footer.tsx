import * as React from 'react';
import { cn } from '../../utils';
import { Link } from 'react-router-dom';
import { useTranslation, useResponsive } from '../../hooks';
import { useCheckClearance } from '../../auth';
import { Clearance, CLEARANCE } from '../../../store/types';
import { ADMIN_ROUTES, ROOT_ROUTES } from '../../../global/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpFromBracket,
  faHome,
  faMagnifyingGlass,
  faPerson,
  faScrewdriverWrench,
} from '@fortawesome/free-solid-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Label } from './Label';

type NavLinkPosition = 'left' | 'middle' | 'right';

const navLinkPositionOf = (index: number, total: number): NavLinkPosition => {
  if (index <= 0) return 'left';
  if (index >= total - 1) return 'right';
  return 'middle';
};

interface FooterNavLinkProps {
  path: string;
  position: NavLinkPosition;
  children: React.ReactNode;
}

const FooterNavLink: React.FC<FooterNavLinkProps> = ({ path, position, children }) => {
  return (
    <Link
      to={path}
      className={cn(
        'text-xl hover-underline-animation no-underline text-text-950 border-ui-border',
        position === 'left' && 'border-e me-[10px] pe-[10px]',
        position === 'middle' && 'border-e me-[10px] pe-[10px]'
      )}
    >
      {children}
    </Link>
  );
};

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'borderless' | 'bordered';
  children?: React.ReactNode;
}

export const Footer: React.FC<FooterProps> = ({
  className,
  variant = 'borderless',
  children,
  ...props
}) => {
  const t = useTranslation('ui.footer');

  const { isDesktop } = useResponsive();
  const { hasClearance } = useCheckClearance();

  interface NavLinkData extends Omit<FooterNavLinkProps, 'position'> {
    minClearance?: Clearance;
    icon: IconProp;
  }

  const footerNavLinks: NavLinkData[] = [
    {
      minClearance: CLEARANCE.ADMIN,
      path: ROOT_ROUTES.AdminRoot(),
      children: t('admin'),
      icon: faScrewdriverWrench,
    },
    {
      minClearance: CLEARANCE.ADMIN,
      path: ADMIN_ROUTES.ModelManage('upload'),
      children: t('upload_assets'),
      icon: faArrowUpFromBracket,
    },
    {
      minClearance: CLEARANCE.USER,
      path: ROOT_ROUTES.Browser(),
      children: t('browse_assets'),
      icon: faMagnifyingGlass,
    },
    {
      path: ROOT_ROUTES.About(),
      children: t('about'),
      icon: faPerson,
    },
    {
      path: ROOT_ROUTES.LandingPage(),
      children: t('home'),
      icon: faHome,
    },
  ];

  return (
    <footer
      className={cn(
        'flex flex-row items-center bg-bg-100 py-3',
        variant === 'bordered' ? 'border-t border-ui-border' : 'w-full',
        isDesktop ? 'justify-end' : 'justify-center',
        className
      )}
      {...props}
    >
      {children}
      <nav className={cn('flex flex-row justify-center', isDesktop && 'mr-32')}>
        {footerNavLinks
          .filter((linkData) => {
            if (!hasClearance(linkData.minClearance ?? CLEARANCE.GUEST)) return false;
            return true;
          })
          .map((linkData, index, array) => {
            return (
              <FooterNavLink
                key={index}
                path={linkData.path}
                position={navLinkPositionOf(index, array.length)}
              >
                <Label size="xs">
                  <FontAwesomeIcon icon={linkData.icon} className="px-2" />
                  {((!isDesktop && array.length <= 3) || isDesktop) && linkData.children}
                </Label>
              </FooterNavLink>
            );
          })}
      </nav>
    </footer>
  );
};
