import styled from "styled-components";
import { Button } from "../../components/common/Button.tsx";
import React, { useCallback, useMemo, useState } from "react";
import TextField from "@mui/material/TextField";
import QRCode from "react-qr-code";
import { FlexWrapper } from "../../components/common/FlexWrapper";
import { ContactSectionProps } from "./types";
import {P, Span } from "../../styles/theme.ts";

function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    let result = "+7";
    if (digits.length > 1) result += " (" + digits.slice(1, 4);
    if (digits.length >= 4) result += ") " + digits.slice(4, 7);
    if (digits.length >= 7) result += "-" + digits.slice(7, 9);
    if (digits.length >= 9) result += "-" + digits.slice(9, 11);
    return result;
}

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactSection(
    {
        onVerified,
        onFinalSubmit,
        summary,
    }: ContactSectionProps) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isFormValid = useMemo(() => {
        return name.trim() !== "" && phone.replace(/\D/g, "").length === 11 && isValidEmail(email);
    }, [name, phone, email]);

    const {
        houseCost,
        saunaCost,
        tubCost,
        tubFillPrice,
        total,
        saunaHoursCount,
        addTub,
        selectedFillId,
    } = summary;

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            if (!isFormValid || loading) return;

            setLoading(true);
            setError(null);

            try {
                const response = await fetch("http://localhost:8080/verification", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: name.trim(),
                        phone: `+${phone.replace(/\D/g, "")}`,
                        email: email.trim(),
                    }),
                });

                if (!response.ok) {
                    const errText =
                        (await response.text()) || "Ошибка верификации, попробуйте позже.";
                    setError(errText);
                    return;
                }

                const { code } = (await response.json()) as { code: string };
                setCode(code);
                onVerified?.(code);
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : "Сетевая ошибка, попробуйте ещё раз.";
                console.error(message);
                setError(message);
            } finally {
                setLoading(false);
            }
        },
        [name, phone, email, isFormValid, onVerified, loading]
    );

    const qrValue = code ? `https://t.me/QuiteGrove_bot?start=${code}` : "";

    return (
        <FlexWrapper gap="16px" justify="center" wrap="wrap">
            <InfoCard direction="column" gap="8px">
                <Span>Ваше бронирование</Span>
                <P>Домик: {houseCost}₽</P>
                {saunaHoursCount > 0 && <P>Баня: {saunaCost}₽</P>}
                {addTub && (
                    <>
                        <P>Чан: {tubCost > 0 ? `${tubCost}₽` : "бесплатно"}</P>
                        {selectedFillId !== 0 && <P>Наполнение: {tubFillPrice}₽</P>}
                    </>
                )}
                <P>Итоговая стоимость: {total}₽</P>
            </InfoCard>

            <Form onSubmit={handleSubmit}>
                <StyledTextField placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} variant="outlined" required />
                <StyledTextField
                    placeholder="+7 (999) 999-99-99"
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    variant="outlined"
                    required
                />
                <StyledTextField
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    required
                    type="email"
                />
                <Button type="submit" disabled={!isFormValid || loading || !!code}>
                    {loading ? "Отправка…" : code ? "Код отправлен" : "Подтвердить"}
                </Button>
                {error && <ErrorMsg>{error}</ErrorMsg>}
            </Form>

            {code && (
                <QRWrapper direction="column" gap="8px" align="center">
                    <P>
                        Ваш код подтверждения: <strong>{code}</strong>
                    </P>

                    <P>
                        Отсканируйте QR-код или нажмите ссылку ниже — бот откроется, и код
                        передастся автоматически.
                    </P>

                    <QRCode value={qrValue} size={164} />

                    <a href={qrValue} target="_blank" rel="noopener noreferrer" >
                        Открыть Telegram-бот
                    </a>

                    <Button
                        onClick={onFinalSubmit}
                        disabled={!code}
                    >
                        Отправить
                    </Button>
                </QRWrapper>
            )}
        </FlexWrapper>
    );
}

const InfoCard = styled(FlexWrapper)`
    background-color: var(--white-color);
    padding: 14px 24px;
    width: fit-content;
    border-radius: 5px;
    border: 1px solid var(--light-text-color);
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 480px;
`;

const StyledTextField = styled(TextField)`
    & .MuiInputBase-root {
        background-color: var(--white-color);
    }

    & .MuiOutlinedInput-input {
        padding: 14px 24px;
    }
`;

const QRWrapper = styled(FlexWrapper)`
    text-align: center;
    max-width: 480px;

    a {
        color: var(--main-color);
        transition: 0.2s;
        &:hover {
            opacity: 0.5;
        }
    }
`;

const ErrorMsg = styled.span`
    color: red;
    font-size: 14px;
`;