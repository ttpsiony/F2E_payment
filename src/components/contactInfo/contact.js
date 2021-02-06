import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import cx from 'classnames';
import { actions } from '../../context/ContextStore';

const formSchema = Yup.object().shape({
	name: Yup.string().required('此欄位必填'),
	phone: Yup.string()
		.matches(/^[09]{2}[0-9]{8}$/, '手機號碼格式不正確')
		.required('此欄位必填'),
	postalCode: Yup.string()
		.matches(/^(\d{3}|\d{5})$/, '格式不符')
		.required('此欄位必填'),
	address: Yup.string().required('此欄位必填'),
	email: Yup.string().email('電子郵件格式錯誤').required('此欄位必填'),
});

const initial = {
	name: '',
	phone: '',
	postalCode: '',
	address: '',
	email: '',
};

export default function Contact({
	section = 'orderer',
	initialValues = initial,
	formBtn,
	dispatch,
	ordererValues,
	isCopyContact,
	setIsOrderValid,
	setIsReceiveValid,
}) {
	const isOrderContact = section === 'orderer';

	const [showInfoSection, setShowInfoSection] = useState(false);

	const onClickRadioBtnHandler = () => dispatch(actions.copyOrdererInfo());

	const toggleInfoSection = () => setShowInfoSection(!showInfoSection);

	return (
		<Formik
			initialValues={{ ...initialValues }}
			validationSchema={!isCopyContact || isOrderContact ? formSchema : null}
			onSubmit={(values) => {
				// console.log(section, values);
				section === 'orderer' && setIsOrderValid(true);
				section === 'receiver' && setIsReceiveValid(true);
			}}
		>
			{({ errors, touched, handleChange, handleSubmit }) => (
				<form onSubmit={handleSubmit} className="md:w-4/5 mx-auto">
					<div className="mb-base">
						<div>
							<span>{isOrderContact ? '填寫訂購人資訊' : '填寫收件人資訊'}</span>
							{!isOrderContact && (
								<span
									className="ml-md cursor-pointer inline-flex items-center"
									onClick={onClickRadioBtnHandler}
								>
									{isCopyContact ? (
										<i className="fas fa-check-circle text-main text-xl"></i>
									) : (
										<i className="far fa-circle text-main text-xl"></i>
									)}
									<span className="text-secondary ml-sm">同訂購人資料</span>
								</span>
							)}
							{!isOrderContact && (
								<span className="ml-sm cursor-pointer" onClick={toggleInfoSection}>
									{showInfoSection ? (
										<i className="fas fa-chevron-down"></i>
									) : (
										<i className="fas fa-chevron-up"></i>
									)}
								</span>
							)}
						</div>
						{!isCopyContact &&
							!isOrderContact &&
							(errors.phone ||
								errors.name ||
								errors.postalCode ||
								errors.address ||
								errors.email) &&
							!showInfoSection && (
								<div className="text-sm text-danger" style={{ marginTop: '-4px' }}>
									收件人資訊必填
								</div>
							)}
					</div>
					{(showInfoSection || section === 'orderer') && (
						<div className="border-l-2 border-solid border-main pl-base sm:pl-md">
							<div className="grid grid-cols-2 grid-rows-3 gap-x-base gap-y-0 sm:gap-md">
								<div className="flex items-start sm:items-center flex-col sm:flex-row col-span-2 sm:col-auto">
									<label
										className="block w-16 text-secondary"
										htmlFor={section === 'orderer' ? 'order-name' : 'receive-name'}
									>
										姓名
									</label>
									<div className="flex-grow w-full sm:w-auto mt-xs sm:mt-0">
										<input
											className={cx(
												'py-sm px-base border border-solid border-main rounded w-full outline-none text-info focus:shadow transition-shadow',
												{ 'border-danger': !isCopyContact && errors.name && touched.name },
											)}
											type="text"
											id={isOrderContact ? 'order-name' : 'receive-name'}
											placeholder="請填寫真實姓名"
											disabled={!isOrderContact && isCopyContact}
											name="name"
											onChange={(e) => {
												// 勾選同訂購人資訊，同步更新收件人資訊
												isOrderContact &&
													isCopyContact &&
													dispatch(actions.setPaymentInfo('name', e.target.value, 'receiver'));

												// 寫進redux
												dispatch(actions.setPaymentInfo('name', e.target.value, section));
												// form change
												handleChange(e);
											}}
											// onBlur={handleBlur}
											value={
												!isOrderContact && isCopyContact ? ordererValues.name : initialValues.name
											}
										/>
										{!isCopyContact && errors.name && touched.name && (
											<div className="text-sm text-danger">{errors.name}</div>
										)}
									</div>
								</div>
								<div className="flex items-start sm:items-center flex-col sm:flex-row col-span-2 sm:col-auto">
									<label
										className="block w-16 text-secondary"
										htmlFor={isOrderContact ? 'order-phone' : 'receive-phone'}
									>
										手機
									</label>
									<div className="flex-grow w-full sm:w-auto mt-xs sm:mt-0">
										<input
											className={cx(
												'py-sm px-base border border-solid border-main rounded w-full outline-none text-info focus:shadow transition-shadow',
												{
													'border-danger': !isCopyContact && errors.phone && touched.phone,
												},
											)}
											type="text"
											id={isOrderContact ? 'order-phone' : 'receive-phone'}
											placeholder="請填寫手機號碼"
											disabled={!isOrderContact && isCopyContact}
											name="phone"
											onChange={(e) => {
												// 勾選同訂購人資訊，同步更新收件人資訊
												isOrderContact &&
													isCopyContact &&
													dispatch(actions.setPaymentInfo('phone', e.target.value, 'receiver'));
												// 寫進redux
												dispatch(actions.setPaymentInfo('phone', e.target.value, section));
												handleChange(e);
											}}
											// onBlur={handleBlur}
											value={
												!isOrderContact && isCopyContact ? ordererValues.phone : initialValues.phone
											}
										/>
										{!isCopyContact && errors.phone && touched.phone && (
											<div className="text-sm text-danger">{errors.phone}</div>
										)}
									</div>
								</div>
								<div className="col-span-2 flex items-center flex-wrap">
									<label
										className="block w-16 text-secondary"
										htmlFor={isOrderContact ? 'order-postalCode' : 'receive-postalCode'}
									>
										地址
									</label>
									<div className="flex items-center w-auto sm:w-24 sm:block mr-sm sm:mr-md">
										<input
											className={cx(
												'py-sm px-base border border-solid border-main rounded w-24 sm:w-full outline-none text-info focus:shadow transition-shadow',
												{
													'border-danger':
														!isCopyContact && errors.postalCode && touched.postalCode,
												},
											)}
											type="text"
											id={isOrderContact ? 'order-postalCode' : 'receive-postalCode'}
											placeholder="郵遞區號"
											disabled={!isOrderContact && isCopyContact}
											name="postalCode"
											onChange={(e) => {
												// 勾選同 同步更新收件人資訊
												isOrderContact &&
													isCopyContact &&
													dispatch(
														actions.setPaymentInfo('postalCode', e.target.value, 'receiver'),
													);
												// 寫進redux
												dispatch(actions.setPaymentInfo('postalCode', e.target.value, section));
												handleChange(e);
											}}
											// onBlur={handleBlur}
											value={
												!isOrderContact && isCopyContact
													? ordererValues.postalCode
													: initialValues.postalCode
											}
										/>
										{!isCopyContact && errors.postalCode && touched.postalCode && (
											<div className="w-24 ml-sm sm:ml-0 text-sm text-danger">
												{errors.postalCode}
											</div>
										)}
									</div>
									<div className="flex-grow w-full sm:w-auto mt-xs sm:mt-0">
										<input
											className={cx(
												'py-sm px-base border border-solid border-main rounded w-full outline-none text-info focus:shadow transition-shadow',
												{
													'border-danger': !isCopyContact && errors.address && touched.address,
												},
											)}
											type="text"
											id={section === 'orderer' ? 'order-address' : 'receive-address'}
											placeholder="請填寫地址"
											disabled={!isOrderContact && isCopyContact}
											name="address"
											onChange={(e) => {
												// 勾選同訂購人資訊，同步更新收件人資訊
												isOrderContact &&
													isCopyContact &&
													dispatch(actions.setPaymentInfo('address', e.target.value, 'receiver'));
												// 寫進redux
												dispatch(actions.setPaymentInfo('address', e.target.value, section));
												handleChange(e);
											}}
											// onBlur={handleBlur}
											value={
												!isOrderContact && isCopyContact
													? ordererValues.address
													: initialValues.address
											}
										/>
										{!isCopyContact && errors.address && touched.address && (
											<div className="text-sm text-danger">{errors.address}</div>
										)}
									</div>
								</div>
								<div className="col-span-2 flex items-start sm:items-center flex-col sm:flex-row">
									<label
										className="block w-16 text-secondary mt-base sm:mt-0"
										htmlFor={isOrderContact ? 'order-email' : 'receive-email'}
									>
										Email
									</label>
									<div className="flex-grow w-full sm:w-auto mt-sm sm:mt-0">
										<input
											className={cx(
												'py-sm px-base border border-solid border-main rounded w-full outline-none text-info focus:shadow transition-shadow',
												{
													'border-danger': !isCopyContact && errors.email && touched.email,
												},
											)}
											type="text"
											id={isOrderContact ? 'order-email' : 'receive-email'}
											placeholder="請填寫電子信箱"
											name="email"
											disabled={!isOrderContact && isCopyContact}
											onChange={(e) => {
												// 勾選同訂購人資訊，同步更新收件人資訊
												isOrderContact &&
													isCopyContact &&
													dispatch(actions.setPaymentInfo('email', e.target.value, 'receiver'));
												// 寫進redux
												dispatch(actions.setPaymentInfo('email', e.target.value, section));
												handleChange(e);
											}}
											// onBlur={handleBlur}
											value={
												!isOrderContact && isCopyContact ? ordererValues.email : initialValues.email
											}
										/>
										{!isCopyContact && errors.email && touched.email && (
											<div className="text-sm text-danger">{errors.email}</div>
										)}
									</div>
								</div>
							</div>
						</div>
					)}
					<button ref={formBtn} className="hidden" type="submit">
						hidden
					</button>
				</form>
			)}
		</Formik>
	);
}
