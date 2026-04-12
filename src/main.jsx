import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  render() {
    if (this.state.hasError) {
      return React.createElement('div', { style: { padding: 40, textAlign: 'center' } },
        React.createElement('h2', null, 'Đã xảy ra lỗi'),
        React.createElement('pre', { style: { color: 'red', fontSize: 12 } }, String(this.state.error))
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(ErrorBoundary, null, React.createElement(App))
)
