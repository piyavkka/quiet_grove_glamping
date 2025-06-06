import React from "react";
import {P, Span, theme} from "../../styles/theme";
import {format} from "date-fns";
import {ru as ruLocale} from "date-fns/locale";
import {FormControlLabel, Checkbox} from "@mui/material";
import {FillDropdown} from "../../components/common/FillDropdown";
import {FlexWrapper} from "../../components/common/FlexWrapper";
import styled, {css} from "styled-components";
import {fillOptions, Sauna} from "../../components/Data/BathData";
import {Button} from "../../components/common/Button.tsx";
import {useBathPricing} from "./useBathPricing.ts";
import {SaunaSectionProps} from "./types.ts";

export const SaunaSection: React.FC<SaunaSectionProps> = (
    {
        saunaSlotsData,
        selectedSaunaSlots,
        toggleSlot,
        addTub,
        setAddTub,
        selectedFillId,
        setSelectedFillId
    }) => {
    const {
        saunaHoursCount,
        saunaCost,
        tubBasePrice,
        isTubFree,
        tubFillPrice
    } = useBathPricing(selectedSaunaSlots, addTub, selectedFillId);

    const extendedFillOptions = [
        ...fillOptions,
        {
            id: Math.max(...fillOptions.map(o => o.id)) + 1,
            label: "Без наполнения",
            price: null,
        },
    ];

    return (
        <FlexWrapper direction="column" gap="8px">
            <P>
                Выберите не менее двух часов аренды бани. Стоимость: {Sauna.find(s => s.id === 1)?.price}₽ / час
            </P>

            <SaunaContainer>
                {saunaSlotsData.map(({date, slots}) => {
                    const dateKey = format(date, "yyyy-MM-dd");
                    return (
                        <div style={{marginBottom: 24}} key={dateKey}>
                            <P style={{ fontWeight: '600', marginBottom: '8px' }}>
                                {format(date, "d MMMM, EEEE", { locale: ruLocale })}
                            </P>
                            <FlexWrapper wrap="wrap" gap="8px">
                                {slots.map((slot) => {
                                    const isSel = selectedSaunaSlots[dateKey]?.has(slot) ?? false;
                                    return (
                                        <SlotButton key={slot} selected={isSel} onClick={() => toggleSlot(dateKey, slot)}>
                                            {slot}
                                        </SlotButton>
                                    );
                                })}
                            </FlexWrapper>
                        </div>
                    );
                })}
            </SaunaContainer>

            <P>
                Аренда чана: {tubBasePrice}₽. При брони бани на 2+ часа — бесплатно
            </P>

            <TubSection>
                <FormControlLabel
                    control={<Checkbox checked={addTub} onChange={() => setAddTub(!addTub)} />}
                    label={<P>Добавить чан</P>}
                />
                {addTub && (
                    <CustomDropdownWrapper>
                        <FillDropdown
                            fillOptions={extendedFillOptions}
                            selectedId={selectedFillId}
                            setSelectedId={setSelectedFillId}
                            renderOptionExtra={(option) => option.price ? `+${option.price}₽ ` : null}
                        />
                    </CustomDropdownWrapper>
                )}
            </TubSection>

            <div>
                {saunaHoursCount >= 2 && <P>Баня: {saunaCost}₽</P>}
                {addTub && !isTubFree && <P>Аренда чана: {tubBasePrice}₽</P>}
                {addTub && <P>Наполнение: {tubFillPrice}₽</P>}
                <Span>
                    Всего: {
                    (saunaHoursCount >= 2 ? saunaCost : 0) +
                    (addTub && !isTubFree ? tubBasePrice : 0) +
                    (addTub ? tubFillPrice : 0)
                }₽
                </Span>
            </div>
        </FlexWrapper>
    );
};

const SaunaContainer = styled.div`
    max-height: 300px;
    overflow-y: auto;
    padding: 14px;
    background-color: var(--white-color);
    border: 1px solid var(--light-text-color);
    border-radius: 5px;
`;

const SlotButton = styled(Button)<{ selected?: boolean }>`
    width: 180px;
    padding: 8px 12px;
    ${({ selected }) =>
    selected &&
    css`
            color: ${theme.fontColor.main};
            background-color: var(--light-text-color);

            &:hover {
                background-color: var(--light-text-color);
            }
        `}
`;

const TubSection = styled.div`
    display: flex;
    flex-direction: column;
    
    label {
        cursor: pointer;
        user-select: none;
    }
`;

const CustomDropdownWrapper = styled.div`
    max-width: 390px;

    button {
        padding: 8px 24px;
        border-radius: 5px;
    }

    span {
        font-weight: 400;
        font-size: 16px;
    }

    li {
        padding: 10px 22px;
    }
`;
