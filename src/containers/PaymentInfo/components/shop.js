import React from 'react';
import shop from '../../../assets/shop.png';
import familyMart from '../../../assets/familyMart.png';

export default function Shop() {
	return (
		<div className="md:w-4/5 mx-auto">
			<div className="flex items-center justify-center mb-md sm:mb-lg">
				<img className="w-8 mr-base" src={shop} alt="shop" />
				<span className="text-secondary text-xl">超商取貨 付款</span>
			</div>
			<div>
				<div className="flex items-start sm:items-center justify-between flex-col sm:flex-row mb-base">
					<div className="flex items-center mb-sm sm:mb-0">
						<span className="mr-base">選擇取貨門市</span>
						<img src={familyMart} alt="Family Mart" />
					</div>
					<div className="w-full sm:w-auto flex items-center justify-between sm:block">
						<span className="mr-base text-info cursor-pointer">
							<i className="fas fa-plus-circle"></i>
							<span className="ml-xs">選擇取貨門市</span>
						</span>
						<span className="text-main cursor-pointer">
							<i className="far fa-heart"></i>
							<span className="ml-xs">選擇常用門市</span>
						</span>
					</div>
				</div>
				<div className="border-l-2 border-solid border-main pb-base">
					<div className="bg-secondary py-sm pl-sm sm:pl-md">
						<table className="w-full">
							<tbody>
								<tr className="border-b border-solid border-secondary flex flex-col sm:flex-row text-secondary">
									<td className="pl-sm sm:p-sm">取貨店名</td>
									<td className="pb-sm pl-sm sm:p-sm">復興</td>
								</tr>
								<tr className="flex flex-col sm:flex-row text-secondary">
									<td className="pt-sm pl-sm sm:p-sm">取貨地址</td>
									<td className="pb-sm pl-sm sm:p-sm">台北市大安區復興路999段99號1巷</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
