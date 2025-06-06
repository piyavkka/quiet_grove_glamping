import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

interface OverlayProps {
    children: React.ReactNode;
    onClose: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ children, onClose }) => {
    if (typeof document === "undefined") return null;

    return ReactDOM.createPortal(
        <OverlayWrapper onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>
                    <CloseIcon fontSize="large" />
                </CloseButton>
                {children}
            </ModalContent>
        </OverlayWrapper>,
        document.body
    );
};

export default Overlay;

const OverlayWrapper = styled.div`
    position: fixed;
    inset: 0;                
    background: rgba(0, 0, 0, 0.6);
    z-index: 1000;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled.div`
    position: relative;
    max-width: 1440px;
    width: fit-content;
    margin: 0 auto;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
    background: transparent;
    color: var(--main-color);

    &:hover {
        opacity: 0.5;
    }
`;