import React from 'react';
import { useParams } from 'react-router-dom';
import cx from 'classnames';
import styled from 'styled-components';

export default function Header() {
	const { step } = useParams();
	const step1_active = step === 'step1' || step === 'step2' || step === 'step3';
	const step2_active = step === 'step2' || step === 'step3';
	const step3_active = step === 'step3';

	return (
		<HeaderWrapper>
			<div>
				<i className="fas fa-money-bill-alt text-2xl" style={{ color: '#48Aeed' }}></i>
				<span className="text-4xl text-primary pl-sm font-bold">Payment</span>
			</div>
			<div className="mt-base relative z-10">
				<div className="md:w-4/5 mx-auto bg-secondary p-base">
					<div className="flex items-center justify-center sm:justify-around">
						{[1, 2, 3].map((el) => {
							const active =
								el === 1 ? step1_active : el === 2 ? step2_active : el === 3 ? step3_active : null;

							//
							return (
								<div key={el} className={cx({ 'text-main': active, 'text-primary': !active })}>
									<span
										className={cx(
											'block',
											'sm:inline-flex',
											'items-center',
											'justify-start',
											'md:justify-center',
											{ hidden: step !== `step${el}` },
										)}
									>
										<span
											style={{ flexBasis: '30px', width: '30px', height: '30px' }}
											className="hidden sm:inline border border-solid border-gray-500 rounded-full text-center"
										>
											{el}
										</span>
										<span
											style={{ width: '35px', height: '35px', fontSize: '18px' }}
											className="inline-flex items-center justify-center sm:hidden border border-solid border-gray-500 rounded-full text-center"
										>
											{el}
										</span>
										<span className="ml-sm text-2xl sm:text-base">
											{el === 1
												? '選擇付款方式'
												: el === 2
												? '填寫付款資訊'
												: el === 3
												? '確認訂購'
												: null}
										</span>
									</span>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</HeaderWrapper>
	);
}

const HeaderWrapper = styled.div``;
