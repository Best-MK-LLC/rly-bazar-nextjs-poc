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
  effectActive?: boolean;
  href: LinkProps['href'];
  bundle: {
    image: string;
    title: string;
    description?: string;
    color?: string;
  };
}

const BundleCardGrid: React.FC<Props> = ({
  bundle,
  imgWidth = 593,
  imgHeight = 490,
  className = '',
  effectActive = true,
  href,
}) => {
  const { image, title } = bundle;
  const { t } = useTranslation('common');
  return (
    <Link href={href} className={cn('group flex', className)}>
      <div className="flex w-full overflow-hidden items-center relative">
        <div className="flex flex-shrink-0 relative max-w-full">
          <Image
            src={image ?? '/assets/placeholder/collection.svg'}
            alt={t(title) || t('text-card-thumbnail')}
            width={imgWidth}
            height={imgHeight}
            className="bg-sink-thumbnail object-cover"
          />
        </div>
        {effectActive && (
          <div className="absolute top-0 -start-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
        )}
      </div>
    </Link>
  );
};

export default BundleCardGrid;
