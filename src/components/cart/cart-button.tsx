import CartIcon from '@components/icons/cart-icon';
import { useCart } from '@contexts/cart/cart.context';
import { useUI } from '@contexts/ui.context';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';

type CartButtonProps = {
  className?: string;
  iconClassName?: string;
  hideLabel?: boolean;
  isShowing?: boolean;
};

const CartButton: React.FC<CartButtonProps> = ({
  className,
  iconClassName = 'text-skin-base text-opacity-40',
  hideLabel,
  isShowing,
}) => {
  const { t } = useTranslation('common');
  const { openDrawer, setDrawerView } = useUI();
  const { totalItems } = useCart();
  function handleCartOpen() {
    setDrawerView('CART_SIDEBAR');
    isShowing;
    return openDrawer();
  }

  return (
    <button
      className={cn(
        'flex items-center justify-center flex-shrink-0 h-auto focus:outline-none transform',
        className
      )}
      onClick={handleCartOpen}
      aria-label="cart-button"
    >
      <div className="flex items-center relative">
        <CartIcon className={cn(iconClassName)} />
        <span className="cart-counter-badge flex items-center justify-center bg-skin-primary text-skin-inverted absolute -top-2.5 start-2.5 rounded-full font-bold">
          {totalItems}
        </span>
      </div>
      {!hideLabel && (
        <span className="text-sm lg:text-15px text-skin-base font-normal ms-2">
          {t('text-cart')}
        </span>
      )}
    </button>
  );
};

export default CartButton;
