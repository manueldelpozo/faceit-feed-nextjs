import { PLACEHOLDER_VARIANTS } from '@/consts/placeholder';
import { TPlaceholderVariant } from '@/types/placeholder';
import type { PropsWithClassName } from '@/types/utility';
import { getPlaceholderClasses } from '@/utils/placeholder';

interface IProps extends PropsWithClassName {
    variant?: TPlaceholderVariant;
}

const PlaceholderItem = ({ variant = PLACEHOLDER_VARIANTS.LIST, className = '' }: IProps) => {
    const { containerClasses, titleClasses } = getPlaceholderClasses(variant);
    const isDetail = variant === PLACEHOLDER_VARIANTS.DETAIL;

    return (
        <div className={`${containerClasses} ${className}`}>
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

export default PlaceholderItem;
