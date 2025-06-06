import styled from 'styled-components';

interface FlexWrapperProps {
    justify?: 'flex-start' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    align?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
    direction?: 'row' | 'column';
    gap?: string;
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
}

export const FlexWrapper = styled.div<FlexWrapperProps>`
    display: flex;
    justify-content: ${({ justify = 'flex-start' }) => justify};
    align-items: ${({ align = 'stretch' }) => align};
    flex-direction: ${({ direction = 'row' }) => direction};
    gap: ${({ gap = '0' }) => gap};
    flex-wrap: ${({ wrap = 'nowrap' }) => wrap};
`;