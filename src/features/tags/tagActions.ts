import * as createActions from './create/tagCreateSlice';
import * as detailsActions from './details/tagDetailsSlice';
import * as listActions from './list/tagListSlice';

const tagActions = {
    ...createActions,
    ...detailsActions,
    ...listActions
}

export default tagActions;