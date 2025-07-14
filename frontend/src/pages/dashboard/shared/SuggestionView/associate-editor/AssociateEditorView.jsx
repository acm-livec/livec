import { Status } from '@utils/constants';





import NewView from './new-view';
import ClosedView from './closed-view';
import ActiveView from './active-view';
import FinalizedView from './finalized-view';
export default function AssociateEditorView({ suggestion, user }) {

    const sys = suggestion.system.status

    const systemStatus = {
        active: sys === Status.System.ACTIVE,
        closed: sys === Status.System.CLOSED,
        new: sys === Status.System.NEW,
        finalized: sys === Status.System.ELEVATED
    }



    return (
        <>
            {systemStatus.new && <NewView suggestion={suggestion}/>}
            {systemStatus.closed && <ClosedView suggestion={suggestion}/>}
            {systemStatus.active && <ActiveView suggestion={suggestion}/>}
            {systemStatus.finalized && <FinalizedView suggestion={suggestion}/>}
        </>
    )
}