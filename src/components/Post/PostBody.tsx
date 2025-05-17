import { truncateText } from '@/helpers/text';

interface IProps {
    body: string;
    maxLength?: number;
    className?: string;
}

const PostBody = ({ body, maxLength = 0, className = '' }: IProps) => (
    <p className={`text-gray-500 leading-relaxed ${className}`}>
        {maxLength > 0 ? truncateText(body, maxLength) : body}
    </p>
);

export default PostBody; 