import { getMergedLayoutProps } from '../layouts-util';

export const FlexRow = ({ children, className = '', ...props }) => {
    const { style, ...rest } = getMergedLayoutProps(props);

    return (
        <div
            className={className}
            style={{ display: 'flex', flexDirection: 'row', ...style }}
            {...rest}
        >
            {children}
        </div>
    );
};
