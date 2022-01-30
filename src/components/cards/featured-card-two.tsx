import Heading from '@components/ui/heading';
import Link from '@components/ui/link';
import cn from 'classnames';
import { LinkProps } from 'next/link';
import { useTranslation } from 'next-i18next';
import { IoCaretForward } from 'react-icons/io5';
import Text from '@components/ui/text';

interface ItemProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface Props {
  className?: string;
  item: ItemProps;
}

const FeaturedCard: React.FC<Props> = ({ item, className }) => {
  const { t } = useTranslation('common');
  const { icon, title, description } = item;
  return (
    <div
      className={cn(
        'group p-5 md:px-6 xl:px-7 3xl:px-9 flex items-center justify-between bg-[#F4F2EB]',
        className
      )}
    >
      <div className="pe-4 md:pe-5 lg:pe-4 3xl:pe-10">
        <Heading variant="title" className="mb-1.5 -mt-0.5">
          {t(title)}
        </Heading>
        <Text>{t(description)}</Text>
      </div>
      <div className="flex flex-shrink-0 items-center justify-center bg-skin-fill rounded-full w-[80px] xl:w-24 3xl:w-[110px] h-[80px] xl:h-24 3xl:h-[110px]">
        {icon}
      </div>
    </div>
  );
};

export default FeaturedCard;
