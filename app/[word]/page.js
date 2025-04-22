// app/[word]/page.js
import Word from "../components/word";

async function getWordData(word) {
	const res = await fetch(
		`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
	);
	if (!res.ok) {
		throw new Error("Word not found");
	}
	return res.json();
}
import fs from "fs";
import path from "path";

export default async function WordPage({ params }) {
	const STATUS = {
		NOT_WORDLE: "not wordle word",
		WORDLE: "wordle word",
	};
	let wordData = [];

	let status = STATUS.NOT_WORDLE;
	const { word: rawWord } = await params
	const word = rawWord.toLowerCase();

	const wordlePath = path.join(
		process.cwd(),
		"resources",
		"all-wordle.txt"
	);
	const wordleWords = fs
		.readFileSync(wordlePath, "utf-8")
		.split("\n");

	if (wordleWords.includes(word)) {
		status = STATUS.WORDLE;
	}

	try {
		wordData = await getWordData(word);
	} catch (error) {
		wordData = [];
	}

	return (
		<div className="w-screen grow flex flex-col items-center justify-center gap-5">
			<Word
				word={word}
				status={status === STATUS.WORDLE ? "correct" : "incorrect"}
			/>

			<div className="flex flex-row gap-2">
				{wordleWords.includes(word) ? (
					<span className="p-1 px-2 text-xl border border-[#6BAA64] bg-[#6BAA6422] text-[#6BAA64] rounded-full">
						Valid Wordle Word
					</span>
				) : wordData.length == 0 ? (
					<span className="p-1 px-2 text-xl border border-[#898989] bg-[#89898922] text-[#898989] rounded-full">
						Word Not in Dictionary
					</span>
				) : word.length != 5 ? (
					<div className="relative inline-flex items-center group">
						<span className="flex flex-row gap-2 p-1 px-2 align-center justify-center text-xl border border-[#898989] bg-[#89898922] text-[#898989] rounded-full">
							<div className="ml-2 cursor-help flex items-center justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 text-[#898989]"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity absolute left-0 top-full mt-2 w-64 p-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10">
									This word isn't the right length to use in Wordle
								</div>
							</div>
							Cannot be Guessed in Wordle
						</span>
					</div>
				) : (
					<div className="relative inline-flex items-center group">
						<span className="flex flex-row gap-2 p-1 px-2 align-center justify-center text-xl border border-[#898989] bg-[#89898922] text-[#898989] rounded-full">
							<div className="ml-2 cursor-help flex items-center justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 text-[#898989]"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity absolute left-0 top-full mt-2 w-64 p-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10">
									Wordle does not accept this word as a guess.
								</div>
							</div>
							Cannot be Guessed in Wordle
						</span>
					</div>
				)}
			</div>

			{wordData.length != 0 ? (
				<div className="flex flex-col items-center justify-center gap-2">
					<div className="flex flex-col gap-2 max-w-[480px] w-[100%] border border-[#898989] p-8 rounded-xl">
						<span className="text-2xl">
							{word} {wordData[0].phonetics.find((x) => x?.text)?.text && "⋅"}{" "}
							{wordData[0].phonetics.find((x) => x?.text)?.text}
						</span>

						{wordData[0].meanings.map((x, i) => {
							return (
								<div key={i}>
									<span className="opacity-60 italic">{x.partOfSpeech}</span>
									{x.definitions.slice(0, 2).map((x, i) => (
										<div key={i} className="ml-5">
											{i + 1}. {x.definition}
										</div>
									))}
								</div>
							);
						})}
					</div>
					<a
						href={`https://www.merriam-webster.com/dictionary/${word}`}
						className="opacity-40 underline"
					>
						See Word on Merriam-Webster
					</a>
				</div>
			) : wordleWords.includes(word) ? (
				<div>
					<div className="flex flex-col gap-2 max-w-[480px] w-[100%] border border-[#898989] p-8 rounded-xl">
						Word definition not available!
						<a
							href={`https://www.google.com/search?q=${word}`}
							className="opacity-40 underline"
						>
							Google "{word}"
						</a>
					</div>
				</div>
			) : (
				<a
					href={`https://www.google.com/search?q=${word}`}
					className="opacity-40 underline"
				>
					Google "{word}"
				</a>
			)}
		</div>
	);
}
