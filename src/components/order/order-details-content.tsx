import usePrice from '@framework/product/use-price';
import Image from '@components/ui/image';

export const OrderDetailsContent: React.FC<{ item?: any }> = ({ item }) => {
  const { price } = usePrice({
    amount: item.price,
    currencyCode: 'USD',
  });
  return (
    <div className="relative grid grid-cols-12 py-2 pb-0 border-b border-solid border-skin-base text-[12px] md:text-[14px]">
      <div className="col-span-2 self-center">
        <Image
          src={item.image.thumbnail}
          alt={item?.name || 'Product Image'}
          width="60"
          height="60"
          quality={100}
          className="object-cover"
        />
      </div>
      <div className="col-span-5 self-center">
        <h2 className="text-skin-base">{item.name}</h2>
      </div>
      <div className="col-span-3 self-center md:text-start text-center">
        {typeof item.quantity === 'number' && <p>{item.quantity}x</p>}
      </div>
      <div className="col-span-2 self-center">
        {typeof item.price === 'number' && <p>{price}</p>}
      </div>
    </div>
  );
};
