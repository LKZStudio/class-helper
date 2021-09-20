import { HashRouter as Router, Route } from 'react-router-dom'
import { Calendar } from './pages/Calendar'
import { Index } from './pages/Index'
import { Random } from './pages/Random'

export function App() {
  return (
    <Router>
      <Route path="/" exact={true} component={Index} />
      <Route path="/index" exact={true} component={Index} />
      <Route path="/calendar" exact={true} component={Calendar} />
      <Route path="/random" exact={true} component={Random} />
    </Router>
  )
}