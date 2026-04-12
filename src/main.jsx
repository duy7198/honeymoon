import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Plan from './Plan'

function Root() {
  const [view, setView] = useState('overview')
  return React.createElement('div', null,
    React.createElement('div', { style: { position:'sticky', top:0, zIndex:100, display:'flex', background:'linear-gradient(135deg,#fef3c7,#fde68a)', borderBottom:'2px solid #fbbf24' } },
      React.createElement('button', { onClick:()=>setView('overview'), style: { flex:1, padding:'12px 8px', border:'none', background:view==='overview'?'rgba(255,255,255,0.6)':'transparent', fontFamily:"'Crimson Text','Noto Serif',Georgia,serif", fontSize:14, fontWeight:view==='overview'?700:400, color:'#92400e', cursor:'pointer', borderBottom:view==='overview'?'3px solid #b45309':'3px solid transparent' } }, '📊 Tổng Quan'),
      React.createElement('button', { onClick:()=>setView('plan'), style: { flex:1, padding:'12px 8px', border:'none', background:view==='plan'?'rgba(255,255,255,0.6)':'transparent', fontFamily:"'Crimson Text','Noto Serif',Georgia,serif", fontSize:14, fontWeight:view==='plan'?700:400, color:'#92400e', cursor:'pointer', borderBottom:view==='plan'?'3px solid #b45309':'3px solid transparent' } }, '📋 Lịch Trình Chi Tiết')
    ),
    view === 'overview'
      ? React.createElement(App)
      : React.createElement(Plan)
  )
}

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
  React.createElement(ErrorBoundary, null, React.createElement(Root))
)
