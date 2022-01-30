import CloseButton from '@components/ui/close-button';
import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import {
  useModalState,
  useModalAction,
} from '@components/common/modal/modal.context';
import { useTranslation } from 'next-i18next';

interface ContactFormValues {
  title: string;
  number: string;
  default: boolean;
}

const AddContactForm: React.FC = () => {
  const { t } = useTranslation();
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: {
      title: data || data?.title ? data?.title : '',
      number: data || data?.number ? data?.number : '',
      default: data || data?.default ? data?.default : '',
    },
  });

  function onSubmit(values: ContactFormValues) {
    console.log(values, 'Add Contact');
  }

  return (
    <div className="w-full md:w-[510px] mx-auto p-5 sm:p-8 bg-skin-fill rounded-md">
      <CloseButton onClick={closeModal} />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-6">
          <Input
            variant="solid"
            label="forms:label-contact-title"
            {...register('title', { required: 'forms:contact-title-required' })}
            error={errors.title?.message}
          />
        </div>
        <div className="mb-6">
          <Input
            variant="solid"
            label="forms:label-contact-number"
            {...register('number', {
              required: 'forms:contact-number-required',
            })}
            error={errors.number?.message}
          />
        </div>
        <div className="mb-6">
          <input
            id="default-type"
            type="checkbox"
            className="form-checkbox w-5 h-5 border border-gray-300 rounded cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none   focus:checked:bg-skin-primary hover:checked:bg-skin-primary checked:bg-skin-primary"
            {...register('default', {
              required: 'forms:default-type-required',
            })}
          />
          <label
            htmlFor="default-type"
            className="align-middle ms-3 text-sm text-skin-muted"
          >
            {t('common:text-default-contact-number')}
          </label>
        </div>
        <Button className="h-11 md:h-12 w-full mt-1.5" type="submit">
          {t('common:text-save-number')}
        </Button>
      </form>
    </div>
  );
};

export default AddContactForm;
