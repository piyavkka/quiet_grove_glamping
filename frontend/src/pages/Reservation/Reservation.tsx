import { SectionWrapper } from "../../components/common/SectionWrapper.ts";
import styled from "styled-components";
import { useEffect, useMemo, useState, useCallback } from "react";
import { P, Span, theme } from "../../styles/theme.ts";
import { FlexWrapper } from "../../components/common/FlexWrapper.ts";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "../../components/common/Button.tsx";
import ResPageForm from "./ResPageForm.tsx";
import { format, parse, differenceInCalendarDays } from "date-fns";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import HousesSection from "./HousesSection.tsx";
import { House, AvailableHouse, Bathhouse, BathhouseSlot } from "./types";
import { SaunaSection } from "./SaunaSection.tsx";
import { useBathPricing } from "./useBathPricing.ts";
import ContactSection from "./ContactSection.tsx";
import { useLocation } from "react-router-dom";

const buildHourlySlots = (from: string, to: string): string[] => {
    const [fromH] = from.split(":"), [toH] = to.split(":");
    const start = Number(fromH);
    const end = Number(toH);
    const res: string[] = [];
    for (let h = start; h <= end; h++) {
        res.push(`${h.toString().padStart(2, "0")}:00`);
    }
    return res;
};

export default function Reservation() {
    const [houses, setHouses] = useState<House[]>([]);
    const [checkIn,  setCheckIn]  = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);
    const [, setGuestCount] = useState<number>(2);

    const [availableHouses, setAvailableHouses] = useState<AvailableHouse[] | null>(null);
    const [selectedHouseId, setSelectedHouseId] = useState<number | null>(null);

    const [selectedSaunaSlots, setSelectedSaunaSlots] = useState<Record<string, Set<string>>>({});
    const [addTub, setAddTub] = useState(false);
    const [selectedFillId, setSelectedFillId] = useState<number>(0);

    const [page, setPage] = useState(0);
    const [showAlert,  setShowAlert]  = useState(false);
    const [showSuccess,setShowSuccess]= useState(false);

    const [, setVerificationCode] = useState<string | null>(null);

    const location = useLocation();

    const fetchAvailableHouses = useCallback(
        async (inDate: Date, outDate: Date, guests: number) => {
            const url = `http://localhost:8080/reservation?guests=${guests}&in=${format(
                inDate, "yyyy-MM-dd")}&out=${format(outDate,"yyyy-MM-dd")}`;

            const res = await fetch(url);
            if (!res.ok) {
                console.error("Ошибка при получении доступных домов:", res.statusText);
                return;
            }
            setAvailableHouses(await res.json());
            setGuestCount(guests);
        },
        []
    );

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const checkInParam = query.get("checkIn");
        const checkOutParam = query.get("checkOut");
        const guestsParam = query.get("guests");

        if (checkInParam && checkOutParam && guestsParam) {
            const parsedCheckIn = parse(checkInParam, "yyyy-MM-dd", new Date());
            const parsedCheckOut = parse(checkOutParam, "yyyy-MM-dd", new Date());
            const guests = parseInt(guestsParam, 10);

            setCheckIn(parsedCheckIn);
            setCheckOut(parsedCheckOut);
            void fetchAvailableHouses(parsedCheckIn, parsedCheckOut, guests);
        }
    }, [location.search, fetchAvailableHouses]);

    useEffect(() => {
        fetch("http://localhost:8080/houses")
            .then(r => r.ok ? r.json() : Promise.reject("Ошибка загрузки домов"))
            .then(setHouses)
            .catch(err => console.error(err));
    }, []);

    const filteredHouses = useMemo(() => {
        if (!checkIn || !checkOut || !availableHouses) return houses;

        const mapById = new Map<number, AvailableHouse>();
        availableHouses.forEach((a) => mapById.set(a.ID, a));

        return houses
            .filter((h) => mapById.has(h.id))
            .map((h) => {
                const avail = mapById.get(h.id)!;
                return {
                    ...h,
                    totalPrice: avail.TotalPrice,
                    basePrice: avail.BasePrice,
                    bathhouses: avail.Bathhouses,
                } as House;
            });
    }, [houses, availableHouses, checkIn, checkOut]);

    const selectedHouseObj = useMemo(
        () => filteredHouses.find(h => h.id === selectedHouseId) ?? null,
        [filteredHouses, selectedHouseId]
    );

    const saunaSlotsData = useMemo(() => {
        if (!selectedHouseObj) return [];
        const sauna: Bathhouse | undefined = selectedHouseObj.bathhouses?.find(b => b.Name === "Баня");
        if (!sauna?.Slots) return [];

        return sauna.Slots.map((s: BathhouseSlot) => ({
            date:  new Date(s.Date),
            slots: buildHourlySlots(s.Time[0].TimeFrom, s.Time[0].TimeTo),
        }));
    }, [selectedHouseObj]);

    const handlePrev = () => setPage(p => Math.max(0, p - 1));

    const handleNext = () => {
        if (page === 0 && selectedHouseId === null) { setShowAlert(true); return; }
        if (page === 1 && saunaHoursCount > 0 && saunaHoursCount < 2) { setShowAlert(true); return; }

        setShowAlert(false);
        setPage(p => Math.min(2, p + 1));
    };

    const handleSubmit = ({ checkIn, checkOut, guests }: { checkIn: Date | null; checkOut: Date | null; guests: number }) => {
        setCheckIn(checkIn);
        setCheckOut(checkOut);

        if (checkIn && checkOut) void fetchAvailableHouses(checkIn, checkOut, guests);

        setSelectedHouseId(null);
        setSelectedSaunaSlots({});
    };

    const toggleSlot = (dateKey: string, slot: string) => {
        setSelectedSaunaSlots((prev) => {
            const daySet = new Set(prev[dateKey] ?? []);
            if (daySet.has(slot)) daySet.delete(slot);
            else daySet.add(slot);
            return { ...prev, [dateKey]: daySet };
        });
    };

    const { saunaHoursCount, saunaCost, tubCost, tubFillPrice } = useBathPricing(selectedSaunaSlots, addTub, selectedFillId);

    const calculateTotal = () => {
        const selectedDays = checkIn && checkOut ? Math.max(1, differenceInCalendarDays(checkOut, checkIn)) : 0;

        let houseCost = 0;
        if (selectedHouseObj) {
            if (selectedHouseObj.totalPrice) houseCost = selectedHouseObj.totalPrice;
            else if (selectedHouseObj.basePrice) houseCost = selectedHouseObj.basePrice * selectedDays;
        }

        const total = houseCost + saunaCost + tubCost + tubFillPrice;

        return { total, houseCost, saunaCost, tubCost, tubFillPrice };
    };

    const handleFinalSubmit = () => {
        const formattedCheckIn = checkIn ? format(checkIn, "yyyy-MM-dd") : null;
        const formattedCheckOut = checkOut ? format(checkOut, "yyyy-MM-dd") : null;

        const saunaTimes = Object.values(selectedSaunaSlots).flatMap((set) => Array.from(set));

        const totalSum = calculateTotal();

        const submissionData = {
            checkIn: formattedCheckIn,
            checkOut: formattedCheckOut,
            selectedHouse: selectedHouseId,
            saunaTimes,
            addTub,
            fillId: addTub ? selectedFillId : null,
            total: totalSum,
        };

        console.log("Отправка данных:", submissionData);

        setCheckIn(null);
        setCheckOut(null);
        setSelectedHouseId(null);
        setSelectedSaunaSlots({});
        setAddTub(false);
        setSelectedFillId(0);
        setPage(0);
        setShowSuccess(true);
    };

    const pageTitles = ["Выберите домик", "Баня и чан", "Контакты"];

    return (
        <>
            <SectionWrapper style={{ padding: "15px clamp(15px, 5vw, 80px)" }}>
                <ResPageForm onSubmit={handleSubmit} />
                <Wrapper>
                    <FlexWrapper justify="space-between" gap="24px" align="center">
                        <NavArrowButton onClick={handlePrev} disabled={page === 0}>
                            <ArrowBackIosNewIcon /> Назад
                        </NavArrowButton>
                        <Span>{pageTitles[page]}</Span>
                        <NavArrowButton onClick={handleNext} disabled={page === pageTitles.length - 1}>
                            Вперёд <ArrowForwardIosIcon />
                        </NavArrowButton>

                        <Snackbar
                            open={showAlert}
                            autoHideDuration={6000}
                            onClose={() => setShowAlert(false)}
                            anchorOrigin={{ vertical: "top", horizontal: "center" }}
                        >
                            <Alert
                                elevation={6}
                                variant="filled"
                                onClose={() => setShowAlert(false)}
                                severity="warning"
                                sx={{ width: "100%" }}
                            >
                                {page === 0 ? "Пожалуйста, выберите даты и домик перед переходом." : "Минимальное время аренды бани — 2 часа."}
                            </Alert>
                        </Snackbar>

                        <Snackbar
                            open={showSuccess}
                            autoHideDuration={6000}
                            onClose={() => setShowSuccess(false)}
                            anchorOrigin={{ vertical: "top", horizontal: "center" }}
                        >
                            <Alert elevation={6} onClose={() => setShowSuccess(false)} severity="success" sx={{ width: "100%" }}>
                                Данные успешно отправлены!
                            </Alert>
                        </Snackbar>
                    </FlexWrapper>

                    <ContentWrapper>
                        {page === 0 && (
                            filteredHouses.length > 0 ? (
                                <HousesSection
                                    houses={filteredHouses}
                                    selectedHouse={selectedHouseId}
                                    onSelect={setSelectedHouseId}
                                    showButton={!!checkIn && !!checkOut && !!availableHouses}
                                />
                            ) : (
                                !!checkIn && !!checkOut && availableHouses && (
                                    <P style={{ width: "100%", textAlign: "center" }}>Выберите другие даты или количество гостей</P>
                                )
                            )
                        )}

                        {page === 1 && (
                            <SaunaSection
                                saunaSlotsData={saunaSlotsData}
                                selectedSaunaSlots={selectedSaunaSlots}
                                toggleSlot={toggleSlot}
                                addTub={addTub}
                                setAddTub={setAddTub}
                                selectedFillId={selectedFillId}
                                setSelectedFillId={setSelectedFillId}
                            />
                        )}

                        {page === 2 && (() => {
                            const { total, houseCost, saunaCost, tubCost, tubFillPrice } = calculateTotal();
                            const summary = {
                                houseCost,
                                saunaCost,
                                tubCost,
                                tubFillPrice,
                                total,
                                saunaHoursCount,
                                addTub,
                                selectedFillId,
                            };
                            return (
                                <ContactSection
                                    summary={summary}
                                    onVerified={(code) => setVerificationCode(code)}
                                    onFinalSubmit={handleFinalSubmit}
                                />
                            );
                        })()}
                    </ContentWrapper>
                </Wrapper>
            </SectionWrapper>
        </>
    );
}

const Wrapper = styled.div`
    width: 100%;
    margin-top: 12px;
    padding: 24px;
    border-radius: 10px;
    background-color: var(--light-elem-color);
    border: 1px solid var(--add-color);
`;

const ContentWrapper = styled.div`
    margin-top: 24px;
`;

const NavArrowButton = styled(Button)`
    display: flex;
    align-items: center;
    gap: 2px;
    width: fit-content;
    padding: 8px 10px;
    text-transform: lowercase;
    color: ${theme.fontColor.main};
    background-color: var(--white-color);

    opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
    pointer-events: ${({ disabled }) => (disabled ? "none" : "pointer")};

    &:hover {
        background-color: var(--add-color);
    }
`;