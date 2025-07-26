import { getMergedLayoutProps } from '../layouts-util';

export const FlexColumn = ({ children, className = '', ...props }) => {
    const { style, ...rest } = getMergedLayoutProps(props);

    return (
        <div
            className={className}
            style={{ display: 'flex', flexDirection: 'column', ...style }}
            {...rest}
        >
            {children}
        </div>
    );
};
