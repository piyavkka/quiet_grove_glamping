import house1 from "../assets/Home/house1.jpg";
import {IntroSection} from "../components/common/IntroSection.tsx";
import {SectionWrapper} from "../components/common/SectionWrapper.ts";
import styled from "styled-components";
import {FlexWrapper} from "../components/common/FlexWrapper.ts";
import {H3Dark, P, Span} from "../styles/theme.ts";
import Overlay from "../components/common/Overlay.tsx";
import {useEffect, useState} from "react";
import {SliderComponent} from "../components/common/SliderComponent.tsx";
import {useLocation, useNavigate} from "react-router-dom";

function Entertainment() {
    type Extra = {
        id: number;
        title: string;
        text: string;
        description: string;
        cost: number;
        images: string[];
    };

    const [extras, setExtras] = useState<Extra[]>([]);
    const [selectedCard, setSelectedCard] = useState<Extra | null>(null);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/extras")
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка загрузки развлечений");
                return res.json();
            })
            .then((data) => setExtras(data))
            .catch((err) => console.error("Ошибка:", err));
    }, []);

    useEffect(() => {
        const state = location.state as { cardId?: number } | null;
        if (state?.cardId && extras.length > 0) {
            const foundCard = extras.find(card => card.id === state.cardId);
            if (foundCard) {
                setSelectedCard(foundCard);
                navigate('.', { replace: true });
            }
        }
    }, [location.state, extras, navigate]);

    useEffect(() => {
        if (location.hash && extras.length > 0) {
            const anchorId = location.hash.replace('#', '');
            const el = document.getElementById(anchorId);
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }
        }
    }, [location.hash, extras]);

    return (
        <>
            <IntroSection
                src={house1}
                alt="Глэмпинг"
                title="отдых и развлечения"
                description="Окунитесь в атмосферу уюта и спокойствия, наслаждаясь отдыхом в окружении природы. Наш глэмпинг-отель создан для тех, кто ценит комфорт, но не хочет терять связь с природой."
            />

            <SectionWrapper>
                <FlexWrapper gap="clamp(16px, 5vw, 70px)" wrap="wrap" justify="center">
                    {extras.map((card) => (
                        <Card
                            key={card.id}
                            id={`card-${card.id}`}
                            onClick={() => setSelectedCard(card)}>
                            <FlexWrapper direction="column" gap="20px" align="center">
                                <Img src={card.images[0]} alt={`Entertainment ${card.id}`} />
                                <H3Dark>{card.title}</H3Dark>
                                <P lang="ru">{card.text}</P>
                                <Span>{card.cost ? `от ${card.cost} / за человека` : 'бесплатно'}</Span>
                            </FlexWrapper>
                        </Card>
                    ))}
                </FlexWrapper>
            </SectionWrapper>

            {selectedCard && (
                <Overlay onClose={() => setSelectedCard(null)}>
                    <SelectedCard>
                        <FlexWrapper direction="column" gap="20px" align="center">
                            <H3Dark>{selectedCard.title}</H3Dark>
                            <SliderComponent images={selectedCard.images} autoplay={false} height="250px"/>
                            <P lang="ru">{selectedCard.text}</P>
                            <P lang="ru">{selectedCard.description}</P>
                            <Span>{selectedCard.cost ? `от ${selectedCard.cost} / за человека` : 'бесплатно'}</Span>
                            <StyledP>*Только для гостей с действующим бронированием*</StyledP>
                        </FlexWrapper>
                    </SelectedCard>
                </Overlay>
            )}
        </>
    );
}

export default Entertainment;

const Card = styled.div`
    max-width: 380px;
    min-height: 500px;
    border-radius: 10px;
    border: 1px solid lightgray;
    padding: 10px;
    cursor: pointer;
    transition: transform 0.2s ease;
    background-color: white;

    &:hover {
        transform: scale(1.02);
    }
`;

const Img = styled.img`
    border-radius: 10px;
    height: 250px;
`;

const SelectedCard = styled.div`
    border: 1px solid lightgray;
    padding: 16px;
    border-radius: 10px;
    cursor: pointer;
    background-color: white;
    max-width: 480px;
    width: min(480px, calc(100vw - 48px));
`;

const StyledP = styled(P)`
    color: gray;
    font-size: 14px;
`;