import Layout from '@components/layout/layout';
import SignupForm from '@components/auth/sign-up-form';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Seo from '@components/seo/seo';
import Divider from '@components/ui/divider';

export default function SignInPage() {
  return (
    <>
      <Seo
        title="Sign Up"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="signup"
      />
      <Divider />
      <div className="flex justify-center items-center">
        <div className="py-16 lg:py-20">
          <SignupForm
            isPopup={false}
            className="border border-skin-base rounded-lg"
          />
        </div>
      </div>
      <Divider />
    </>
  );
}

SignInPage.Layout = Layout;

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
