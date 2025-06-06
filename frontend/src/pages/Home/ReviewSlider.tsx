import { useState } from 'react';
import { Fade, Rating, Avatar} from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {Button} from "../../components/common/Button.tsx";
import {SectionWrapper} from "../../components/common/SectionWrapper.ts";
import styled from 'styled-components';
import {MainTitle, P, Span, theme} from '../../styles/theme.ts';
import {ImageWrapper} from "../../components/common/ImageWrapper.ts";
import { FlexWrapper } from '../../components/common/FlexWrapper.ts';

const reviews = [
    {
        text: `Недавно побывал в глэмпинге "Тихая Роща" — это было просто волшебно! Атмосфера уюта чувствуется с первых минут: чисто, аккуратно, всё продумано до мелочей.\n
Природа вокруг завораживает, а вечер у костра — отдельный кайф. Особенно порадовали развлечения: катались на сапах, брали велосипеды напрокат, пробовали квадроциклы — адреналина хватило! \n
Персонал приветливый и всегда готов помочь. Также порадовал удобный трансфер прямо до домаЗдесь чувствуешь себя как дома, но с элементами приключения. Отличное место, чтобы перезагрузиться и отдохнуть от городской суеты.`,
        name: 'Иван Петров',
        avatar: '/src/assets/Home/avatar1.jpg',
        stars: 5,
    },
    {
        text: `Всё выглядит очень стильно и при этом по-домашнему уютно. Мне особенно понравился интерьер домиков — минимализм, дерево, мягкий свет… просто кайф!\n
Каждое утро мы завтракали на террасе с видом на сосны, а потом шли на йогу под открытым небом — невероятная атмосфера спокойствия и перезагрузки.\n
Вечером устраивали пикник под гирляндами и жарили зефирки у костра 🔥 Было ощущение, будто попали в сказку.\n
Спасибо персоналу — очень вежливые и заботливые ребята! Обязательно приеду снова и возьму подругу с собой 😊`,
        name: 'Анна Смирнова',
        avatar: '/src/assets/Home/avatar2.jpg',
        stars: 5,
    },
    {
        text: `Впечатления самые положительные! Сразу порадовало, что домики утеплённые и оборудованы всем необходимым, даже в прохладную погоду было комфортно.\n
Отдельно хочу отметить баню с чаном — это просто must-have после активного дня. Вода горячая, вид на лес — полное расслабление.\n
Территория ухоженная, везде чисто, приятные тропинки, удобно гулять. Удивило, как тихо вокруг — идеальное место, чтобы выспаться и отдохнуть без шума.\n
Вернусь сюда обязательно ещё раз!`,
        name: 'Дмитрий Кузнецов',
        avatar: '/src/assets/Home/avatar3.jpg',
        stars: 5,
    },
];

export default function ReviewSlider() {
    const [index, setIndex] = useState(0);
    const [fadeIn, setFadeIn] = useState(true);

    const handleChange = (direction: 'next' | 'prev') => {
        setFadeIn(false);
        setTimeout(() => {
            setIndex((prev) =>
                direction === 'next'
                    ? (prev + 1) % reviews.length
                    : (prev - 1 + reviews.length) % reviews.length
            );
            setFadeIn(true);
        }, 200);
    };

    return (
        <section>
            <StyledImageWrapper>
                <img src="/src/assets/Home/reviews.png" alt="glamping" />
                <Content>
                    <StyledH3>место, в котором обязательно нужно побывать</StyledH3>

                    <ReviewCard>
                        <ArrowButton onClick={() => handleChange('prev')} disabled={reviews.length <= 1} $position="left">
                            <ArrowBackIosNewIcon fontSize="small" />
                        </ArrowButton>

                        <Fade in={fadeIn} timeout={200}>
                            <FlexWrapper direction="column" gap="10px" justify="space-between">
                                <FlexWrapper direction="column" gap="10px">
                                    <FlexWrapper align="center" gap="10px">
                                        <Avatar src={reviews[index].avatar} sx={{ width: 40, height: 40 }} />
                                        <Span>{reviews[index].name}</Span>
                                    </FlexWrapper>
                                    <Rating name="read-only" value={reviews[index].stars} readOnly sx={{ color: 'gold' }} />
                                </FlexWrapper>

                                <ReviewText lang="ru">{reviews[index].text}</ReviewText>

                                <Button href="#">Читать ещё отзывы</Button>
                            </FlexWrapper>
                        </Fade>

                        <ArrowButton onClick={() => handleChange('next')} disabled={reviews.length <= 1} $position="right">
                            <ArrowForwardIos fontSize="small" />
                        </ArrowButton>
                    </ReviewCard>
                </Content>
            </StyledImageWrapper>
        </section>
    );
}

const StyledImageWrapper = styled(ImageWrapper)`
    height: 750px;
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 70%;
        background: linear-gradient(to bottom, rgba(19, 28, 57, 0.8), transparent);
        z-index: 0;
        pointer-events: none;
    }
`;

const StyledH3 = styled(MainTitle)`
    max-width: 670px;

    @media (max-width: 768px) {
        text-align: center;
        align-items: center;
    }
`;

const Content = styled(SectionWrapper)`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    gap: 24px;
`;

const ReviewCard = styled(FlexWrapper)`
    position: relative;
    max-width: 500px;
    min-width: 280px;
    background-color: var(--light-text-color);
    border: 1px solid var(--elem-color);
    border-radius: 10px;
    padding: clamp(10px, 5vw, 28px);
    gap: 16px;
    box-shadow: ${theme.shadow.elements};
`;

const ReviewText = styled(P)`
    overflow: hidden;
    display: block;
    @media (max-width: 768px) {
        mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
        max-height: 300px;
    }
`;

const ArrowButton = styled.button<{ disabled?: boolean; $position: 'left' | 'right' }>`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    ${({$position}) => $position}: -20px;

    background: var(--main-color);
    color: var(--light-text-color);
    border-radius: 50%;
    padding: 10px;
    width: 40px;
    height: 40px;
    cursor: ${({disabled}) => (disabled ? 'default' : 'pointer')};
    opacity: ${({disabled}) => (disabled ? 0.3 : 1)};
    transition: 0.2s ease;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    box-shadow: ${theme.shadow.elements};

    &:hover {
        background-color: var(--accent-color);
    }
`;
