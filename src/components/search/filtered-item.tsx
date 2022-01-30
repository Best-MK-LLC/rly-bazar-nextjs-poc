import { useRouter } from 'next/router';
import { IoClose } from 'react-icons/io5';
import isEmpty from 'lodash/isEmpty';

interface Props {
  itemKey: string;
  itemValue: string;
}

export const FilteredItem = ({ itemKey, itemValue }: Props) => {
  const router = useRouter();
  const { pathname, query } = router;

  function handleClose() {
    const currentItem = (query[itemKey]! as string)
      .split(',')
      .filter((i) => i !== itemValue);
    delete query[itemKey];
    router.push({
      pathname,
      query: {
        ...query,
        ...(!isEmpty(currentItem) ? { [itemKey]: currentItem.join(',') } : {}),
      },
    });
  }
  return (
    <div
      className="group flex flex-shrink-0 m-1 items-center border border-skin-base rounded-lg text-13px px-2.5 py-1.5 capitalize text-skin-base cursor-pointer transition duration-200 ease-in-out hover:border-skin-primary"
      onClick={handleClose}
    >
      {itemValue}
      <IoClose className="text-sm text-body ms-2 flex-shrink-0 -me-0.5 mt-0.5 transition duration-200 ease-in-out group-hover:text-heading" />
    </div>
  );
};
