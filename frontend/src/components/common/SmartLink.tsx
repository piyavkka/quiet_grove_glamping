import React from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {
    to: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;

} & React.HTMLAttributes<HTMLElement>;

export const SmartLink: React.FC<Props> = (
    {
        to,
        children,
        className,
        onClick,
        ...rest
    }) => {
    const location = useLocation();
    const isExternal = /^https?:\/\//.test(to);
    const isTel = /^tel:/.test(to);
    const isActive = location.pathname === to;

    const handleClick = onClick ?? undefined;

    if (isExternal || isTel) {
        return (
            <a
                href={to}
                className={className}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                onClick={handleClick}
                {...rest}
            >
                {children}
            </a>
        );
    }

    return (
        <Link
            to={to}
            className={className}
            aria-current={isActive ? "page" : undefined}
            onClick={handleClick}
            {...rest}
        >
            {children}
        </Link>
    );
};
