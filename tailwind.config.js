// TODO: tailwind 與 scss 或 styled-component 共存的方式
module.exports = {
	purge: ['./src/**/*.html', './src/**/*.js'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
		textColor: {
			main: '#4BC9C9',
			primary: '#303133',
			secondary: '#606266',
			info: '#909399',
			danger: '#FA5555',
			white: '#ffffff',
			black: '#000000',
		},
		backgroundColor: {
			main: '#4BC9C9',
			primary: '#f0f2f5',
			secondary: '#F5F7FA',
		},
		borderColor: {
			main: '#4BC9C9',
			primary: '#dcdfe6',
			secondary: '#e4e7ed',
			danger: '#FA5555',
			white: '#ffffff',
		},
		spacing: {
			xs: '4px',
			sm: '8px',
			base: '15px',
			md: '30px',
			lg: '45px',
			xl: '60px',
			0: '0px',
			0.5: '0.125rem',
			1: '0.25rem',
			1.5: '0.375rem',
			2: '0.5rem',
			2.5: '0.625rem',
			3: '0.75rem',
			3.5: '0.875rem',
			4: '1rem',
			5: '1.25rem',
			6: '1.5rem',
			7: '1.75rem',
			8: '2rem',
			9: '2.25rem',
			10: '2.5rem',
			11: '2.75rem',
			12: '3rem',
			14: '3.5rem',
			16: '4rem',
			20: '5rem',
			24: '6rem',
			28: '7rem',
			32: '8rem',
			36: '9rem',
			40: '10rem',
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};