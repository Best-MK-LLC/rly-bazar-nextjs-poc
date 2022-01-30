import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import { ShopFilters } from '@components/search/filters';
import { ProductGrid } from '@components/product/product-grid';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DownloadApps from '@components/common/download-apps';
import { GetStaticProps } from 'next';
import PageHeroSection from '@components/ui/page-hero-section';
import { useTranslation } from 'next-i18next';
import SearchTopBar from '@components/search/search-top-bar';
import { Element } from 'react-scroll';
import Seo from '@components/seo/seo';

export default function Products() {
  const { t } = useTranslation('common');
  return (
    <>
      <Seo
        title="Products"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="products"
      />
      <PageHeroSection heroTitle={t('text-all-grocery-items')} />
      <Container>
        <Element name="grid" className="flex pt-7 lg:pt-11 pb-16 lg:pb-20">
          <div className="flex-shrink-0 pe-8 xl:pe-16 hidden lg:block w-80 xl:w-96 sticky top-16 h-full">
            <ShopFilters />
          </div>
          <div className="w-full lg:-ms-2 xl:-ms-8 lg:-mt-1">
            <SearchTopBar />
            <ProductGrid />
          </div>
        </Element>
      </Container>
      <DownloadApps />
    </>
  );
}

Products.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
