import React, { useState, useContext, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Store
import ContextStore from '../../context/ContextStore';
// Components
import Contact from '../../components/contactInfo/contact';
import ButtonWrapper from '../../components/buttons/buttonWrapper';
import CreditCard from './components/creditCard';
import Atm from './components/atm';
import Line from './components/line';
import PayPal from './components/paypal';
import Shop from './components/shop';

import { precaution } from '../PaymentMethod/constant';

export default function Info() {
	const history = useHistory();
	const { state, dispatch } = useContext(ContextStore);
	const {
		paymentApproach,
		isCopyContact,
		paymentInfo: { orderer: ordererValues, receiver: receiverValues },
	} = state;
	const [agree, setAgree] = useState(false);
	const [isOrderValid, setIsOrderValid] = useState(false);
	const [isReceiveValid, setIsReceiveValid] = useState(false);
	const [isCreditValid, setIsCreditValid] = useState(false);
	const ordererFormBtn = useRef(null);
	const receiveFormBtn = useRef(null);
	const creditCardFormBtn = useRef(null);

	useEffect(() => {
		if (!paymentApproach) {
			history.push('/step1');
		}
	}, [paymentApproach, history]);

	useEffect(() => {
		const validation = [agree, isOrderValid, isReceiveValid];
		if (paymentApproach === 'credit') {
			validation.push(isCreditValid);
		}

		const canNext = validation.every((isTrue) => isTrue);

		if (canNext) {
			history.push('/step3');
		}
	}, [history, paymentApproach, agree, isOrderValid, isReceiveValid, isCreditValid]);

	const onClickPrevStepBtnHandler = () => {
		history.push('/step1');
	};

	const onClickNextStepBtnHandler = () => {
		ordererFormBtn.current.click();
		receiveFormBtn.current.click();
		paymentApproach === 'credit' && creditCardFormBtn.current.click();
	};

	return (
		<div>
			<div
				style={{ backgroundImage: 'linear-gradient(270deg, #82D6D6 0%, #8BC1EF 100%)' }}
				className="pt-md pb-base px-base md:px-xl mb-lg -mt-base"
			>
				<div className="flex items-start md:items-center justify-between">
					<div className="border-l-2 border-solid border-white pl-base text-3xl text-white">
						訂單明細
					</div>
					<div className="flex items-baseline justify-between flex-col md:flex-row text-white text-base">
						<span className="md:px-base">商品小計 NT$ 880</span>
						<span className="md:px-base">運費 NT$ 60</span>
						<span className="md:pl-base">
							總金額 <span className="text-xl pl-sm">NT$ 940</span>
						</span>
					</div>
				</div>
			</div>

			{paymentApproach === 'shop' && <Shop />}
			{paymentApproach === 'credit' && (
				<CreditCard creditCardFormBtn={creditCardFormBtn} setIsCreditValid={setIsCreditValid} />
			)}
			{paymentApproach === 'line' && <Line />}
			{paymentApproach === 'paypal' && <PayPal />}
			{paymentApproach === 'atm' && <Atm />}

			<div className="mt-md">
				<Contact
					section="orderer"
					formBtn={ordererFormBtn}
					initialValues={ordererValues}
					dispatch={dispatch}
					//
					setIsOrderValid={setIsOrderValid}
				/>
			</div>
			<div className="mt-md">
				<Contact
					section="receiver"
					formBtn={receiveFormBtn}
					initialValues={receiverValues}
					dispatch={dispatch}
					//
					ordererValues={ordererValues}
					isCopyContact={isCopyContact}
					setIsReceiveValid={setIsReceiveValid}
				/>
			</div>

			<div className="md:w-4/5 mx-auto pl-0 sm:pl-md mt-md">
				<ul className="text-xs pl-6">
					{precaution
						.filter((el) => el.showAtPaymentInfo)
						.map((el, idx) => (
							<li key={`precaution-${idx + 1}`} className="pb-xs list-disc">
								{el.description}
							</li>
						))}
				</ul>
				<div className="pl-sm pt-sm">
					<span className="align-center cursor-pointer" onClick={() => setAgree(!agree)}>
						{agree ? (
							<i className="fas fa-check-circle text-main text-base"></i>
						) : (
							<i className="far fa-circle text-main text-base"></i>
						)}
						<span className="ml-sm text-base">確認，我已暸解</span>
					</span>
				</div>
			</div>
			<div className="md:w-4/5 mx-auto py-md">
				<ButtonWrapper
					showPrevBtn
					showNextBtn
					prevBtnCallback={onClickPrevStepBtnHandler}
					nextBtnCallback={onClickNextStepBtnHandler}
				/>
			</div>
		</div>
	);
}
