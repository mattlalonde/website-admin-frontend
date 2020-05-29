import * as createActions from './create/articleCreateSlice';
import * as detailsActions from './details/articleDetailsSlice';
import * as listActions from './list/articleListSlice';

const articleActions = {
    ...createActions,
    ...detailsActions,
    ...listActions
}

export default articleActions;