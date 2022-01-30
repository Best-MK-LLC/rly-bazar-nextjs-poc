import CategoryDropdownSidebar from '@components/category/category-dropdown-sidebar';
import { useModalAction } from '@components/common/modal/modal.context';
import { useTranslation } from 'next-i18next';

const CategoryPopup: React.FC = () => {
  const { t } = useTranslation('common');
  const { closeModal } = useModalAction();
  return (
    <div className="flex flex-col bg-skin-fill mx-auto rounded-t w-full relative overflow-hidden h-inherit">
      <CategoryDropdownSidebar className="w-full" />
      <div className="p-4 w-full bg-skin-fill shadow-card border-skin-base flex-shrink-0 absolute bottom-0">
        <button
          onClick={closeModal}
          aria-label="Close Modal"
          className="w-full bg-skin-two tracking-[0.025em] rounded-md transition duration-200 h-14 text-center font-semibold text-sm block hover:bg-skin-primary hover:text-skin-inverted focus:outline-none"
        >
          {t('text-close')}
        </button>
      </div>
    </div>
  );
};

export default CategoryPopup;
