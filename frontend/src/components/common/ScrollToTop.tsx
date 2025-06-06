import {useLocation} from "react-router-dom";
import {useEffect} from "react";

const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
        const state = location.state as { preventScroll?: boolean } | null;

        if (location.hash || state?.preventScroll) return;

        window.scrollTo(0, 0);
    }, [location]);

    return null;
};

export default ScrollToTop;