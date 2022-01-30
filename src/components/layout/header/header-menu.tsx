import Link from '@components/ui/link';
import { FaChevronDown } from 'react-icons/fa';
import ListMenu from '@components/ui/list-menu';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';

interface MenuProps {
  data: any;
  className?: string;
}

const HeaderMenu: React.FC<MenuProps> = ({ data, className }) => {
  const { t } = useTranslation('menu');
  return (
    <nav
      className={cn(
        'headerMenu flex w-full relative -mx-3 xl:-mx-4',
        className
      )}
    >
      {data?.map((item: any) => (
        <div
          className={`menuItem group cursor-pointer py-3 mx-3 xl:mx-4 ${
            item.subMenu ? 'relative' : ''
          }`}
          key={item.id}
        >
          <Link
            href={item.path}
            className="inline-flex items-center text-sm lg:text-15px text-skin-base py-2 font-normal relative group-hover:text-skin-primary"
          >
            {t(item.label)}
            {(item?.columns || item.subMenu) && (
              <span className="text-xs mt-1 xl:mt-0.5 w-4 flex justify-end text-skin-base opacity-40 group-hover:text-skin-primary">
                <FaChevronDown className="transition duration-300 ease-in-out transform group-hover:-rotate-180" />
              </span>
            )}
          </Link>

          {item?.subMenu && Array.isArray(item.subMenu) && (
            <div className="subMenu shadow-dropDown bg-skin-fill z-30 absolute start-0 opacity-0 group-hover:opacity-100">
              <ul className="text-body text-sm py-5">
                {item.subMenu.map((menu: any, index: number) => {
                  const dept: number = 1;
                  const menuName: string = `sidebar-menu-${dept}-${index}`;
                  return (
                    <ListMenu
                      dept={dept}
                      data={menu}
                      hasSubMenu={menu.subMenu}
                      menuName={menuName}
                      key={menuName}
                      menuIndex={index}
                    />
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default HeaderMenu;
