
import { SIZE_VALUES } from '@/consts/sizes';
import { generateSizeClasses } from '../size';

describe('generateSizeClasses', () => {
    it('should generate correct size classes with factor 1', () => {
        const result = generateSizeClasses(1, SIZE_VALUES);

        expect(result).toEqual({
            xs: 'w-16 h-16',
            sm: 'w-24 h-24',
            md: 'w-32 h-32',
            lg: 'w-48 h-48',
            xl: 'w-64 h-64'
        });
    });

    it('should generate correct size classes with factor 2', () => {
        const result = generateSizeClasses(2, SIZE_VALUES);

        expect(result).toEqual({
            xs: 'w-8 h-8',
            sm: 'w-12 h-12',
            md: 'w-16 h-16',
            lg: 'w-24 h-24',
            xl: 'w-32 h-32'
        });
    });
}); 