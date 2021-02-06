import React from 'react';

export default function ButtonWrapper({
	showPrevBtn = false,
	showNextBtn = false,
	prevBtnCallback = () => {},
	nextBtnCallback = () => {},
}) {
	return (
		<div className="flex items-center justify-between sm:justify-end">
			{showPrevBtn && (
				<span
					className="sm:px-lg py-base border border-solid border-main rounded-sm text-secondary cursor-pointer mr-base flex-1 sm:flex-none text-center"
					onClick={prevBtnCallback}
				>
					上一步
				</span>
			)}
			{showNextBtn && (
				<span
					className="sm:px-lg py-base border border-solid border-main rounded-sm bg-main text-white cursor-pointer flex-1 sm:flex-none text-center"
					onClick={nextBtnCallback}
				>
					下一步
				</span>
			)}
		</div>
	);
}
