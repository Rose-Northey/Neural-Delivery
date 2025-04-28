"use client";
import { useState } from "react";
import Game from "./Game";
import ScientistView from "./ScientistView";
import Header from "./Header";
import { css } from "@emotion/css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Home() {
    const [isScientistView, setIsScientistView] = useState(false);
    const queryClient = new QueryClient();
    const handleToggleViewClick = () => {
        setIsScientistView(!isScientistView);
    };

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <button onClick={handleToggleViewClick} className={toggleView}>
                    Toggle View
                </button>
                <Header />
                {isScientistView ? <ScientistView /> : <Game />}
            </QueryClientProvider>
        </>
    );
}

const toggleView = css({
    position: "absolute",
    margin: "1rem",
    padding: "1px",
    fontSize: "5px",
    right: "0",
});
