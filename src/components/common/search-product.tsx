import Image from '@components/ui/image';
import Link from '@components/ui/link';
import { ROUTES } from '@utils/routes';
import { searchProductPlaceholder } from '@assets/placeholders';

type SearchProductProps = {
  item: any;
};

const SearchProduct: React.FC<SearchProductProps> = ({ item }) => {
  return (
    <Link
      href={`${ROUTES.PRODUCT}/${item?.slug}`}
      className="group w-full h-auto flex justify-start items-center"
    >
      <div className="relative flex w-12 h-12 rounded-md overflow-hidden flex-shrink-0 cursor-pointer me-4">
        <Image
          src={item?.image?.thumbnail ?? searchProductPlaceholder}
          width={48}
          height={48}
          loading="eager"
          alt={item.name || 'Product Image'}
          className="bg-skin-thumbnail object-cover"
        />
      </div>
      <div className="flex flex-col w-full overflow-hidden">
        <h3 className="truncate text-skin-base text-15px">{item.name}</h3>
      </div>
    </Link>
  );
};

export default SearchProduct;
