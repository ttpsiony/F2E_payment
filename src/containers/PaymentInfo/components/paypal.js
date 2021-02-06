import React from 'react';
import paypal from '../../../assets/paypal.png';

export default function PayPal() {
	return (
		<div className="md:w-4/5 mx-auto">
			<div className="flex items-center justify-center mb-md sm:mb-lg">
				<div className="w-24 h-16">
					<img className="w-full object-cover" src={paypal} alt="paypal" />
				</div>
			</div>
			<div></div>
		</div>
	);
}
