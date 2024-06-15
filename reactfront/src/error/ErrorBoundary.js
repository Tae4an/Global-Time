import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
        console.error("Error caught in Error Boundary: ", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // 폴백 UI를 커스텀 할 수 있습니다.
            // return <h1>Something went wrong.</h1>;
            return <h1> </h1>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
