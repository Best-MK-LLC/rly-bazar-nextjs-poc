import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { FaChevronDown } from 'react-icons/fa';
import LocationIcon from '@components/icons/location-icon';
import { useModalAction } from '@components/common/modal/modal.context';
import { useUI } from '@contexts/ui.context';

interface DeliveryProps {
  className?: string;
}
const Delivery: React.FC<DeliveryProps> = ({ className }) => {
  const { t } = useTranslation('common');
  const { isAuthorized } = useUI();
  const { openModal } = useModalAction();
  function handleDeliveryView() {
    !isAuthorized ? openModal('LOGIN_VIEW') : openModal('DELIVERY_VIEW');
  }

  return (
    <div className={cn('delivery-address', className)}>
      <button
        className="inline-flex items-center text-15px text-skin-base tracking-[0.1px]"
        onClick={handleDeliveryView}
      >
        <LocationIcon />
        <span className="ps-1.5">{t('text-delivery')}:</span>
        <span className="font-semibold text-skin-primary relative top-[1px] ps-1">
          {!isAuthorized ? t('text-address') : t('text-home-address')}
        </span>
        <span className="ps-1.5 relative top-0.5">
          <FaChevronDown className="text-skin-base text-opacity-40 text-xs" />
        </span>
      </button>
    </div>
  );
};

export default Delivery;
