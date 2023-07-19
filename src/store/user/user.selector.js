import { createSelector } from 'reselect';


export const selectUserFromUserReducer  = (state) => state.user;

export const selectCurrentUserFromUser = createSelector(
    [selectUserFromUserReducer],
    (user)=> user.currentUser
)