import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ContextStore, { actions } from '../../context/ContextStore';

const MILLISECOND_PER_DAY = 24 * 60 * 60 * 1000;

export default function Confirm() {
	const history = useHistory();
	const { state, dispatch } = useContext(ContextStore);
	const {
		paymentApproach,
		paymentInfo: { receiver },
	} = state;
	const [deadline, setDeadline] = useState(null);

	useEffect(() => {
		if (paymentApproach) {
			const deadline = new Date().getTime() + MILLISECOND_PER_DAY * 3;
			setDeadline(new Date(deadline).toLocaleString());
		}
		const isToRedirect = Object.keys(receiver).some((el) => el === '');
		if (isToRedirect || !paymentApproach) {
			history.push('/step1');
		}
	}, [paymentApproach, receiver, history]);

	const onClickInitPaymentHandler = () => {
		dispatch(actions.initPaymentInfo());
		history.push('/step1');
	};

	return (
		<div className="md:w-4/5 mx-auto">
			<div className="pt-xl">
				<h2 className="text-secondary text-center text-4xl font-normal">訂購成功！</h2>
				{paymentApproach && paymentApproach !== 'shop' && (
					<div className="text-secondary text-center mt-sm">感謝您的訂購，我們將儘速為您出貨！</div>
				)}
				{paymentApproach === 'shop' && (
					<div>
						<div className="text-secondary text-center mt-sm">
							感謝您的訂購，請您在 {deadline} 前繳費
						</div>
						<div className="text-secondary text-center">
							至超商店內機台輸入代碼進行繳費，逾期訂單自動作廢。
						</div>
					</div>
				)}
				<div className="my-md text-center text-main text-8xl">
					<i className="fas fa-gift"></i>
				</div>
			</div>
			<div className="p-base bg-secondary">
				<div>訂單資訊 (JC293016)</div>
				<table className="w-full mt-sm text-secondary">
					<thead className="border-b border-solid border-secondary">
						<tr>
							<th className="py-sm pr-sm text-left">品項</th>
							<th className="py-sm w-14 sm:w-24 text-center sm:text-left">數量</th>
							<th className="py-sm w-14 sm:w-32 text-center sm:text-left">顏色</th>
							<th className="py-sm w-14 sm:w-32 text-right">價格</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="py-sm pr-sm">長版無袖洋裝</td>
							<td className="py-sm w-14 text-center sm:text-left">1</td>
							<td className="py-sm w-14 sm:w-32 text-center sm:text-left">綠色</td>
							<td className="py-sm w-14 sm:w-32 text-right">599元</td>
						</tr>
						<tr>
							<td className="py-sm pr-sm">大球氣質銀飾耳環(針式)</td>
							<td className="py-sm w-14 text-center sm:text-left">1</td>
							<td className="py-sm w-14 sm:w-32 text-center sm:text-left">紅色</td>
							<td className="py-sm w-14 sm:w-32 text-right">281元</td>
						</tr>
						<tr>
							<td className="pt-base pb-sm pr-sm"></td>
							<td className="pt-base pb-sm w-14"></td>
							<td className="pt-base pb-sm w-14 sm:w-32">運費</td>
							<td className="pt-base pb-sm w-14 sm:w-32 text-right">60元</td>
						</tr>
					</tbody>
				</table>

				<div className="border-t border-solid border-secondary pt-base text-secondary flex items-center justify-end">
					<span className="mr-base">共2品項，總計</span>
					<span className="font-bold text-2xl pl-base">NT$ 940</span>
				</div>

				<div className="mt-md">
					<div className="mb-sm">
						<span>取貨資訊</span>
					</div>
					<div className="flex items-center text-secondary pb-sm border-secondary border-b border-solid">
						<span style={{ width: '100px' }}>取貨人姓名</span>
						<span className="flex-1">{receiver.name}</span>
					</div>
					<div className="flex items-start sm:items-center text-secondary pt-sm">
						<span style={{ width: '100px' }}>取貨地址</span>
						<span className="flex-1">{receiver.address}</span>
					</div>
				</div>

				<div className="mt-md">
					<div className="mb-sm">付款資訊</div>
					<div className="flex items-start lg:items-center text-secondary flex-col lg:flex-row">
						<span className="mr-base mb-sm">
							{paymentApproach === 'shop'
								? '付款金額：940 元'
								: paymentApproach === 'credit'
								? '信用卡刷卡：940元'
								: paymentApproach === 'atm'
								? 'Web ATM付款：940元'
								: paymentApproach === 'line'
								? 'LINE Pay付款：940元'
								: paymentApproach === 'paypal'
								? '付款金額：940 元'
								: ''}
						</span>
						{paymentApproach === 'shop' && (
							<span className="mr-base mb-sm">繳費代碼：Rh7847213183</span>
						)}
						{paymentApproach === 'shop' && (
							<span className="mr-base mb-sm">繳費期限：{deadline}</span>
						)}
						{paymentApproach === 'shop' && <span className="mr-base mb-sm">狀態：待付款</span>}
						{paymentApproach !== 'shop' && <span className="mr-base mb-sm">狀態：已完成付款</span>}
					</div>
				</div>
			</div>

			<div className="my-lg flex items-center justify-center">
				<span
					className="sm:px-lg py-base border border-solid border-main rounded-sm text-secondary cursor-pointer mr-base flex-1 sm:flex-none text-center"
					onClick={onClickInitPaymentHandler}
				>
					會員專區
				</span>
				<span
					className="sm:px-lg py-base border border-solid border-main rounded-sm bg-main text-white cursor-pointer flex-1 sm:flex-none text-center"
					onClick={onClickInitPaymentHandler}
				>
					返回首頁
				</span>
			</div>
		</div>
	);
}
