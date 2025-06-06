import { useState } from "react";
import styled from "styled-components";
import {Button} from "../../components/common/Button.tsx";
import {SectionWrapper} from "../../components/common/SectionWrapper.ts";
import {FlexWrapper} from "../../components/common/FlexWrapper.ts";
import {H2Dark, P, theme} from "../../styles/theme.ts";

export default function Route() {
    const [isActive, setIsActive] = useState(false);

    return (
        <section>
            <SectionWrapper>
                <FlexWrapper justify="space-between" wrap="wrap" gap="clamp(20px, 3vw, 80px)">
                    <MapWrapper className={isActive ? "active" : ""} onClick={() => setIsActive(true)}>
                        <iframe
                            src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad31d6bcef6c6ac64e41786b39e3002f65c03a4fcea89270a0f2d4efa1c49e5a6&amp;source=constructor"
                            allowFullScreen
                            loading="lazy"
                            title="Карта местности"
                        />
                    </MapWrapper>

                    <TextContent direction="column" justify="space-between" gap="10px">
                        <H2Dark>Как добраться</H2Dark>
                        <h3>📍Мы находимся по адресу:</h3>
                        <P>Нижегородская область, посёлок Ильиногорск, микрорайон Ильиногорец-2, д. 77</P>
                        <h4>3 способа добраться:</h4>
                        <h4>🚗 На машине</h4>
                        <P>Примерно 60 км от Нижнего Новгорода по автодороге на Ильиногорск. Удобный съезд и хорошая дорога
                            прямо до нас.</P>
                        <h4>🚉 На общественном транспорте</h4>
                        <P>Электричка с Московского вокзала Нижнего Новгорода до станции «Ильиногорск» (в пути около часа).
                            Затем 10 минут на такси.</P>
                        <h4>🚐 Трансфер</h4>
                        <P>Мы можем организовать для вас трансфер из Нижнего Новгорода прямо до нас — по запросу.</P>

                        <Button href="https://yandex.ru/maps/11079/nizhny-novgorod-oblast'/?ll=42.959843%2C56.221208&mode=routes&rtext=~56.221499%2C42.960563&rtt=auto&ruri=~ymapsbm1%3A%2F%2Fgeo%3Fdata%3DIgoNntcrQhXR4mBC&z=16">Построить маршрут</Button>
                    </TextContent>
                </FlexWrapper>
            </SectionWrapper>
        </section>

    );
}

const MapWrapper = styled.div`
    border-radius: 10px;
    overflow: hidden;
    width: 600px;
    height: 500px;
    box-shadow: ${theme.shadow.elements};
    cursor: grab;

    &.active {
        cursor: auto;

        iframe {
            pointer-events: auto;
        }
    }

    iframe {
        width: 100%;
        height: 100%;
        border: none;
        pointer-events: none;
    }

    @media (max-width: 768px) {
        margin-top: 10px;
        height: 300px;
    }
`;

const TextContent = styled(FlexWrapper)`
    flex: 1;
    height: 500px;
    
    h3, h4{
        font-weight: ${theme.fontWeight.semibold};
        color: ${theme.fontColor.main};
    }
`;