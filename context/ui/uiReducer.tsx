import { UiState } from './';

type UiActionType = 
| { type: '[UI] - ToggleMenu' }
| { type: '[UI] - ToggleDropdownMenu', payload: boolean }

export const uiReducer = ( state: UiState, action: UiActionType ): UiState => {

    switch (action.type) {
       case '[UI] - ToggleMenu':
          return {
               ...state,
               isMenuOpen: !state.isMenuOpen
              }
      case '[UI] - ToggleDropdownMenu':
        return {
             ...state,
             isDropdownOpen: action.payload
            }

       default:
         return state;
    }
}