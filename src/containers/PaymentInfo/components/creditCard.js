import React from 'react';
import credit from '../../../assets/credit-card.png';
import visa from '../../../assets/visa.png';
import master from '../../../assets/master.png';
import jcb from '../../../assets/jcb.png';
import { Formik } from 'formik';
import * as Yup from 'yup';

const formSchema = Yup.object().shape({
	cardNum: Yup.string().required('此欄位必填'),
	validDate: Yup.string().required('此欄位必填'),
	CVV: Yup.string().required('此欄位必填'),
	phone: Yup.string()
		.matches(/^[09]{2}[0-9]{8}$/, '手機號碼格式不正確')
		.required('此欄位必填'),
});

const initial = {
	cardNum: '',
	validDate: '',
	CVV: '',
	phone: '',
};

export default function CreditCard({ creditCardFormBtn }) {
	return (
		<Formik
			initialValues={{ ...initial }}
			validationSchema={formSchema}
			onSubmit={(values) => {
				// console.log(values);
			}}
		>
			{({ errors, touched, handleChange, handleBlur, handleSubmit }) => (
				<form onSubmit={handleSubmit} className="md:w-4/5 mx-auto">
					<div className="flex items-center justify-center mb-md sm:mb-lg">
						<img className="w-8 mr-base" src={credit} alt="credit card" />
						<span className="text-secondary text-xl">信用卡 付款</span>
					</div>
					<div className="flex justify-between sm:justify-start sm:items-end mr-sm">
						<span className="mr-sm">填寫付款資訊</span>
						<div className="flex items-center">
							<img className="mr-sm" src={visa} alt="visa" />
							<img className="mr-sm" src={master} alt="master" />
							<img className="mr-0 sm:mr-sm" src={jcb} alt="jcb" />
						</div>
					</div>
					<div className="mt-base border-l-2 border-solid border-main pl-base sm:pl-md">
						<div>
							<div className="flex items-start sm:items-center flex-col sm:flex-row">
								<span className="w-16 text-secondary mb-sm sm:mt-0">卡號</span>
								<div>
									<input
										name="cardNum"
										style={{ width: '210px' }}
										className="py-sm px-base border border-solid border-main rounded outline-none text-info focus:shadow transition-shadow"
										onChange={handleChange}
										onBlur={handleBlur}
										type="text"
										placeholder="0000-0000-0000-0000"
									/>
									{errors.cardNum && touched.cardNum && (
										<div className="text-sm text-danger">{errors.cardNum}</div>
									)}
								</div>
							</div>
						</div>
						{/*  */}
						<div className="flex items-start sm:items-center flex-col sm:flex-row mt-base sm:mt-md">
							<div>
								<div className="flex items-center">
									<span className="w-16 text-secondary">有效日</span>
									<input
										name="validDate"
										className="w-24 py-sm px-base mr-md border border-solid border-main rounded outline-none text-info focus:shadow transition-shadow"
										type="text"
										placeholder="MM/YY"
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</div>
								{errors.validDate && touched.validDate && (
									<div className="text-sm text-danger">{errors.validDate}</div>
								)}
							</div>
							<div className="mt-base sm:mt-0">
								<div>
									<span className="w-16 text-secondary mr-base">驗證碼</span>
									<input
										name="CVV"
										style={{ width: '68px' }}
										className="py-sm px-base border border-solid border-main rounded outline-none text-info focus:shadow transition-shadow"
										type="text"
										placeholder="CVV"
										maxLength="4"
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</div>
								{errors.CVV && touched.CVV && (
									<div className="text-sm text-danger">{errors.CVV}</div>
								)}
							</div>
						</div>
						{/*  */}
						<div>
							<div className="flex items-center mt-base sm:mt-md">
								<span className="w-16 text-secondary">手機</span>
								<input
									name="phone"
									className="py-sm px-base border border-solid border-main rounded outline-none text-info focus:shadow transition-shadow"
									type="text"
									onChange={handleChange}
									onBlur={handleBlur}
								/>
							</div>
							{errors.phone && touched.phone && (
								<div className="text-sm text-danger">{errors.phone}</div>
							)}
						</div>
					</div>
					<button ref={creditCardFormBtn} className="hidden" type="submit"></button>
				</form>
			)}
		</Formik>
	);
}
