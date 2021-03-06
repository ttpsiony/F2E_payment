import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/header/header';
import Method from './containers/PaymentMethod';
import Information from './containers/PaymentInfo';
import Confirm from './containers/PaymentConfirm';

function App() {
	let routes = null;

	routes = (
		<Switch>
			<Route
				path="/:step"
				children={({ match }) => {
					const {
						params: { step },
					} = match;
					const steps = ['step1', 'step2', 'step3'];
					const isMatch = steps.includes(step);

					if (isMatch) {
						return (
							<div className="md:container md:mx-auto px-base">
								<Header />
								<Route path="/step1" component={Method} />
								<Route path="/step2" component={Information} />
								<Route path="/step3" component={Confirm} />
							</div>
						);
					}
					return <Redirect to="/step1" />;
				}}
			/>
			<Redirect to="/step1" />
		</Switch>
	);

	return <div>{routes}</div>;
}

export default App;
