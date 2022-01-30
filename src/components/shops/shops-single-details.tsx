import { useShopQuery } from '@framework/shop/get-shop';
import Text from '@components/ui/text';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useUI } from '@contexts/ui.context';
import { getDirection } from '@utils/get-direction';
import { Element } from 'react-scroll';
import Container from '@components/ui/container';
import { Drawer } from '@components/common/drawer/drawer';
import ShopSidebar from '@components/shops/shop-sidebar';
import ShopSidebarDrawer from '@components/shops/shop-sidebar-drawer';
import AllProductFeed from '@components/product/feeds/all-products-feed';
import { useTranslation } from 'next-i18next';
import useWindowSize from '@utils/use-window-size';

const ShopsSingleDetails: React.FC = () => {
  const {
    query: { slug },
  } = useRouter();
  const { t } = useTranslation('common');
  const { data, isLoading } = useShopQuery(slug as string);
  const { openShop, displayShop, closeShop } = useUI();
  const { width } = useWindowSize();
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === 'ltr' ? { left: 0 } : { right: 0 };

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div
        className="flex justify-center h-56 md:h-64 w-full bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${
            width! <= 480
              ? data?.cover_image?.original!
              : data?.cover_image?.thumbnail!
          })`,
        }}
      />
      <div className="flex lg:hidden items-center px-4 md:px-6 py-4 border-b border-skin-base mb-7">
        <div className="flex flex-shrink-0">
          <Image
            src={data?.logo?.original!}
            alt={data?.name}
            width={66}
            height={66}
            className="rounded-md"
          />
        </div>
        <div className="ps-4">
          <h2 className="text-skin-base text-15px font-semibold">
            {data?.name}
          </h2>
          <button
            className="font-medium text-sm block text-skin-primary transition-all hover:text-skin-muted"
            onClick={openShop}
          >
            {t('text-more-info')}
          </button>
        </div>
      </div>
      <Container>
        <Element
          name="grid"
          className="flex flex-col lg:flex-row lg:pt-8 pb-16 lg:pb-20"
        >
          <div className="flex-shrink-0 hidden lg:block lg:w-80 xl:w-[350px] 2xl:w-96 lg:sticky lg:top-16 category-mobile-sidebar">
            <div className="border border-[#EFF2F4] shadow-vendorSidebar rounded-lg">
              <ShopSidebar data={data} />
            </div>
          </div>

          <div className="w-full lg:ps-7">
            <AllProductFeed />
          </div>
        </Element>
      </Container>
      <Drawer
        placement={dir === 'rtl' ? 'right' : 'left'}
        open={displayShop}
        onClose={closeShop}
        handler={false}
        showMask={true}
        level={null}
        contentWrapperStyle={contentWrapperCSS}
      >
        <ShopSidebarDrawer data={data} />
      </Drawer>
    </>
  );
};

export default ShopsSingleDetails;
