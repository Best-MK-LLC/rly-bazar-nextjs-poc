import { useTranslation } from 'next-i18next';
import Link from '@components/ui/link';
import Image from '@components/ui/image';
import { ROUTES } from '@utils/routes';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';

type VendorCardProps = {
  shop?: any;
};

const VendorCard: React.FC<VendorCardProps> = ({ shop }) => {
  const { t } = useTranslation();
  const placeholderImage = `/assets/placeholder/products/product-grid.svg`;
  const { name, slug, address, logo } = shop;
  return (
    <Link
      href={`${ROUTES.SHOPS}/${slug}`}
      className="flex items-center px-5 xl:px-7 py-5 xl:py-7 border border-skin-base rounded-lg shadow-vendorCard cursor-pointer relative bg-white transition-all hover:shadow-vendorCardHover"
    >
      <div className="relative flex flex-shrink-0 items-center justify-center bg-skin-thumbnail rounded-full overflow-hidden w-16 xl:w-20 h-16 xl:h-20">
        <Image
          alt={t('common:text-logo')}
          src={logo?.thumbnail ?? placeholderImage}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="flex flex-col ms-4 xl:ms-5">
        <Heading variant="mediumHeading" className="pb-1.5">
          {name}
        </Heading>
        <Text className="xl:leading-6">{address}</Text>
      </div>
    </Link>
  );
};

export default VendorCard;
