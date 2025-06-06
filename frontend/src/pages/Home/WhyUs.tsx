import styled from 'styled-components';
import { Button } from "../../components/common/Button.tsx";
import {FlexWrapper} from "../../components/common/FlexWrapper.ts";
import { SectionWrapper } from '../../components/common/SectionWrapper.ts';
import {H2Dark, P, Span, theme} from "../../styles/theme.ts";
import {SmartLink} from "../../components/common/SmartLink.tsx";

const whyUsData = [
    {
        text: `Добро пожаловать в Тихую рощу – место, где природа встречается с уютом. Забудьте о городской суете и подарите себе отдых в стильных домиках среди леса.\n
                Уединение и спокойствие – пробуждайтесь под пение птиц и вдыхайте свежий воздух.\n
                Комфорт без компромиссов – мягкие кровати, горячий душ, Wi-Fi и всё, что нужно для полного расслабления.\n
                Атмосфера уюта – вечерние костры, звёздное небо и аромат свежесваренного кофе по утрам.\n
                Активный отдых – пешие прогулки, веломаршруты, SUP-доски и походные бани.\n
                Окунитесь в мир гармонии и вдохновения – бронируйте отдых мечты уже сегодня!`,
    },
];

const advantagesData = [
    { icon: "/src/assets/Home/image1.png", title: "Кухня" },
    { icon: "/src/assets/Home/image2.png", title: "Ванная комната" },
    { icon: "/src/assets/Home/image3.png", title: "Бельё" },
    { icon: "/src/assets/Home/image4.png", title: "Банный комплекс" },
    { icon: "/src/assets/Home/image5.png", title: "Мангал" },
    { icon: "/src/assets/Home/image6.png", title: "Развлечения" },
];

export default function WhyUs() {
    return (
        <section>
            <SectionWrapper>
                <FlexWrapper justify="space-between" align="flex-start" gap="20px" wrap="wrap">
                    <WhyUsText direction="column" gap="16px">
                        <H2Dark>Отдых на природе с комфортом – ваш идеальный глэмпинг!</H2Dark>
                        {whyUsData.map((item, index) => (
                            <P key={index}>{item.text}</P>
                        ))}
                        <Span>От 8000 / сутки</Span>
                        <Button as={SmartLink} to="/reservation">
                            Забронировать
                        </Button>
                    </WhyUsText>

                    <Advantages direction="column" gap="16px">
                        <h3>Есть всё необходимое<br/>для вашего комфорта</h3>
                        <AdvantagesList direction="column" gap="16px">
                            {advantagesData.map((item, index) => (
                                <div className="list-icon" key={index}>
                                    <img src={item.icon} alt={item.title} className="icon" />
                                    <h4>{item.title}</h4>
                                </div>
                            ))}
                        </AdvantagesList>
                    </Advantages>
                </FlexWrapper>
            </SectionWrapper>
        </section>
    );
}

const WhyUsText = styled(FlexWrapper)`
    width: 100%;
    max-width: 860px;
    min-width: 500px;
    border-radius: 10px;
    flex: 1;

    @media (max-width: 768px) {
        width: 100%;
        min-width: unset;
        align-items: center;
        border: none;
    }
`;

const Advantages = styled(FlexWrapper)`
    padding: 14px 24px;
    border: 1px solid var(--elem-color);
    background-color: var(--light-text-color);
    border-radius: 10px;
    flex: 0 0 auto;

    .list-icon {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .icon {
        width: 52px;
        height: 52px;
        color: ${theme.fontColor.main};
    }

    h4 {
        font-weight: 500;
        color: ${theme.fontColor.main};
    }

    h3 {
        font-size: clamp(1rem, 5vw, 1.4rem);
        font-weight: 500;
        text-align: center;
        color: ${theme.fontColor.main};
    }
    
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const AdvantagesList = styled(FlexWrapper)`
    width: fit-content; 
    margin: 0 auto;
`;