// Action types
export const UPDATE_FILTERS = 'UPDATE_FILTERS';

// Action creators
export const updateFilters = (filters) => ({
  type: UPDATE_FILTERS,
  payload: filters,
});
