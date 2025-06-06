import {IntroSection} from "../components/common/IntroSection.tsx";
import EventsBg from "../assets/EventsBg.jpg";
import {VerticalImageSlider} from "../components/common/VerticalImageSlider.tsx";
import {SectionWrapper} from "../components/common/SectionWrapper.ts";
import {FlexWrapper} from "../components/common/FlexWrapper.ts";
import Overlay from "../components/common/Overlay.tsx";
import {useState} from "react";
import FormEvents from "../components/FormEvents.tsx";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const eventsData = [
    {
        id: 1,
        title: "Девичник",
        description: `Мы полностью организуем атмосферный девичник на природе: подберём уютное жильё, оформим фотозоны, украсим домики и зону для отдыха. Предложим программу с банными процедурами, чаном, ужином на террасе и лаунжем у костра. По желанию — организация мастер-классов, спа, сервировка пикника или выездной фотосессии. Мы поможем продумать сценарий и позаботимся о всех деталях. Вам останется только наслаждаться моментом вместе с подругами.\n
Мы создадим праздник, где каждая деталь — от пледа до свечей — будет подчёркивать заботу и стиль. Девичник получится душевным, тёплым и таким, о котором вспоминают с улыбкой. Наши координаторы всегда на месте и готовы решать любые вопросы. Атмосфера уюта, приватности и природной красоты гарантирована.`,
        images: [
            "https://res.cloudinary.com/dxmp5yjmb/image/upload/v1747239775/events1_nh9eqs.webp",
            "https://res.cloudinary.com/dxmp5yjmb/image/upload/v1747239778/events2_ldkanz.webp",
            "https://res.cloudinary.com/dxmp5yjmb/image/upload/v1747239782/events3_rgzq7w.jpg",
            "https://res.cloudinary.com/dxmp5yjmb/image/upload/v1747239787/events4_g1gvby.jpg",
            "https://res.cloudinary.com/dxmp5yjmb/image/upload/v1747239791/events5_y4r9hi.jpg"
        ],
    },
    {
        id: 2,
        title: "Годовщина",
        description: `Мы с радостью организуем годовщину по индивидуальному сценарию: романтический ужин при свечах, тёплый чан под звёздами, декор в любимых оттенках и уют в каждом моменте. Позаботимся о музыке, сервировке, свечах, тёплых пледах и мелочах, которые создают атмосферу. Мы предлагаем разные пакеты — от минимального оформления до полного сопровождения. Всё подстраивается под ваши пожелания.\n
Также предложим услуги фотографа, завтрак на террасе с панорамным видом и вечернюю прогулку с сюрпризом. Ваш праздник будет наполнен вниманием и эмоциями. Команда глэмпинга координирует все процессы, чтобы вы чувствовали только радость. Этот день останется в памяти как один из самых нежных и тёплых.`,
        images: [
            "https://res.cloudinary.com/dxmp5yjmb/image/upload/v1747239795/events6_jeo8cw.webp",
            "https://res.cloudinary.com/dxmp5yjmb/image/upload/v1747239799/events7_u4jich.jpg",
            "https://res.cloudinary.com/dxmp5yjmb/image/upload/v1747239803/events8_btjrta.jpg",
            "https://res.cloudinary.com/dxmp5yjmb/image/upload/v1747239808/events9_i99xuq.jpg",
            "https://res.cloudinary.com/dxmp5yjmb/image/upload/v1747239812/events10_mb5xus.jpg"
        ],
    },
    {
        id: 3,
        title: "День рождения",
        description: `Мы организуем день рождения на природе — с декором, зонами отдыха, вкусной едой и уютной атмосферой. Возьмём на себя всё: оформление, выездную кухню или кейтеринг, развлечения, музыку, фотосъёмку и комфортное размещение гостей. Есть варианты для любого возраста и формата — от тихого вечера до весёлой компании. У нас всё предусмотрено для детских и взрослых праздников.\n
Всё под ключ: от первого звонка до свечей на торте. Вам остаётся только наслаждаться праздником и природой вокруг. Мы оформим индивидуальный сценарий праздника. А наши ведущие, фотографы и повара сделают день по-настоящему особенным.`,
        images: [
            "https://res.cloudinary.com/dxmp5yjmb/image/upload/v1747239816/events11_p8rmwa.jpg",
            "https://res.cloudinary.com/dxmp5yjmb/image/upload/v1747239821/events12_lulrza.jpg",
            "https://res.cloudinary.com/dxmp5yjmb/image/upload/v1747239825/events13_epp1fg.jpg",
            "https://res.cloudinary.com/dxmp5yjmb/image/upload/v1747239829/events14_yz9u8e.jpg",
            "https://res.cloudinary.com/dxmp5yjmb/image/upload/v1747239834/events15_zgafu3.jpg"
        ],
    },
    {
        id: 4,
        title: "Семейные выходные",
        description: `Мы поможем провести тёплые семейные выходные: подберём подходящие домики, организуем детскую анимацию, пешие маршруты, ужин на террасе и активности на свежем воздухе. Вечером — тёплый костёр, пледы, какао и настольные игры. Предусмотрим всё: от удобных кроватей до детских стульчиков. Даже если вы с малышами — будет комфортно.\n
Если вы хотите сохранить эти моменты — предложим семейную фотосессию в красивых местах глэмпинга. Мы делаем семейный отдых лёгким и продуманным. В меню — блюда, подходящие и детям, и взрослым. А наша команда всегда рядом, чтобы отдых прошёл без забот.`,
        images: [
            "https://res.cloudinary.com/dxmp5yjmb/image/upload/v1747239838/events16_hekxjy.jpg",
            "https://res.cloudinary.com/dxmp5yjmb/image/upload/v1747239842/events17_cjryn5.jpg",
            "https://res.cloudinary.com/dxmp5yjmb/image/upload/v1747239847/events18_ixaugy.jpg",
            "https://res.cloudinary.com/dxmp5yjmb/image/upload/v1747239851/events19_oejaao.jpg",
            "https://res.cloudinary.com/dxmp5yjmb/image/upload/v1747239856/events20_dxo0yp.jpg"
        ],
    },
    {
        id: 5,
        title: "Наедине с собой",
        description: `Мы создадим условия для полного восстановления: тишина, уют, домик с видом, горячий чан и прогулки наедине с природой. Организуем доставку еды, комфортное размещение, ритуалы для отдыха — от ароматерапии до спа-программ. Вам не придётся заботиться ни о чём — всё включено. Просто приезжайте и отдыхайте.\n
По желанию можно добавить йогу, медитации, арт-терапию или просто тишину без телефона. Мы подстроим формат под ваш ритм и сделаем отдых действительно заботливым. Наши программы направлены на восстановление внутреннего ресурса. Вы вернётесь домой полными сил и вдохновения.`,
        images: [
            "https://res.cloudinary.com/dxmp5yjmb/image/upload/v1747239860/events21_sj2zyp.jpg",
            "https://res.cloudinary.com/dxmp5yjmb/image/upload/v1747239865/events22_fdxkc7.jpg",
            "https://res.cloudinary.com/dxmp5yjmb/image/upload/v1747239869/events23_z9c828.jpg",
            "https://res.cloudinary.com/dxmp5yjmb/image/upload/v1747239874/events24_orc9s4.jpg",
            "https://res.cloudinary.com/dxmp5yjmb/image/upload/v1747239878/events25_ghnwij.jpg"
        ],
    },
];

function Events() {

    const [showOverlay, setShowOverlay] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleOpenOverlay = () => setShowOverlay(true);
    const handleCloseOverlay = () => setShowOverlay(false);

    const handleFormSubmitted = () => {
        setShowOverlay(false);
        setShowSuccess(true);
    };

    return (
        <>
            <IntroSection
                src={EventsBg}
                alt="Глэмпинг"
                title="Мероприятия"
                description="Здесь можно наслаждаться особенными моментами в окружении живописных пейзажей, проводить время с близкими у костра или погружаться в атмосферу тишины и гармонии. Независимо от повода, каждый гость найдет здесь комфорт, вдохновение и незабываемые впечатления."
            />

            <SectionWrapper >
                <FlexWrapper direction="column" gap="70px">
                    {eventsData.map(({ id, title, description, images}) => (
                        <VerticalImageSlider
                            key={id}
                            images={images}
                            title={title}
                            description={description}
                            buttonText="запросить бронь"
                            action={handleOpenOverlay}
                        />
                    ))}
                </FlexWrapper>
            </SectionWrapper>

            {showOverlay && (
                <Overlay onClose={handleCloseOverlay}>
                    <FormEvents onSubmitted={handleFormSubmitted}/>
                </Overlay>
            )}

            <Snackbar
                open={showSuccess}
                autoHideDuration={6000}
                onClose={() => setShowSuccess(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    elevation={6}
                    onClose={() => setShowSuccess(false)}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
                </Alert>
            </Snackbar>
        </>
    );
}

export default Events;