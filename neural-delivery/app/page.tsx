"use client";
import Game from "./Game";
import Header from "./Header";

export default function Home() {
    return (
        <>
            <Header />
            <Game />
        </>
    );
}

// 3 buttons in the page - easy, medium, hard
// selecting one button will generate random numbers for that number of cards
// the array of random numbers is then passed into the conditionally rendered
// "Game" component
