import cn from 'classnames';

interface Props {
  className?: string;
  variations: any;
  attributes: any;
  setAttributes: (key: any) => void;
}

const ProductAttributes: React.FC<Props> = ({
  className = 'mb-2 pt-0.5',
  variations,
  attributes,
  setAttributes,
}) => {
  if (!variations) return null;
  return (
    <>
      {Object.keys(variations).map((variationName, index) => (
        <div className={cn(className)} key={index}>
          <h4 className="text-15px text-skin-base text-opacity-70 font-normal mb-3 capitalize">
            {variationName.split('-').join(' ')}:
          </h4>

          <ul className="flex flex-wrap -me-2">
            {variations[variationName].map((attribute: any) => (
              <li
                key={attribute.id}
                className={cn(
                  'cursor-pointer rounded border h-9 md:h-10 p-1 mb-2 md:mb-3 me-2 flex justify-center items-center font-medium text-sm md:text-15px text-skin-base transition duration-200 ease-in-out hover:text-skin-primary hover:border-skin-primary px-3',
                  {
                    'border-skin-primary text-skin-primary':
                      attributes[variationName] === attribute.value,
                  }
                )}
                onClick={() =>
                  setAttributes((prev: any) => ({
                    ...prev,
                    [variationName]: attribute.value,
                  }))
                }
              >
                {attribute.value}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default ProductAttributes;
