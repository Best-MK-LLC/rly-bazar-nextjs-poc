import { useState } from 'react';
import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import Logo from '@components/ui/logo';
import { useSignUpMutation, SignUpInputType } from '@framework/auth/use-signup';
import Link from '@components/ui/link';
import { useTranslation } from 'next-i18next';
import Image from '@components/ui/image';
import { useModalAction } from '@components/common/modal/modal.context';
import Switch from '@components/ui/switch';
import CloseButton from '@components/ui/close-button';
import cn from 'classnames';
import { ROUTES } from '@utils/routes';

interface SignUpFormProps {
  isPopup?: boolean;
  className?: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  isPopup = true,
  className,
}) => {
  const { t } = useTranslation();
  const { mutate: signUp, isLoading } = useSignUpMutation();
  const { closeModal, openModal } = useModalAction();
  const [remember, setRemember] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputType>();

  function handleSignIn() {
    return openModal('LOGIN_VIEW');
  }
  function handleForgetPassword() {
    return openModal('FORGET_PASSWORD');
  }
  function onSubmit({ name, email, password, remember_me }: SignUpInputType) {
    signUp({
      name,
      email,
      password,
      remember_me,
    });
    console.log(name, email, password, 'sign form values');
  }
  return (
    <div
      className={cn(
        'flex bg-skin-fill mx-auto rounded-lg w-full lg:w-[1000px] 2xl:w-[1200px]',
        className
      )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}
      <div className="flex bg-skin-fill mx-auto rounded-lg overflow-hidden w-full">
        <div className="md:w-[55%] xl:w-[60%] registration hidden md:block">
          <Image
            src="/assets/images/registration.png"
            alt="sign up"
            width={800}
            height={620}
            className="w-full"
          />
        </div>
        <div className="w-full md:w-[45%] xl:w-[40%] py-6 sm:py-10 px-4 sm:px-8 lg:px-12  rounded-md shadow-dropDown flex flex-col justify-center">
          <div className="text-center mb-6 pt-2.5">
            <div onClick={closeModal}>
              <Logo />
            </div>
            <h4 className="text-skin-base font-semibold text-xl sm:text-2xl  sm:pt-3 ">
              {t('common:text-sign-up-for-free')}
            </h4>
            <div className="text-sm sm:text-base text-body text-center mt-3 mb-1">
              {t('common:text-already-registered')}
              <button
                type="button"
                className="ms-1 text-sm sm:text-base text-skin-primary font-semibold hover:no-underline focus:outline-none"
                onClick={handleSignIn}
              >
                {t('common:text-sign-in-now')}
              </button>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
            noValidate
          >
            <div className="flex flex-col space-y-4">
              <Input
                label={t('forms:label-name')}
                type="text"
                variant="solid"
                {...register('name', {
                  required: 'forms:name-required',
                })}
                error={errors.name?.message}
              />
              <Input
                label={t('forms:label-email')}
                type="email"
                variant="solid"
                {...register('email', {
                  required: `${t('forms:email-required')}`,
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: t('forms:email-error'),
                  },
                })}
                error={errors.email?.message}
              />
              <PasswordInput
                label={t('forms:label-password')}
                error={errors.password?.message}
                {...register('password', {
                  required: `${t('forms:password-required')}`,
                })}
              />
              <div className="flex items-center justify-center">
                <div className="flex items-center flex-shrink-0">
                  <label className="switch relative inline-block w-10 cursor-pointer">
                    <Switch checked={remember} onChange={setRemember} />
                  </label>

                  <label
                    htmlFor="remember"
                    className="flex-shrink-0 text-sm text-heading ps-5 mt-1 cursor-pointer"
                  >
                    {t('forms:label-remember-me')}
                  </label>
                </div>
                <div className="flex ms-auto mt-[2px]" onClick={closeModal}>
                  <Link
                    href={ROUTES.PRIVACY}
                    className="text-end text-sm text-heading ps-3 hover:no-underline hover:text-skin-base focus:outline-none focus:text-skin-base"
                  >
                    {t('common:text-privacy-and-policy')}
                  </Link>
                </div>
              </div>
              <div className="relative">
                <Button
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading}
                  className="h-11 md:h-12 w-full mt-2 font-15px md:font-15px tracking-normal"
                  variant="formButton"
                >
                  {t('common:text-register')}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
