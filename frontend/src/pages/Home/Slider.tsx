import { SectionWrapper } from "../../components/common/SectionWrapper.ts";
import { H1 } from "../../styles/theme.ts";
import { FlexWrapper } from "../../components/common/FlexWrapper.ts";
import {SliderComponent} from "../../components/common/SliderComponent.tsx";

const images = [
    "/src/assets/Home/house1.jpg",
    "/src/assets/Home/house6.jpg",
    "/src/assets/Home/house3.jpg",
    "/src/assets/Home/house7.jpg",
    "/src/assets/Home/house5.jpg",
];

export default function Slider() {
    return (
        <section>
            <SectionWrapper>
                <FlexWrapper direction="column" align="center">
                    <H1>Тихая роща - идеальное место для отдыха на природе, вдали от городской суеты</H1>
                    <SliderComponent images={images}/>
                </FlexWrapper>
            </SectionWrapper>
        </section>
    );
}