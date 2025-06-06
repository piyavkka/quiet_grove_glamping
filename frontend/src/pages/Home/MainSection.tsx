import styled from "styled-components";
import main_img from "../../assets/Home/main_img.jpg";
import {Reservation} from "./index.tsx";
import {ImageWrapper} from "../../components/common/ImageWrapper.ts";
import {SectionWrapper} from "../../components/common/SectionWrapper.ts";
import {MainTitle} from "../../styles/theme.ts";

export default function MainSection(){
    return (
        <Section>
            <StyledImageWrapper>
                <img src={main_img} alt="Глэмпинг"/>
                <Content>
                    <MainTitle>наедине с природой, не отвлекаясь от важного</MainTitle>
                    <Reservation/>
                </Content>

            </StyledImageWrapper>
        </Section>
    );
};

const Section = styled.section`
    background-color: var(--main-color);
    width: 100%;
`;

const StyledImageWrapper = styled(ImageWrapper)`
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 70%;
        background: linear-gradient(to bottom, rgba(29, 26, 21, 0.55), transparent);
        z-index: 0;
        pointer-events: none;
    }
`;

const Content = styled(SectionWrapper)`
    position: absolute;
    bottom: 16px;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 24px;
`;