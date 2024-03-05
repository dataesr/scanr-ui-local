import { Component, ReactNode } from "react";
import Error404 from "./error-404";
import Error500 from "./error-500";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: string;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: '',
  };

  public static getDerivedStateFromError(error: Error): State {
    console.log('ERROR_BOUNDARY', error);
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error.message };
  }

  public render() {
    if (!this.state.hasError) return this.props.children;

    if (this.state.error === '404') {
      return <Error404 error={this.state.error} />;
    }
    if (this.state.error !== '404') {
      return <Error500 error={this.state.error} />;
    }


  }
}

export default ErrorBoundary;