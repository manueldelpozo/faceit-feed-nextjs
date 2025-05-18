import { PLACEHOLDER_VARIANTS, TPlaceholderVariant } from '@/types/placeholder';
import { createPlaceholders, getPlaceholderClasses } from '@/utils/placeholder';

interface IProps {
    variant?: TPlaceholderVariant;
}

const PlaceholderItem = ({ variant = PLACEHOLDER_VARIANTS.LIST }: IProps) => {
    const { containerClasses, titleClasses } = getPlaceholderClasses(variant);
    const isDetail = variant === PLACEHOLDER_VARIANTS.DETAIL;

    return (
        <div className={containerClasses}>
            <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-gray-700" />
                <div className="ml-2 w-32 h-4 bg-gray-700 rounded" />
            </div>

            <div className={titleClasses} />

            <div className="space-y-2">
                <div className="w-full h-4 bg-gray-700 rounded" />
                <div className="w-5/6 h-4 bg-gray-700 rounded" />
                <div className="w-4/6 h-4 bg-gray-700 rounded" />
                {isDetail && (
                    <>
                        <div className="w-full h-4 bg-gray-700 rounded" />
                        <div className="w-5/6 h-4 bg-gray-700 rounded" />
                        <div className="w-4/6 h-4 bg-gray-700 rounded" />
                    </>
                )}
            </div>
        </div>
    );
};

export { createPlaceholders };
export default PlaceholderItem;
