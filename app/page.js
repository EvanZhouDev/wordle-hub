"use client";
import Word from "./components/word";

export default function Home() {
	return (
		<div className="h-full flex flex-col items-center justify-center">
			<div className="flex flex-row gap-[7px] mb-5">
				<Word word="wordle" status="correct" />
				<Word word="hub" delay={100 * 6} />
			</div>
			<div className="opacity-40">
				Enter a word to check its meaning, and whether or not it's valid in the game Wordle.
			</div>
		</div>
	);
}
