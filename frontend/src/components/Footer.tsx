import styled from "styled-components";
import { P } from "../styles/theme";
import { SectionWrapper } from "./common/SectionWrapper.ts";

function Footer() {
    const year = new Date().getFullYear();

    return (
        <FooterWrapper>
            <SectionWrapper>
                <P style={{ textAlign: "center" }}>
                    © {year} Quiet Grove. Все права защищены.
                </P>
            </SectionWrapper>
        </FooterWrapper>
    );
}

export default Footer;

export const FooterWrapper = styled.footer`
    width: 100%;
    background-color: var(--light-text-color);
`;