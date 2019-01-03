import React, { PureComponent } from "react";
import Loader from '../components/loader';

const withLoader = WrappedComponent => {
	class LoadingScreen extends PureComponent {
		render() {
			const { isLoading } = this.props;
			return isLoading ? <Loader /> : <WrappedComponent {...this.props} />;
		}
	}

	return LoadingScreen;
};

export default withLoader;