import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/keyboard';
import {Scrollbar, Keyboard} from 'swiper/modules';
import styled from 'styled-components';
import {H2Dark, H3Dark, H4Dark, theme} from '../../styles/theme.ts';
import {SectionWrapper} from "../../components/common/SectionWrapper.ts";
import {Link} from "react-router-dom";
import {FlexWrapper} from "../../components/common/FlexWrapper.ts";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ActionAreaCard() {
    type Extra = {
        id: number;
        title: string;
        text: string;
        description: string;
        cost: number;
        images: string[];
    };

    const [extras, setExtras] = useState<Extra[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/extras")
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка загрузки развлечений");
                return res.json();
            })
            .then((data) => setExtras(data))
            .catch((err) => console.error("Ошибка:", err));
    }, []);

    const navigate = useNavigate();
    return (
        <section>
            <SectionWrapper>
                <H2Dark style={{marginBottom: '16px'}}>Развлечения</H2Dark>
                <FlexWrapper justify="space-between" gap="12px" wrap="wrap">
                    <H4Dark>Отдых в нашем глэмпинге — это не только уют и комфорт, но и множество увлекательных развлечений
                        на свежем воздухе! Вас ждут:</H4Dark>
                    <StyledLink to="/entertainment">смотреть все</StyledLink>
                </FlexWrapper>

                <Swiper
                    modules={[Scrollbar, Keyboard]}
                    spaceBetween={24}
                    scrollbar={{draggable: true}}
                    keyboard={{enabled: true, onlyInViewport: true}}
                    touchMoveStopPropagation={false}
                    slidesPerView="auto"
                    centeredSlides={false}
                    style={{padding: "16px 0"}}
                >

                    {extras.map((card) => (
                        <SwiperSlideStyled key={card.id}>
                            <Card onClick={() =>
                                navigate(`/entertainment#card-${card.id}`, {
                                    state: { cardId: card.id, preventScroll: true }
                                })}>
                                <Img src={card.images[0]} alt={`Entertainment ${card.id}`} />
                                <H3Dark>{card.title}</H3Dark>
                            </Card>
                        </SwiperSlideStyled>
                    ))}
                </Swiper>
            </SectionWrapper>
        </section>
    );
}

const SwiperSlideStyled = styled(SwiperSlide)`
    width: 300px;
    display: flex;
    justify-content: center;
`;

const Card = styled.div`
    width: 100%;
    height: 320px;
    border-radius: 10px;
    border: 1px solid lightgray;
    background-color: #fff;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 12px;
    transition: 0.2s ease;
    padding: 10px 10px 0 10px;

    &:hover {
        background-color: #f0f0f0;
        cursor: pointer;
    }
`;

const Img = styled.img`
    border-radius: 10px;
    height: 250px;
`;

const StyledLink = styled(Link)`
    color: ${theme.fontColor.main};
    display: flex;
    align-items: flex-end;
    font-size: 1rem;
    transition: 0.2s ease;

    &:hover {
        opacity: 0.5;
    }
`;