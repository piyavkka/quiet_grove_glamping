import {useRef, useEffect, useState} from "react";
import type {Swiper as SwiperType} from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {Autoplay, Keyboard, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import styled from "styled-components";
import Overlay from "./Overlay.tsx";

type SliderComponentProps = {
    images: string[];
    height?: string;
    autoplay?: boolean;
};

function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" && window.innerWidth <= breakpoint
    );

    useEffect(() => {
        const onResize = () =>
            setIsMobile(window.innerWidth <= breakpoint);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [breakpoint]);

    return isMobile;
}

export const SliderComponent = (
    {
        images,
        height = "600px",
        autoplay = true,
    }: SliderComponentProps) => {

    const swiperRef = useRef<SwiperType | null>(null);
    const [modalImage, setModalImage] = useState<string | null>(null);

    const isMobile = useIsMobile();
    const openModal = (src: string) => !isMobile && setModalImage(src);
    const closeModal = () => setModalImage(null);

    const autoplayConfig = autoplay
        ? { delay: 10000, disableOnInteraction: false }
        : false;

    return (
        <SliderWrapper>
            <ArrowButton className="prev" onClick={() => swiperRef.current?.slidePrev()}>
                <ArrowBackIosNewIcon fontSize="small" />
            </ArrowButton>

            <StyledSwiper
                $height={height}
                modules={[Autoplay, Pagination, Keyboard]}
                pagination={{ clickable: true }}
                autoplay={autoplayConfig}
                keyboard={{ enabled: true }}
                loop
                onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
                {images.map((src, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={src}
                            alt={`Slide ${index + 1}`}
                            onClick={() => openModal(src)}
                            style={{ cursor: isMobile ? "default" : "pointer" }}
                        />
                    </SwiperSlide>
                ))}
            </StyledSwiper>

            <ArrowButton className="next" onClick={() => swiperRef.current?.slideNext()}>
                <ArrowForwardIosIcon fontSize="small" />
            </ArrowButton>

            {!isMobile && modalImage && (
                <Overlay onClose={closeModal}>
                    <img
                        src={modalImage}
                        alt="Full size"
                        style={{
                            maxWidth: "1100px",
                            maxHeight: "800px",
                            borderRadius: "10px",
                            display: "block",
                        }}
                    />
                </Overlay>
            )}
        </SliderWrapper>
    );
};

const StyledSwiper = styled(Swiper)<{ $height: string }>`
    width: 100%;
    height: ${({$height}) => $height};
    border-radius: 10px;
    position: relative;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: inherit;
    }

    .swiper-pagination-bullets {
        bottom: 10px;
    }

    .swiper-pagination-bullet {
        background-color: white;
        opacity: 0.6;
        transition: transform 0.3s ease, opacity 0.3s ease;
    }

    .swiper-pagination-bullet:hover {
        transform: scale(1.3);
        opacity: 1;
    }

    .swiper-pagination-bullet-active {
        background-color: white;
        opacity: 1;
        transform: scale(1.4);
    }

    @media (max-width: 768px) {
        height: 200px;
    }
`;

const SliderWrapper = styled.div`
    position: relative;
    width: 100%;

    &:hover button {
        opacity: 1;
    }
`;

const ArrowButton = styled.button<{ disabled?: boolean }>`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    background: var(--main-color);
    color: var(--light-text-color);
    border-radius: 50%;
    padding: 10px;
    width: 40px;
    height: 40px;
    cursor: ${({disabled}) => (disabled ? "default" : "pointer")};
    opacity: 0;
    transition: opacity 0.3s, background-color 0.2s;

    &:hover {
        background-color: var(--accent-color);
    }

    &.prev {
        left: 10px;
    }

    &.next {
        right: 10px;
    }

    @media (max-width: 768px) {
        display: none;
    }
`;
