import {H3Dark, Span, theme} from "../../styles/theme.ts";
import {SliderComponent} from "../../components/common/SliderComponent.tsx";
import {Button} from "../../components/common/Button.tsx";
import {FlexWrapper} from "../../components/common/FlexWrapper.ts";
import styled from "styled-components";
import { House } from "./types";

type Props = {
    houses: House[];
    selectedHouse: number | null;
    onSelect: (id: number) => void;
    showButton: boolean;
};

export default function HousesSection({ houses, selectedHouse, onSelect, showButton }: Props) {
    return (
        <FlexWrapper gap="24px" wrap="wrap">
            {houses.map(
                ({ id, title, images, timeFirst, timeSecond, people, cost,  basePrice, totalPrice }) => (
                    <CardHouse
                        key={id}
                        direction="column"
                        gap="14px"
                        align="center"
                        selected={selectedHouse === id}
                    >
                        <H3Dark>{title}</H3Dark>
                        <SliderComponent
                            images={images}
                            autoplay={false}
                            height="250px"
                        />
                        <List>
                            <li>Заезд после {timeFirst}</li>
                            <li>Выезд до {timeSecond}</li>
                            <li>Вместимость до {people} человек</li>
                        </List>

                        <>
                            {basePrice != null && (
                                <Span>За сутки {basePrice}₽</Span>
                            )}
                            {totalPrice != null && (
                                <Span>За всё время: {totalPrice}₽</Span>
                            )}
                            {basePrice == null && totalPrice == null && (
                                <Span>от {cost}₽ / в сутки</Span>
                            )}
                        </>

                        {showButton && (
                            <Button
                                onClick={() => onSelect(id)}
                                disabled={selectedHouse === id}
                                style={{
                                    opacity: selectedHouse === id ? 0.6 : 1,
                                    cursor: selectedHouse === id ? "default" : "pointer",
                                }}
                            >
                                {selectedHouse === id ? "выбрано" : "выбрать"}
                            </Button>
                        )}
                    </CardHouse>
                )
            )}
            <InfoBanner>
                <strong>Внимание:</strong> в зависимости от дней цены могут различаться.
                Для просмотра актуальной стоимости выберите нужные даты.
            </InfoBanner>
        </FlexWrapper>
    );
}


const CardHouse = styled(FlexWrapper)<{ selected?: boolean }>`
    width: min(380px, calc(100vw - 112px));
    max-width: 380px;
    border-radius: 10px;
    border: ${({selected}) =>
    selected ? "1px solid var(--main-color)" : "1px solid var(--light-text-color)"};
    padding: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
    background-color: var(--white-color);

    &:hover {
        transform: ${({selected}) => (selected ? "none" : "scale(1.02)")};
    }
`;

const List = styled.ul`
    list-style-type: disc;
    padding-left: 14px;
    color: inherit;
    text-align: left;

    li {
        margin-bottom: 8px;
        color: ${theme.fontColor.main};
        font-size: ${theme.fontSize.P};
    }
`;

const InfoBanner = styled.div`
    margin: 0 auto;
    background-color: var(--white-color);
    padding: 14px 24px;
    border-radius: 10px;
    border: 1px solid ${theme.fontColor.light};
`;