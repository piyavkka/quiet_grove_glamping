import React, { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { ru as ruLocale } from "date-fns/locale";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Add, Remove } from "@mui/icons-material";

import { H2Dark, P } from "../styles/theme.ts";
import { Button } from "./common/Button.tsx";
import { FlexWrapper } from "./common/FlexWrapper.ts";

const StyledTextField = styled(TextField)`
    & .MuiInputBase-root {
        background-color: var(--white-color);
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
    disablePast: true,
    enableAccessibleFieldDOMStructure: false as const,
    slots: { textField: StyledTextField },
    slotProps: { textField: { fullWidth: true, required: true } },
};

function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    let result = "+7";
    if (digits.length > 1) result += " (" + digits.slice(1, 4);
    if (digits.length >= 4) result += ") " + digits.slice(4, 7);
    if (digits.length >= 7) result += "-" + digits.slice(7, 9);
    if (digits.length >= 9) result += "-" + digits.slice(9, 11);
    return result;
}

interface FormEventsProps {
    onSubmitted?: () => void;
}

export default function FormEvents({ onSubmitted }: FormEventsProps) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [agree, setAgree] = useState(false);
    const [guestsCount, setGuestsCount] = useState(2);

    const isFormValid = useMemo(() => {
        return (
            name.trim() !== "" &&
            phone.replace(/\D/g, "").length === 11 &&
            checkIn !== null &&
            agree &&
            guestsCount > 0
        );
    }, [name, phone, checkIn, agree, guestsCount]);

    const handleGuestsChange = (delta: number) =>
        setGuestsCount((prev) => Math.min(30, Math.max(1, prev + delta)));

    const handleGuestsInput = (e: React.ChangeEvent<HTMLInputElement>) =>
        setGuestsCount(Math.min(30, Math.max(1, Number(e.target.value))));

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            if (!isFormValid) {
                return;
            }
            console.log({
                name,
                phone: `+${phone.replace(/\D/g, "")}`,
                checkIn: checkIn ? format(checkIn, "yyyy-MM-dd") : null,
                agree,
                guestsCount,
            });
            onSubmitted?.();
        },
        [name, phone, checkIn, agree, guestsCount, isFormValid, onSubmitted]
    );

    return (
        <FormCard onSubmit={handleSubmit}>
            <H2Dark>Отдохните от быстрого ритма жизни в глэмпинге «Тихая роща»</H2Dark>
            <StyledP>
                Заполните форму, мы свяжемся в течение 15 минут и поможем
                забронировать отдых
            </StyledP>

            <StyledTextField
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                required
            />

            <StyledTextField
                placeholder="+7 (999) 999-99-99"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                variant="outlined"
                required
            />

            <StyledP>Когда планируете приехать?</StyledP>
            <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={ruLocale}
            >
                <DatePicker value={checkIn} onChange={setCheckIn} {...datePickerCommon} />
            </LocalizationProvider>

            <NoAsteriskLabel
                control={
                    <Checkbox
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                        required
                    />
                }
                label={
                    <StyledP>
                        Я соглашаюсь с&nbsp;
                        <PrivacyLink
                            href="/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            политикой конфиденциальности
                        </PrivacyLink>
                    </StyledP>
                }
                disableTypography
            />

            <StyledP>Количество человек</StyledP>
            <FlexWrapper align="center">
                <IconBtn type="button" onClick={() => handleGuestsChange(-1)}>
                    <Remove />
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

            <Button type="submit">
                Отправить
            </Button>
        </FormCard>
    );
}

const FormCard = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 600px;
    background-color: var(--light-text-color);
    padding: 30px;
    border-radius: 10px;
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

const StyledP = styled(P)`
    @media (max-width: 768px) {
        text-align: center;
    }
`;

const PrivacyLink = styled.a`
    color: var(--accent-color);
    text-decoration: underline;
    transition: color 0.2s;

    &:hover {
        color: var(--main-color);
    }
`;

const NoAsteriskLabel = styled(FormControlLabel)`
    .MuiFormControlLabel-asterisk {
        display: none;
    }
`;
