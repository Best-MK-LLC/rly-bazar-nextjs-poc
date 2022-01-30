type FooterItemProps = {
  id: string;
  name: string;
  price: string;
};
export const CheckoutCardFooterItem: React.FC<{ item: FooterItemProps }> = ({
  item,
}) => {
  return (
    <div className="flex items-center py-4 lg:py-5 border-b border-skin-base text-sm w-full text-15px text-skin-base font-medium  last:border-b-0 last:text-base last:pb-0">
      {item.name}
      <span className="ms-auto flex-shrink-0 text-15px text-skin-base font-normal">
        {item.price}
      </span>
    </div>
  );
};
