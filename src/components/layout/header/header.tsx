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
import Search from '@components/common/search';
import LanguageSwitcher from '@components/ui/language-switcher';
import UserIcon from '@components/icons/user-icon';
import SearchIcon from '@components/icons/search-icon';
import { useModalAction } from '@components/common/modal/modal.context';
import useOnClickOutside from '@utils/use-click-outside';
import Delivery from '@components/layout/header/delivery';
const AuthMenu = dynamic(() => import('./auth-menu'), { ssr: false });
const CartButton = dynamic(() => import('@components/cart/cart-button'), {
  ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

const Header: React.FC = () => {
  const { t } = useTranslation('common');
  const {
    displaySearch,
    displayMobileSearch,
    openSearch,
    closeSearch,
    isAuthorized,
  } = useUI();
  const { openModal } = useModalAction();
  const siteHeaderRef = useRef() as DivElementRef;
  const siteSearchRef = useRef() as DivElementRef;
  addActiveScroll(siteHeaderRef, 40);
  useOnClickOutside(siteSearchRef, () => closeSearch());
  function handleLogin() {
    openModal('LOGIN_VIEW');
  }

  return (
    <header
      id="siteHeader"
      ref={siteHeaderRef}
      className={cn(
        'header-two sticky-header sticky top-0 z-20 lg:relative w-full h-16 lg:h-auto',
        displayMobileSearch && 'active-mobile-search'
      )}
    >
      <div className="innerSticky w-screen lg:w-full transition-all duration-200 ease-in-out body-font bg-skin-secondary z-20">
        <Search
          searchId="mobile-search"
          className="top-bar-search hidden lg:max-w-[600px] absolute z-30 px-4 md:px-6 top-1"
        />
        {/* End of Mobile search */}
        <Container className="top-bar h-16 lg:h-auto flex items-center justify-between py-3">
          <Logo className="logo -mt-1.5 md:-mt-1" />
          {/* End of logo */}

          <Search
            searchId="top-bar-search"
            className="hidden lg:flex lg:max-w-[650px] 2xl:max-w-[800px] lg:ms-8 lg:me-5"
          />
          {/* End of search */}

          <div className="flex flex-shrink-0 space-s-5 xl:space-s-7">
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

        <div className="navbar bg-skin-fill hidden lg:block">
          <Container className="h-16 flex justify-between items-center">
            <Logo className="navbar-logo w-0 opacity-0 transition-all duration-200 ease-in-out" />
            {/* End of logo */}

            <HeaderMenu
              data={site_header.menu}
              className="flex transition-all duration-200 ease-in-out"
            />
            {/* End of main menu */}

            {displaySearch && (
              <div className="sticky-search w-full absolute top-0 left-0 px-4 flex items-center justify-center h-full">
                <Search
                  ref={siteSearchRef}
                  className="max-w-[780px] xl:max-w-[830px] 2xl:max-w-[1000px]"
                />
              </div>
            )}
            {/* End of conditional search  */}

            <div className="ms-auto flex items-center flex-shrink-0">
              <Delivery />
              <div className="navbar-right flex items-center overflow-hidden py-4 w-0 opacity-0 transition-all duration-200 ease-in-out">
                <button
                  type="button"
                  aria-label="Search Toggle"
                  onClick={() => openSearch()}
                  title="Search toggle"
                  className="outline-none me-6 w-12 md:w-14 h-full flex items-center justify-center transition duration-200 ease-in-out hover:text-heading focus:outline-none"
                >
                  <SearchIcon className="w-[22px] h-[22px] text-skin-base text-opacity-40" />
                </button>
                {/* End of search handler btn */}

                <CartButton />
                {/* End of cart btn */}

                <div className="flex-shrink-0 flex items-center ms-7">
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
                {/* End of auth */}
              </div>
            </div>
          </Container>
        </div>
        {/* End of menu part */}
      </div>
    </header>
  );
};

export default Header;
