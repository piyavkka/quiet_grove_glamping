import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../../components/common/Button.tsx";
import { theme } from "../../styles/theme.ts";
import { Add, Remove } from "@mui/icons-material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ru as ruLocale } from "date-fns/locale";
import TextField from "@mui/material/TextField";
import { format, addDays, isAfter } from "date-fns";
import {FlexWrapper} from "../../components/common/FlexWrapper.ts";
import { useNavigate } from 'react-router-dom';

const StyledTextField = styled(TextField)`
    & .MuiInputBase-root {
        background-color: var(--light-text-color);
    }

    & .MuiOutlinedInput-input {
        padding: 14px 24px;
    }
`;

const GuestField = styled(StyledTextField)`
    width: 70px;

    & .MuiOutlinedInput-input {
        padding: 10px 24px;
        text-align: center;
        -moz-appearance: textfield;
    }

    & .MuiOutlinedInput-input::-webkit-outer-spin-button,
    & .MuiOutlinedInput-input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
`;

const datePickerCommon = {
    enableAccessibleFieldDOMStructure: false as const,
    slots: { textField: StyledTextField },
    slotProps: { textField: { fullWidth: true, required: true } },
};

export default function ReservationForm() {
    const navigate = useNavigate();

    const [checkIn, setCheckIn]   = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);
    const [guestsCount, setGuestsCount] = useState(2);

    const handleGuestsChange = (delta: number) =>
        setGuestsCount(prev => Math.min(30, Math.max(1, prev + delta)));

    const handleGuestsInput = (e: React.ChangeEvent<HTMLInputElement>) =>
        setGuestsCount(Math.min(30, Math.max(1, Number(e.target.value))));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!checkIn || !checkOut) return;

        const params = new URLSearchParams({
            checkIn: format(checkIn, 'yyyy-MM-dd'),
            checkOut: format(checkOut, 'yyyy-MM-dd'),
            guests: String(guestsCount),
        });
        navigate(`/reservation?${params.toString()}`);
    };

    return (
        <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={ruLocale}
        >
            <Form onSubmit={handleSubmit}>
                <FieldGroup>
                    <Label htmlFor="check-in">Дата заезда</Label>
                    <DatePicker
                        value={checkIn}
                        onChange={newDate => {
                            setCheckIn(newDate);
                            if (checkOut && newDate && !isAfter(checkOut, newDate)) {
                                setCheckOut(null);
                            }
                        }}
                        disablePast
                        {...datePickerCommon}
                    />
                </FieldGroup>

                <FieldGroup>
                    <Label htmlFor="check-out">Дата выезда</Label>
                    <DatePicker
                        value={checkOut}
                        onChange={setCheckOut}
                        minDate={checkIn ? addDays(checkIn, 1) : addDays(new Date(), 1)}
                        disabled={!checkIn}
                        {...datePickerCommon}
                    />
                </FieldGroup>

                <FlexWrapper direction="column" align="center">
                    <Label htmlFor="guests">Количество гостей</Label>
                    <FlexWrapper align="center">
                        <IconBtn type="button" onClick={() => handleGuestsChange(-1)}>
                            <Remove/>
                        </IconBtn>

                        <GuestField
                            type="number"
                            value={guestsCount}
                            onChange={handleGuestsInput}
                            required
                        />

                        <IconBtn type="button" onClick={() => handleGuestsChange(1)}>
                            <Add />
                        </IconBtn>
                    </FlexWrapper>
                </FlexWrapper>

                <Button type="submit">найти</Button>
            </Form>
        </LocalizationProvider>
    );
}

const Form = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;

    background-color: var(--elem-color);
    border-radius: 10px;
    padding: 24px 56px;
    box-shadow: ${theme.shadow.elements};
    width: 100%;

    @media (max-width: 768px) {
        gap: 24px;
        justify-content: center;
    }
`;

const FieldGroup = styled.div`
    max-width: 280px;
`;

const Label = styled.label`
    font-weight: ${theme.fontWeight.medium};
`;

const IconBtn = styled.button`
    background: none;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        font-size: 30px;
        color: var(--main-color);
        transition: 0.2s;

        &:hover {
            color: var(--accent-color);
        }
    }
`;