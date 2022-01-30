import Container from '@components/ui/container';
import Image from '@components/ui/image';
import { siteSettings } from '@settings/site-settings';
import { useTranslation } from 'next-i18next';

interface CopyrightProps {
  payment?: {
    id: string | number;
    path?: string;
    name: string;
    image: string;
    width: number;
    height: number;
  }[];
}
const year = new Date().getFullYear();
const Copyright: React.FC<CopyrightProps> = ({ payment }) => {
  const { t } = useTranslation('footer');
  return (
    <div className="pb-20 lg:pb-7">
      <Container>
        <div className="flex flex-col md:flex-row text-center md:justify-between border-t border-skin-three pt-6 lg:pt-7">
          <p className="text-skin-base text-sm leading-7 lg:leading-[27px] lg:text-15px">
            &copy;&nbsp;{t('text-copyright')} {year}&nbsp;
            <a
              className="text-skin-base transition-colors duration-200 ease-in-out hover:text-skin-primary"
              href={siteSettings.author.websiteUrl}
            >
              {siteSettings.author.name}
            </a>
            &nbsp; {t('text-all-rights-reserved')}
          </p>

          {payment && (
            <ul className="flex flex-wrap justify-center items-center space-s-4 sm:space-s-5 lg:space-s-7 -mb-1.5 md:mb-0 mx-auto md:mx-0 pt-3.5 md:pt-0">
              {payment?.map((item) => (
                <li
                  className="mb-2 md:mb-0 transition hover:opacity-80 inline-flex"
                  key={`payment-list--key${item.id}`}
                >
                  <a
                    href={item.path ? item.path : '/#'}
                    target="_blank"
                    className="inline-flex"
                    rel="noreferrer"
                  >
                    <Image
                      src={item.image}
                      alt={t(item.name)}
                      height={item.height}
                      width={item.width}
                    />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Copyright;
