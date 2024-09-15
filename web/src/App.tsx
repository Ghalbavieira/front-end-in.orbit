import { Dialog } from './components/ui/ui/dialog';
import './index.css';

import { CreateGoal } from './components/create-goal';
import { EmptyGoal } from './components/empty-goal';
import { Summary } from './components/summary';

export function App() {
  return (
    <Dialog>
      <Summary />
      {/* <EmptyGoal /> */}
      <CreateGoal />
    </Dialog>
  )
}

