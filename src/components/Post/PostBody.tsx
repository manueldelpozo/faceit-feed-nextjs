import { truncateText } from '@/helpers/text';
import type { PropsWithClassName } from '@/types/utility';

interface IProps extends PropsWithClassName {
    body: string;
    maxLength?: number;
}

const PostBody = ({ body, maxLength = 0, className = '' }: IProps) => (
    <p className={`text-gray-500 leading-relaxed ${className}`}>
        {maxLength > 0 ? truncateText(body, maxLength) : body}
    </p>
);

export default PostBody; 
