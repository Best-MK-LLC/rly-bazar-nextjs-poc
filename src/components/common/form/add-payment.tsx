import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import { useModalState } from '@components/common/modal/modal.context';

interface ContactFormValues {
  title: string;
  name: string;
  country: string;
  type: string;
  number: number;
  zip: string;
  default: boolean;
}

const AddPaymentForm: React.FC = () => {
  const { data } = useModalState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: {
      title: data || data?.title ? data?.title : '',
      name: data || data?.card?.name ? data?.card?.name : '',
      country:
        data || data?.card?.address_country ? data?.card?.address_country : '',
      type: data || data?.type ? data?.type : '',
      number: data || data?.card?.number ? data?.card?.number : '',
      zip: data || data?.card?.address_zip ? data?.card?.address_zip : '',

      default: data || data?.default ? data?.default : '',
    },
  });

  function onSubmit(values: ContactFormValues) {
    console.log(values, 'Add Payment');
  }

  return (
    <div className="w-full md:w-[508px] mx-auto p-5 sm:p-8 bg-white rounded-xl">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-6">
          <Input
            variant="solid"
            label="Title"
            {...register('title', { required: 'Title Required' })}
            error={errors.title?.message}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mb-6 gap-7">
          <Input
            variant="solid"
            label="Name"
            {...register('name', { required: 'Name Required' })}
            error={errors.country?.message}
          />
          <Input
            variant="solid"
            label="Country"
            {...register('country', { required: 'City Required' })}
            error={errors.country?.message}
          />
          <Input
            variant="solid"
            label="Type"
            {...register('type', { required: 'type Required' })}
            error={errors.type?.message}
          />
          <Input
            variant="solid"
            label="Card Number"
            {...register('number', { required: 'type Required' })}
            error={errors.number?.message}
          />
          <Input
            variant="solid"
            label="ZIP"
            {...register('zip', { required: 'ZIP Required' })}
            error={errors.zip?.message}
          />
        </div>
        <div className="mb-6">
          <input
            id="default-type"
            type="checkbox"
            className="form-checkbox w-5 h-5 border border-gray-300 rounded cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-heading"
            {...register('default', { required: 'Default type Required' })}
          />
          <label htmlFor="default-type" className="align-middle ms-3">
            Set Default Payment
          </label>
        </div>
        <Button className="h-11 md:h-12 w-full mt-1.5" type="submit">
          Save Payment
        </Button>
      </form>
    </div>
  );
};

export default AddPaymentForm;
