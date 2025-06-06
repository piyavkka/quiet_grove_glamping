import {
    Slider,
    ActionAreaCard,
    ReviewSlider,
    Route,
    WhyUs,
    MainSection,
} from './index.tsx';

function Home() {

    return (
        <>
            <MainSection/>
            <Slider/>
            <WhyUs/>
            <ActionAreaCard/>
            <ReviewSlider/>
            <Route/>
        </>
    )
}

export default Home