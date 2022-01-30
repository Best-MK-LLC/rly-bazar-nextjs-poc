import { useState } from 'react';
import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import TextArea from '@components/ui/form/text-area';
import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import cn from 'classnames';
import StarRatingComponent from 'react-star-rating-component';
import StarIcon from '@components/icons/star-icon';

interface ReviewFormProps {
  className?: string;
}
interface ReviewFormValues {
  name: string;
  email: string;
  cookie: string;
  message: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormValues>();
  const [rating_custom_icon, set_rating_custom_icon] = useState(1);
  function onSubmit(values: ReviewFormValues) {
    console.log(values, 'review');
  }
  const onStarClickCustomIcon = (
    nextValue: number,
    prevValue: number,
    name: string
  ) => {
    console.log(
      'name: %s, nextValue: %s, prevValue: %s',
      name,
      nextValue,
      prevValue
    );
    set_rating_custom_icon(nextValue);
  };
  return (
    <div className={cn(className)}>
      <Heading className="mb-2">Write your review</Heading>
      <Text>
        Your email address will not be published. Required fields are marked*
      </Text>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto flex flex-col justify-center mt-5 lg:mt-7 xl:mt-9"
        noValidate
      >
        <div className="flex flex-col space-y-5 md:space-y-6 lg:space-y-7">
          <div className="pb-1.5 flex items-center">
            <label className="flex-shrink-0 block text-skin-base text-sm md:text-15px leading-none cursor-pointer pe-3">
              {t('forms:label-your-rating')}
            </label>
            <StarRatingComponent
              name="app3"
              starCount={5}
              value={rating_custom_icon}
              onStarClick={onStarClickCustomIcon}
              starColor="#F3B81F"
              emptyStarColor="#DFE6ED"
              renderStarIcon={() => (
                <StarIcon className="w-3.5 lg:w-4 h-3.5 lg:h-4" />
              )}
            />
          </div>
          <Input
            label={t('forms:label-name-star')}
            {...register('name', { required: 'Name is required' })}
            error={errors.name?.message}
            variant="solid"
          />
          <TextArea
            variant="solid"
            label="forms:label-message-star"
            {...register('message', { required: 'Message is required' })}
            error={errors.message?.message}
          />
          <div className="flex flex-col md:flex-row space-y-5 md:space-y-0">
            <Input
              label={t('forms:label-name-star')}
              {...register('name', { required: 'Name is required' })}
              className="w-full md:w-1/2 "
              error={errors.name?.message}
              variant="solid"
            />
            <Input
              label={t('forms:label-email-star')}
              type="email"
              {...register('email', {
                required: 'forms:email-required',
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'forms:email-error',
                },
              })}
              className="w-full md:w-1/2 md:ms-2.5 lg:ms-5 mt-2 md:mt-0"
              error={errors.email?.message}
              variant="solid"
            />
          </div>
          <div className="pt-1">
            <Button
              type="submit"
              className="h-12 md:mt-1 text-sm lg:text-base w-full sm:w-auto"
            >
              {t('common:button-submit')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
