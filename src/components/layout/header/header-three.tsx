import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { ROUTES } from '@utils/routes';
import { useUI } from '@contexts/ui.context';
import { siteSettings } from '@settings/site-settings';
import { addActiveScroll } from '@utils/add-active-scroll';
import Container from '@components/ui/container';
import Logo from '@components/ui/logo';
import HeaderMenu from '@components/layout/header/header-menu';
import LanguageSwitcher from '@components/ui/language-switcher';
import UserIcon from '@components/icons/user-icon';
import MenuIcon from '@components/icons/menu-icon';
import useOnClickOutside from '@utils/use-click-outside';
import { useModalAction } from '@components/common/modal/modal.context';
import Search from '@components/common/search';
import SearchIcon from '@components/icons/search-icon';
const AuthMenu = dynamic(() => import('./auth-menu'), { ssr: false });
const CartButton = dynamic(() => import('@components/cart/cart-button'), {
  ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

const Header: React.FC = () => {
  const { t } = useTranslation('common');
  const { openModal } = useModalAction();
  const {
    openSidebar,
    displaySearch,
    openSearch,
    closeSearch,
    isAuthorized,
    displayMobileSearch,
  } = useUI();
  const siteHeaderRef = useRef() as DivElementRef;
  const siteSearchRef = useRef() as DivElementRef;
  useOnClickOutside(siteSearchRef, () => closeSearch());
  addActiveScroll(siteHeaderRef, 10);
  function handleLogin() {
    openModal('LOGIN_VIEW');
  }
  function handleMobileMenu() {
    return openSidebar();
  }

  return (
    <header
      id="siteHeader"
      ref={siteHeaderRef}
      className={cn(
        'header-three sticky-header w-full h-16 lg:h-20 sticky lg:relative top-0 z-20',
        displayMobileSearch && 'active-mobile-search'
      )}
    >
      <div className="innerSticky absolute lg:fixed w-screen lg:w-full body-font bg-skin-fill transition duration-200 ease-in-out z-30">
        <Search className="top-bar-search lg:max-w-[600px] absolute z-30 px-4 md:px-6 top-1" />
        {/* End of Mobile search */}
        <Container
          className={cn(
            'top-bar h-16 lg:h-20 flex items-center justify-center lg:justify-between py-3',
            displayMobileSearch && 'active-mobile-search'
          )}
        >
          <button
            aria-label="Menu"
            className="menuBtn me-5 hidden lg:flex 2xl:hidden flex-col items-center justify-center flex-shrink-0 outline-none focus:outline-none"
            onClick={handleMobileMenu}
          >
            <MenuIcon />
          </button>

          <Logo className="logo -mt-1" />
          {/* End of logo */}

          <HeaderMenu
            className="hidden 2xl:flex ps-10 3xl:w-auto"
            data={site_header.menu}
          />
          {/* End of menu */}
          {displaySearch && (
            <div className="sticky-search w-full absolute top-0 left-0 px-4 flex items-center justify-center h-full">
              <Search
                ref={siteSearchRef}
                className="max-w-[780px] xl:max-w-[830px] 2xl:max-w-[1000px]"
              />
            </div>
          )}
          {/* End of conditional search  */}

          <div className="flex flex-shrink-0 space-s-5 xl:space-s-7 ms-auto">
            <button
              type="button"
              onClick={() => openSearch()}
              title="Search toggle"
              className="outline-none py-2 w-8 -me-2 h-full hidden lg:flex items-center justify-center transition duration-200 ease-in-out hover:text-heading focus:outline-none"
            >
              <SearchIcon className="w-[22px] h-[22px] text-skin-base text-opacity-40" />
            </button>
            {/* End of search handler btn */}
            <LanguageSwitcher />
            <CartButton className="hidden lg:flex" />
            <div className="hidden lg:flex items-center flex-shrink-0 ">
              <UserIcon className="text-skin-base text-opacity-40" />
              <AuthMenu
                isAuthorized={isAuthorized}
                href={ROUTES.ACCOUNT}
                btnProps={{
                  children: t('text-sign-in'),
                  onClick: handleLogin,
                }}
              >
                {t('text-account')}
              </AuthMenu>
            </div>
          </div>
          {/* End of auth & lang */}
        </Container>
        {/* End of top part */}
      </div>
    </header>
  );
};

export default Header;
