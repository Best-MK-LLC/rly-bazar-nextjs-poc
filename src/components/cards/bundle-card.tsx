import Heading from '@components/ui/heading';
import Image from '@components/ui/image';
import Link from '@components/ui/link';
import { LinkProps } from 'next/link';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';

interface Props {
  imgWidth?: number | string;
  imgHeight?: number | string;
  className?: string;
  thumbnailClassName?: string;
  href: LinkProps['href'];
  bundle: {
    image: string;
    title: string;
    description?: string;
    bgColor?: string;
  };
}

const BundleCard: React.FC<Props> = ({
  bundle,
  imgWidth = 180,
  imgHeight = 150,
  className = '',
  thumbnailClassName = 'w-36 lg:w-32 xl:w-40 2xl:w-36 3xl:w-[180px] pe-1.5 2xl:pe-2.5',
  href,
}) => {
  const { image, title, description, bgColor } = bundle;
  const { t } = useTranslation('common');
  return (
    <Link href={href} className={cn('group flex', className)}>
      <div
        className="flex w-full overflow-hidden items-center relative"
        style={{ backgroundColor: bgColor }}
      >
        <div className={cn('flex flex-shrink-0', thumbnailClassName)}>
          <Image
            src={image ?? '/assets/placeholder/collection.svg'}
            alt={t(title) || t('text-card-thumbnail')}
            width={imgWidth}
            height={imgHeight}
            className="bg-sink-thumbnail object-cover transition duration-200 ease-in-out transform group-hover:scale-105"
          />
        </div>
        <div className="py-3 lg:py-5 pe-4 lg:pe-3 xl:pe-4">
          <Heading variant="title" className="mb-[5px]">
            {t(title)}
          </Heading>
          <p className="text-sm lg:text-13px xl:text-sm leading-6">
            {t(`${description}`)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BundleCard;
