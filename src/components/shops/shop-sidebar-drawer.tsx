import Scrollbar from '@components/ui/scrollbar';
import { useUI } from '@contexts/ui.context';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { getDirection } from '@utils/get-direction';
import { useRouter } from 'next/router';
import ShopSidebar from '@components/shops/shop-sidebar';
import { useTranslation } from 'react-i18next';

interface Props {
  data: any;
}

const ShopSidebarDrawer: React.FC<Props> = ({ data }) => {
  const { closeShop } = useUI();
  const { t } = useTranslation('common');
  const router = useRouter();
  const dir = getDirection(router.locale);
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="w-full border-b border-skin-base flex justify-between items-center relative pe-5 md:pe-7 flex-shrink-0 py-0.5">
        <button
          className="flex text-2xl items-center justify-center text-skin-base px-4 md:px-5 py-6 lg:py-8 focus:outline-none transition-opacity hover:opacity-60"
          onClick={closeShop}
          aria-label="close"
        >
          {dir === 'rtl' ? (
            <IoArrowForward className="text-black" />
          ) : (
            <IoArrowBack className="text-black" />
          )}
        </button>
        <h2 className="font-bold text-xl md:text-2xl m-0 text-skin-base w-full text-center pe-6">
          {t('text-details')}
        </h2>
      </div>

      <Scrollbar className="shop-sidebar-scrollbar flex-grow mb-auto">
        <ShopSidebar data={data} />
      </Scrollbar>
    </div>
  );
};

export default ShopSidebarDrawer;
