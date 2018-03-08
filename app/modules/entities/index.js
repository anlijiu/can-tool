/* INDEX FILE

This file, from a module perspective, behaves as the duck file form the original proposal.
It exports as default the reducer function of the duck.
It exports as named export the selectors and the operations.
Optionally it exports the actions and types if they are needed in other ducks.

*/

import reducer from "./reducers";

export { default as entitiesSelectors } from "./selectors";
export { default as entitiesActions } from "./actions";
export { default as entitiesTypes } from "./types";

export default reducer;
