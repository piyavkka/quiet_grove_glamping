import {useState} from "react";
import styled from "styled-components";
import logo from '/src/assets/logo.png';
import {theme} from "../styles/theme.ts";
import { SmartLink } from "./common/SmartLink.tsx";
import {FlexWrapper} from "./common/FlexWrapper.ts";
import {Button} from "./common/Button.tsx";

import { SiVk } from "react-icons/si";
import { FaTelegram } from "react-icons/fa";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const closeMenu = () => setIsOpen(false);

    return (
        <StyledHeader>
            <HeaderWrapper>
                <Container>
                    <StyledSmartLink to="/">
                        <Img src={logo} alt="Logo"/>
                        <LogoSpan>Тихая Роща</LogoSpan>
                    </StyledSmartLink>

                    <StyledFlexWrapper>
                        <StyledSmartLink to="https://t.me/yourchannel"><FaTelegram/></StyledSmartLink>
                        <StyledSmartLink
                            to="tel:+79867427080"
                            data-mobile-visible
                            data-no-gap
                        >
                            <MdOutlinePhoneIphone/>
                            <Span>+7 (986) 742 70 80</Span>
                        </StyledSmartLink>

                        <StyledSmartLink to="https://vk.com"><SiVk/></StyledSmartLink>
                        <StyledSmartLink to="https://yandex.ru/maps/11079/nizhny-novgorod-oblast'/house/2_ya_ilyinogorskaya_ulitsa_77/YEsYfwFgTEMEQFtsfX5zcHhqbQ==/?ll=42.959843%2C56.221208&z=16.17">
                            <FaLocationDot/>
                            <Span>Нижегородская область,<br />посёлок Ильиногорск</Span>
                        </StyledSmartLink>
                    </StyledFlexWrapper>
                    <MenuToggleButton onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <CloseIcon /> : <MenuIcon />}
                    </MenuToggleButton>
                </Container>
            </HeaderWrapper>
            <Navigation isOpen={isOpen}>
                <NavList>
                    <li><NavLink to="/" onClick={closeMenu}>О нас</NavLink></li>
                    <li><NavLink to="/houses" onClick={closeMenu}>Домики</NavLink></li>
                    <li><NavLink to="/entertainment" onClick={closeMenu}>Развлечения</NavLink></li>
                    <li><NavLink to="/events" onClick={closeMenu}>Мероприятия</NavLink></li>
                    <li><NavLink to="/bath-complex" onClick={closeMenu}>Банный комплекс</NavLink></li>
                </NavList>

                {isOpen && (
                    <MobileContacts direction="column">
                        <MobileLink to="https://t.me/yourchannel">
                            <FaTelegram/>
                            <Span>@quiet_grove</Span>
                        </MobileLink>
                        <MobileLink to="https://vk.com">
                            <SiVk/>
                            <Span>@quiet_grove</Span>
                        </MobileLink>
                        <MobileLink to="https://yandex.ru/maps/11079/nizhny-novgorod-oblast'/house/2_ya_ilyinogorskaya_ulitsa_77/YEsYfwFgTEMEQFtsfX5zcHhqbQ==/?ll=42.959843%2C56.221208&z=16.17">
                            <FaLocationDot/>
                            <Span>посёлок Ильиногорск</Span>
                        </MobileLink>
                        <Button as={SmartLink} to="/reservation" onClick={closeMenu}>
                            Забронировать
                        </Button>
                    </MobileContacts>
                )}
            </Navigation>
        </StyledHeader>
    );
};

const StyledHeader= styled.header`
    position: sticky;
    top: 0;
    z-index: 1000;
    width: 100%;
    box-shadow: ${theme.shadow.elements};
`;

const HeaderWrapper = styled.div`
    height: 50px;
    background-color: var(--main-color);
`;

const Container = styled.div`
    padding: 0 clamp(15px, 5vw, 80px);
    max-width: 1440px;
    margin: 0 auto;
    height: 100%;
    align-items: center;
    display: flex;
    justify-content: space-between;
`;

const Img = styled.img`
    border-radius: 50%;
    width: 36px;
    height: 36px;
`;

const StyledFlexWrapper = styled(FlexWrapper)`
    gap: ${theme.gap.small};

    @media (max-width: 768px) {
        a:not([data-mobile-visible]) {
            display: none;
        }
    }
`;

const StyledSmartLink = styled(SmartLink)`
    color: ${theme.fontColor.main};
    display: flex;
    align-items: center;
    gap: ${theme.gap.icons};
    transition: 0.2s ease;

    &[data-no-gap] {
        gap: 0;
    }

    svg {
        width: 26px;
        height: 26px;
    }
    
    &:hover {
        color: ${theme.fontColor.additional};
    }
`;

const Span = styled.span`
    font-weight: ${theme.fontWeight.semibold};
`;

const LogoSpan = styled.span`
    font-size: ${theme.fontSize.logo};
    font-weight: ${theme.fontWeight.bold};
`;

const Navigation = styled.nav<{ isOpen?: boolean }>`
    height: 40px;
    background-color: var(--add-color);

    @media (max-width: 768px) {
        position: fixed;
        top: 50px;
        right: -100%;
        width: 100%;
        height: 100vh;
        background-color: var(--add-color);
        transform: ${({ isOpen }) => (isOpen ? "translateX(-100%)" : "translateX(0)")};
        transition: transform 0.3s linear;
    }
`;

const NavList = styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 clamp(15px, 5vw, 80px);
    max-width: 1440px;
    margin: 0 auto;
    height: 100%;

    @media (max-width: 768px) {
        padding: 20px 0;
        height: auto;
        gap: ${theme.gap.small};
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
`;

const NavLink = styled(SmartLink)`
    color: ${theme.fontColor.main};
    transition: 0.2s ease;
    font-weight: ${theme.fontWeight.semibold};

    &[aria-current="page"] {
        color: ${theme.fontColor.light};
    }

    &:hover {
        color: ${theme.fontColor.light};
    }
`;

const MenuToggleButton = styled.button`
    display: none;
    background: transparent;

    @media (max-width: 768px) {
        display: block;
        color: ${theme.fontColor.main};
        svg {
            width: 28px;
            height: 28px;
        }
    }
`;

const MobileContacts = styled(FlexWrapper)`
    display: none;
    
    @media (max-width: 768px) {
        display: flex;
        gap: ${theme.gap.small};
        padding: 0 clamp(15px, 5vw, 80px);
    }
`;

const MobileLink = styled(StyledSmartLink)`
    &:hover{
        color: ${theme.fontColor.light};
    }
`;