import { useState } from "react";
import FadeInWhenVisible from "../../components/FadeInWhenVisible";
import {Link, useNavigate} from "react-router";
import AnimatedWrapper from "../../components/AnimatedWrapper.tsx";
import { charactersQuery } from "@/hooks/characters/charactersQuery.ts";
import type { Character } from "@/types/character.type.ts";

export default function Main() {
    const [pos, setPos] = useState({ x: 0, y: 0, rotX: 0, rotY: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;

        const moveX = nx * 20;
        const moveY = ny * 20;

        const rotY = nx * 10;
        const rotX = -ny * 10;

        setPos({ x: moveX, y: moveY, rotX, rotY });
    };

    const handleMouseLeave = () => {
        setPos({ x: 0, y: 0, rotX: 0, rotY: 0 });
    };

    const navigate = useNavigate();

    const { data: characters, isLoading } = charactersQuery({ page: 1 });

    return (
        <AnimatedWrapper>
            <div className="w-full pt-24 bg-white">

                <section
                    className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-16"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <FadeInWhenVisible className="flex-1 text-center md:text-left">
                        <h1 className="text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
                            Step Into the Rick & Morty Universe
                        </h1>

                        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto md:mx-0">
                            Explore characters, episodes, and locations from one of the most iconic
                            animated series ever made. A clean, modern way to browse the multiverse.
                        </p>

                        <Link
                            to="/characters"
                            className="inline-block px-8 py-4 font-semibold bg-sky-500 text-white rounded-full shadow-md hover:bg-sky-600 transition-all"
                        >
                            Explore Characters
                        </Link>
                    </FadeInWhenVisible>

                    <FadeInWhenVisible className="flex-1 flex justify-center">
                        <div
                            className="relative"
                            style={{
                                transform: `translate(${pos.x}px, ${pos.y}px) rotateX(${pos.rotX}deg) rotateY(${pos.rotY}deg)`,
                                transition: "transform 0.15s ease-out",
                                transformStyle: "preserve-3d",
                            }}
                        >
                            <div className="absolute inset-0 bg-sky-100 rounded-full blur-2xl opacity-70"></div>

                            <div className="relative w-72 h-72 rounded-full bg-gradient-to-b from-sky-50 to-sky-100 shadow-xl flex items-center justify-center border border-sky-200">
                                <img
                                    src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
                                    alt="Rick"
                                    className="w-56 h-56 rounded-full object-cover shadow-md"
                                />
                            </div>
                        </div>
                    </FadeInWhenVisible>
                </section>

                <section className="max-w-7xl mx-auto px-6 py-20">
                    <FadeInWhenVisible>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Featured Characters</h2>

                        {isLoading ? (
                            <p>Loading characters...</p>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {characters?.slice(0, 8).map((char: Character) => (
                                    <div
                                        key={char.id}
                                        className="bg-white rounded-xl shadow p-4 text-center hover:shadow-lg transition"
                                    >
                                        <img
                                            src={char.image}
                                            alt={char.name}
                                            className="rounded-t-xl w-full object-cover mb-2"
                                        />
                                        <p className="font-semibold text-gray-800">{char.name}</p>
                                        <p className="text-gray-500 text-sm">Status: {char.status}</p>
                                        <p className="text-gray-500 text-sm mb-2">Species: {char.species}</p>

                                        <button
                                            onClick={() => navigate(`/characters/${char.id}`)}
                                            className="mt-2 px-4 py-2 bg-sky-500 text-white font-semibold rounded-full shadow hover:bg-sky-600 transition-all"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-8 text-center">
                            <Link
                                to="/characters"
                                className="inline-block px-6 py-3 bg-sky-500 text-white font-semibold rounded-full shadow-md hover:bg-sky-600 transition-all"
                            >
                                See All Characters
                            </Link>
                        </div>
                    </FadeInWhenVisible>
                </section>
                

            </div>
        </AnimatedWrapper>
    );
}
