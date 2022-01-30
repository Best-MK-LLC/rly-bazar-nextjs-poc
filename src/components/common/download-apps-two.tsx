import Image from '@components/ui/image';
import cn from 'classnames';
import Link from '@components/ui/link';
import { useTranslation } from 'next-i18next';
const data = {
  title: 'app-heading',
  description: 'app-description',
  appBG: '/assets/images/app-bg.png',
  appImage: '/assets/images/app-thumbnail-2.png',
  appButtons: [
    {
      id: 1,
      slug: '/#',
      altText: 'button-app-store',
      appButton: '/assets/images/app-store.png',
      buttonWidth: 170,
      buttonHeight: 56,
    },
    {
      id: 2,
      slug: '/#',
      altText: 'button-play-store',
      appButton: '/assets/images/play-store.png',
      buttonWidth: 170,
      buttonHeight: 56,
    },
  ],
};

interface Props {
  className?: string;
}

const DownloadAppsTwo: React.FC<Props> = ({ className = 'pt-1.5 md:pt-0' }) => {
  const { appButtons, title, description, appImage, appBG } = data;
  const { t } = useTranslation('common');
  return (
    <div
      className={cn('bg-skin-three overflow-hidden bg-cover bg-top', className)}
      style={{
        backgroundImage: `url(${appBG})`,
      }}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-5 md:px-6 lg:px-16 xl:px-28 2xl:px-32 3xl:px-40 md:flex justify-between">
        <div className="flex-shrink-0 mx-auto md:ms-0 lg:flex lg:items-center pb-5 pt-1.5 md:pt-4 max-w-[350px] md:max-w-[340px] lg:max-w-[485px] xl:max-w-[540px] 2xl:max-w-[690px] 3xl:ps-10">
          <div className="py-8 xl:py-10 2xl:py-16 mb-1 text-center md:text-start">
            <h2 className="text-[22px] md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-[42px] leading-9 lg:leading-[1.4em] xl:leading-[1.45em] text-skin-base font-bold font-manrope -tracking-[0.2px] mb-3 lg:mb-4">
              {t(title)}
            </h2>
            <p className="text-15px xl:text-base 2xl:text-[17px] leading-7 xl:leading-9 text-skin-base text-opacity-70 pb-5 lg:pb-7 pe-0 xl:pe-8 2xl:pe-20">
              {t(description)}
            </p>
            <div className="flex justify-center md:justify-start space-s-2 md:space-s-2.5 pt-0.5 px-7 sm:px-0">
              {appButtons?.map((item) => (
                <Link
                  key={item.id}
                  href={item.slug}
                  className="inline-flex transition duration-200 ease-in hover:box-shadow hover:opacity-80"
                >
                  <Image
                    src={item.appButton}
                    alt={t(item.altText)}
                    className="w-36 lg:w-44 xl:w-auto rounded-md"
                    width={item.buttonWidth}
                    height={item.buttonHeight}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-end ps-4 2xl:ps-0 md:max-w-[450px] lg:max-w-[660px] xl:max-w-auto -me-10 lg:-me-16 xl:-me-10 3xl:me-7">
          <Image
            src={appImage}
            alt={t('text-app-thumbnail')}
            width={660}
            height={465}
            quality={100}
          />
        </div>
      </div>
    </div>
  );
};

export default DownloadAppsTwo;
