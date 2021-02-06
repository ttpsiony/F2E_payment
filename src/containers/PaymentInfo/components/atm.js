import React from 'react';
import { banksOptions } from '../constant';
import atm from '../../../assets/atm-machine.png';

export default function Atm() {
	return (
		<div className="md:w-4/5 mx-auto">
			<div className="flex items-center justify-center mb-md sm:mb-lg">
				<img className="w-8 mr-base" src={atm} alt="atm" />
				<span className="text-secondary text-xl">Ｗeb ATM 付款</span>
			</div>
			<div>
				<div>
					<span>付款資訊</span>
				</div>
				<div className="mt-base border-l-2 border-solid border-main pl-base sm:pl-md">
					<div className="flex items-start flex-col sm:flex-row">
						<span className="w-16">銀行</span>
						<div className="mt-xs sm:mt-0">
							<div>
								<select
									className="py-xs px-base border border-solid border-main rounded outline-none text-info"
									name="bank"
								>
									{banksOptions.map((el, idx) => (
										<option key={`${el}-${idx}`} value={el.value}>
											{el.name}
										</option>
									))}
								</select>
							</div>
							<ul className="pl-base mt-base text-info text-xs list-disc">
								<li className="pb-xs">請先準備好晶片讀卡機與金融卡，以利作業</li>
								<li className="pb-xs">
									請選擇您常用的銀行網路ATM，依步驟將金融卡插進讀卡機後進行轉帳
								</li>
								<li className="pb-xs">使用台新銀行轉帳免費，他行將酌收15元手續費用/筆</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
