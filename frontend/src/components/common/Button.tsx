import React from "react";
import styled from "styled-components";
import {theme} from "../../styles/theme.ts";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
    children: React.ReactNode;
}

const RawButton: React.FC<ButtonProps> = ({href, children, ...props}) => {
    if (href) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{textDecoration: "none"}}
            >
                <button {...props}>{children}</button>
            </a>
        );
    }

    return <button {...props}>{children}</button>;
};

export const Button = styled(RawButton)`
    background-color: var(--main-color);
    color: var(--light-text-color);
    padding: 14px 24px;
    border-radius: 5px;
    text-transform: uppercase;
    font-weight: ${theme.fontWeight.semibold};
    width: 260px;
    transition: all 0.2s;
    font-size: ${theme.fontSize.button};
    cursor: pointer;
    border: none;
    text-align: center;

    &:hover {
        background-color: var(--accent-color);
    }

    @media (max-width: 768px) {
        margin: 0 auto;
    }
`;
