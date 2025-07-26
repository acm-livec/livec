import { getMergedLayoutProps } from '../layouts-util';

export const Container = ({ children, className = '', ...props }) => {
    const { style, ...rest } = getMergedLayoutProps(props);

    return (
        <div
            className={className}
            style={{ display: 'flex', ...style }}
            {...rest}
        >
            {children}
        </div>
    );
};
