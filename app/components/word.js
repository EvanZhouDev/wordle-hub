"use client";
import { useEffect, useState } from "react";

export default function Word({ word, status, delay = 0 }) {
	// Inside your component:
	const [isAnimated, setIsAnimated] = useState(false);

	useEffect(() => {
		setIsAnimated(true);
	}, []);
	return (
		<div className="flex flex-row gap-[7px]">
			{word.split("").map((letter, i) => {
				let start = (
					<span
						className="w-16 h-16 border-2 border-[#898989] flex justify-center items-center uppercase text-[#010101] text-4xl font-bold"
						key={i}
					>
						{letter}
					</span>
				);
				let end =
					status == "correct" ? (
						<span
							className={`w-16 h-16 bg-[#6BAA64] flex justify-center items-center uppercase text-white text-4xl font-bold`}
							key={i}
						>
							{letter}
						</span>
					) : status == "partially correct" ? (
						<span
							className={`w-16 h-16 bg-[#CAB458] flex justify-center items-center uppercase text-white text-4xl font-bold`}
							key={i}
						>
							{letter}
						</span>
					) : (
						<span
							className={`w-16 h-16 bg-[#787C7E] flex justify-center items-center uppercase text-white text-4xl font-bold`}
							key={i}
						>
							{letter}
						</span>
					);
				return (
					<div key={i} className="group h-16 w-16 [perspective:1000px]">
						<div
							className={`
    relative h-full w-full 
    transition-all duration-500 
    [transform-style:preserve-3d]
    ${isAnimated ? "[transform:rotateX(180deg)]" : ""}
  `}
							style={{
								transitionDelay: `${i * 100 + delay}ms`,
							}}
						>
							<div className="absolute inset-0 h-full w-full rounded-xl [backface-visibility:hidden]">
								{start}
							</div>
							<div className="absolute inset-0 h-full w-full text-slate-200 [transform:rotateX(180deg)] [backface-visibility:hidden]">
								{end}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
