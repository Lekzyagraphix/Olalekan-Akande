import React, { Component, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: '',
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error.message || 'An unexpected error occurred.',
    };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Application ErrorBoundary caught error:', error, errorInfo);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center px-6 py-16">
          <div className="max-w-xl w-full border border-white/15 p-8 md:p-12 bg-[#1A1A1A]">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E31B23] mb-4">
              System Notice
            </p>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Something interrupted this view.
            </h1>
            <p className="text-sm text-white/70 leading-relaxed mb-8">
              Please refresh the page or return to the homepage. If you are managing content in the
              CMS, verify that your administrator session is active.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-[#E31B23] text-white text-xs font-semibold tracking-[0.14em] uppercase hover:bg-white hover:text-[#111111] transition-colors cursor-pointer"
              >
                Reload Page
              </button>
              <Link
                to="/"
                onClick={() => this.setState({ hasError: false, errorMessage: '' })}
                className="px-6 py-3 border border-white/30 text-white text-xs font-semibold tracking-[0.14em] uppercase hover:border-white transition-colors"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
