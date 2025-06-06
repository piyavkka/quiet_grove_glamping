import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {P, Question, theme} from "../styles/theme.ts";
import {faq} from "./Data/housesData.ts";

export default function AccordionUsage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(prev => (prev === index ? null : index));
    };

    return (
        <AccordionContainer>
            {faq.map((item, index) => (
                <AccordionItemComponent
                    key={index}
                    item={item}
                    isOpen={openIndex === index}
                    onClick={() => toggle(index)}
                />
            ))}
        </AccordionContainer>
    );
}

function AccordionItemComponent(
    {
        item,
        isOpen,
        onClick,
    }: {
        item: { question: string; answer: string };
        isOpen: boolean;
        onClick: () => void;
    }) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (isOpen && contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        } else {
            setHeight(0);
        }
    }, [isOpen]);

    return (
        <div>
            <AccordionQuestion onClick={onClick}>
                <Question>{item.question}</Question>
                {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </AccordionQuestion>
            <AccordionAnswerWrapper height={height} isOpen={isOpen}>
                <div ref={contentRef}>
                    <StyledP>{item.answer}</StyledP>
                </div>
            </AccordionAnswerWrapper>
        </div>
    );
}

const AccordionContainer = styled.div`
    max-width: 1010px;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const AccordionQuestion = styled.button`
    width: 100%;
    padding: 16px 24px;
    background: rgba(173, 195, 151, 0.82);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 28px;
`;

const AccordionAnswerWrapper = styled.div<{ height: number; isOpen: boolean }>`
    height: ${({height}) => height}px;
    margin-top: ${({isOpen}) => (isOpen ? '12px' : '0')};
    opacity: ${({isOpen}) => (isOpen ? 1 : 0)};
    transition: all 0.3s ease;
    overflow: hidden;
    background-color: ${theme.fontColor.light};
    border-radius: 28px;
`;

const StyledP = styled(P)`
    padding: 16px 24px;
    text-align: left;
`;