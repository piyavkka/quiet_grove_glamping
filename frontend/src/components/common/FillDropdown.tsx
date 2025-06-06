import React, {useState} from "react";
import styled from "styled-components";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Span, theme} from "../../styles/theme.ts";

interface FillDropdownProps {
    fillOptions: { id: number; label: string }[];
    selectedId: number;
    setSelectedId: (id: number) => void;
    renderOptionExtra?: (option: { id: number; label: string; price?: number }) => React.ReactNode;
}

export const FillDropdown: React.FC<FillDropdownProps> = (
    {
        fillOptions,
        selectedId,
        setSelectedId,
        renderOptionExtra,
    }) => {
    const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const toggleDropdown = () => setDropdownOpen((prev) => !prev);
    const selectedOption = fillOptions.find((opt) => opt.id === selectedId);

    return (
        <DropdownWrapper>
            <DropdownButton onClick={toggleDropdown}>
                <StyledSpan>
                    {selectedOption?.label}
                    {isDropdownOpen ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                </StyledSpan>
            </DropdownButton>

            {isDropdownOpen && (
                <DropdownList>
                    {fillOptions
                        .filter((option) => option.id !== 0)
                        .map((option) => (
                            <li
                                key={option.id}
                                onClick={() => {
                                    setSelectedId(option.id);
                                    setDropdownOpen(false);
                                }}
                            >
                                {renderOptionExtra?.(option)}
                                {option.label}

                            </li>
                        ))}
                </DropdownList>
            )}
        </DropdownWrapper>
    );
};

const DropdownWrapper = styled.div`
    position: relative;
    display: inline-block;
    width: 100%;
`;

const DropdownButton = styled.button`
    background-color: ${theme.fontColor.additional};
    padding: 14px 24px;
    border-radius: 10px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledSpan = styled(Span)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    color: ${theme.fontColor.light};
`;

const DropdownList = styled.ul`
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px 0;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 100;

    li {
        padding: 14px 24px;
        cursor: pointer;

        &:hover {
            background-color: #f0f0f0;
        }
    }
`;
