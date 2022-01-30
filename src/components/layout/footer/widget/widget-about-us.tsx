import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Logo from '@components/ui/logo';
import Text from '@components/ui/text';
import Image from '@components/ui/image';
import { ROUTES } from '@utils/routes';

interface AboutProps {
  className?: string;
  social?: {
    id: string | number;
    path?: string;
    name: string;
    image: string;
    width: number;
    height: number;
  }[];
}
const WidgetAbout: React.FC<AboutProps> = ({ social, className }) => {
  const { t } = useTranslation('footer');

  return (
    <div className={`pb-10 sm:pb-0 ${className}`}>
      <div className="flex flex-col text-center sm:text-start max-w-[300px] mx-auto sm:ms-0 pb-6 sm:pb-5">
        <Logo href={ROUTES.HOME} className="mb-3 lg:mb-5 mx-auto sm:ms-0" />
        <Text>{t('text-about-us')}</Text>
      </div>

      {social && (
        <ul className="flex flex-wrap justify-center sm:justify-start space-s-4 md:space-s-5 mx-auto md:mx-0">
          {social?.map((item) => (
            <li
              className="transition hover:opacity-80"
              key={`social-list--key${item.id}`}
            >
              <Link href={item.path ? item.path : '/#'}>
                <a target="_blank" rel="noreferrer">
                  <Image
                    src={item.image}
                    alt={item.name}
                    height={item.height}
                    width={item.width}
                    className="transform scale-85 md:scale-100"
                  />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WidgetAbout;
