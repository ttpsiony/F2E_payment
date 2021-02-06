import React from 'react';

export const ActionType = {
	SET_PAYMENT_APPROACH: 'SET_PAYMENT_APPROACH',
	SET_PAYMENT_INFO: 'SET_PAYMENT_INFO',
	COPY_ORDERER_INFO: 'COPY_ORDERER_INFO',

	//
	INIT_PAYMENT_INFO: 'INIT_PAYMENT_INFO',
};

export const actions = {
	initPaymentInfo: () => ({
		type: ActionType.INIT_PAYMENT_INFO,
	}),

	//
	setPaymentApproach: (method) => ({
		type: ActionType.SET_PAYMENT_APPROACH,
		method,
	}),
	setPaymentInfo: (name, value, contactType = null) => ({
		type: ActionType.SET_PAYMENT_INFO,
		name,
		value,
		contactType,
	}),
	copyOrdererInfo: () => ({
		type: ActionType.COPY_ORDERER_INFO,
	}),
};

export const initialState = {
	paymentApproach: null,
	isCopyContact: false,
	paymentInfo: {
		bankName: '',
		cardNumber: '',
		validDate: '',
		validCode: '',
		orderer: {
			name: '',
			phone: '',
			postalCode: '',
			address: '',
			email: '',
		},
		receiver: {
			name: '',
			phone: '',
			postalCode: '',
			address: '',
			email: '',
		},
	},
};

export function reducer(state, action) {
	switch (action.type) {
		case ActionType.INIT_PAYMENT_INFO:
			return {
				...initialState,
			};
		case ActionType.SET_PAYMENT_APPROACH:
			const { method } = action;
			return {
				...state,
				paymentApproach: method || null,
			};
		case ActionType.SET_PAYMENT_INFO:
			const { name, value, contactType } = action;
			if (!contactType) {
				return {
					...state,
					paymentInfo: {
						...state.paymentInfo,
						[name]: value,
					},
				};
			}
			return {
				...state,
				paymentInfo: {
					...state.paymentInfo,
					[contactType]: {
						...state.paymentInfo[contactType],
						[name]: value,
					},
				},
			};
		case ActionType.COPY_ORDERER_INFO:
			return {
				...state,
				isCopyContact: !state.isCopyContact,
				paymentInfo: {
					...state.paymentInfo,
					receiver: {
						...state.paymentInfo.receiver,
						...state.paymentInfo.orderer,
					},
				},
			};
		default:
			return {
				...state,
			};
	}
}

export default React.createContext({});
