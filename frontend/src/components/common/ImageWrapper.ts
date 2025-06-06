import styled from "styled-components";
import {theme} from "../../styles/theme.ts";

export const ImageWrapper = styled.div`
    width: 100%;
    display: block;
    margin: 0 auto;
    height: 670px;
    overflow: hidden;
    position: relative;
    box-shadow: ${theme.shadow.elements};
`;