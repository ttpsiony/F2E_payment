import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';
import ButtonWrapper from '../../components/buttons/buttonWrapper';
import { paymentMethods, precaution } from './constant';
import ContextStore, { actions } from '../../context/ContextStore';

export default function Method() {
	const history = useHistory();
	const { state, dispatch } = useContext(ContextStore);
	const { paymentApproach } = state;

	const onClickNextStepBtnHandler = () => {
		paymentApproach && history.push('/payment/step2');
	};

	return (
		<div>
			<div
				style={{ backgroundImage: 'linear-gradient(270deg, #82D6D6 0%, #8BC1EF 100%)' }}
				className="pt-md pb-base px-base md:px-xl mb-md sm:mb-lg -mt-base"
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

			<div className="md:w-4/5 mx-auto grid grid-cols-1 sm:grid-cols-2 gap-base sm:gap-md">
				{paymentMethods.map((el, idx) => (
					<div
						key={`${el.title_1}_${idx + 1}`}
						className={cx(
							'rounded border border-solid p-base sm:p-md cursor-pointer h-28 sm:h-auto hover:bg-secondary',
							{
								'border-primary': paymentApproach !== el.method,
								'border-main bg-secondary': paymentApproach === el.method,
							},
						)}
						onClick={() => dispatch(actions.setPaymentApproach(el.method))}
					>
						<div className="flex items-center h-full">
							{paymentApproach === el.method ? (
								<i className="fas fa-check-circle text-main text-2xl"></i>
							) : (
								<i className="far fa-circle text-main text-2xl"></i>
							)}
							<img src={el.src} alt={el.alt} className="w-xl mx-base" />
							<div>
								<div className="text-secondary">{el.title_1}</div>
								<div className="text-info">{el.title_2}</div>
							</div>
						</div>
					</div>
				))}
			</div>

			<ul className="md:w-4/5 mx-auto mt-lg text-xs pl-6">
				{precaution.map((el, idx) => (
					<li key={`precaution-${idx + 1}`} className="pb-xs list-disc">
						{el.description}
					</li>
				))}
			</ul>
			<div className="md:w-4/5 mx-auto pt-md sm:pt-lg pb-md">
				<ButtonWrapper showNextBtn nextBtnCallback={onClickNextStepBtnHandler} />
			</div>
		</div>
	);
}
