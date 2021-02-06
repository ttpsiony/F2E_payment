import shop from '../../assets/shop.png';
import credit from '../../assets/credit-card.png';
import line from '../../assets/pay-per-click.png';
import paypal from '../../assets/paypal.png';
import atm from '../../assets/atm-machine.png';

export const paymentMethods = [
	{
		method: 'shop',
		src: shop,
		alt: '超商取貨',
		title_1: '超商取貨 付款',
		title_2: '24隔日取貨說明',
	},
	{
		method: 'credit',
		src: credit,
		alt: '信用卡 付款',
		title_1: '信用卡 付款',
		title_2: 'VISA, Master, JCB',
	},
	{
		method: 'line',
		src: line,
		alt: 'LINE Pay 付款',
		title_1: 'LINE Pay 付款',
		title_2: '使用line point折抵消費',
	},
	{
		method: 'paypal',
		src: paypal,
		alt: 'PayPal 付款',
		title_1: 'PayPal 付款',
		title_2: '使用第三方支付',
	},
	{
		method: 'atm',
		src: atm,
		alt: 'Web ATM 付款',
		title_1: 'Web ATM 付款',
		title_2: '網路銀行ATM操作說明',
	},
];

export const precaution = [
	{
		showAtPaymentInfo: true,
		description: (
			<div className="text-info">
				請確認您填寫的資料是否正確，一旦訂單完成後，付款與物流方式皆無法修改。
			</div>
		),
	},
	{
		showAtPaymentInfo: false,
		description: (
			<div className="text-info">使用ATM轉帳，將依據銀行入帳日，依序進行出貨/排貨。</div>
		),
	},
	{
		showAtPaymentInfo: false,
		description: (
			<div className="text-info">
				每筆訂單所提供的「ATM專屬虛擬帳號」皆不同，若您欲使用本項服務，敬請放心進行匯款作業，安全又便利！
			</div>
		),
	},
	{
		showAtPaymentInfo: true,
		description: (
			<div className="text-info">
				若訂單內含預購、無庫存商品調貨時間請參考「商品平均調貨時間」。
			</div>
		),
	},
	{
		showAtPaymentInfo: true,
		description: (
			<div className="text-info">
				若您對取貨或付款的方式有疑問，請詳閱「
				<span className="text-main cursor-pointer hover:underline">購買說明</span>」。
			</div>
		),
	},
	{
		showAtPaymentInfo: true,
		description: (
			<div className="text-black">
				請確認您已詳閱並瞭解本站「
				<span className="text-main cursor-pointer hover:underline">購買說明</span>」
				內容，訂單完成即表示您已同意其中的各項說明。
			</div>
		),
	},
];
