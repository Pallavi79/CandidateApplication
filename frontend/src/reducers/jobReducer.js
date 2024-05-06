import { FETCH_JOBS_REQUEST, FETCH_JOBS_SUCCESS, FETCH_JOBS_FAILURE } from '../actions/jobAction';
import { UPDATE_FILTERS } from '../actions/filterAction';

const initialState = {
  jobs: [],
  loading: false,
  error: null,
  filters: {
    minExperience: '',
    companyName: '',
    location: '',
    remote: '',
    techStack: '',
    role: '',
    minBasePay: ''
  },
  page: 1, // Current page number
  reachedEnd: false, // Flag to indicate if all jobs have been loaded
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_JOBS_SUCCESS:
      // Append newly fetched jobs to the existing jobs list
      const updatedJobs = [...state.jobs, ...action.payload];
      return {
        ...state,
        loading: false,
        jobs: updatedJobs,
        page: state.page + 1, // Increment page number after fetching jobs
        reachedEnd: action.payload.length === 0, // Update reachedEnd flag if no new jobs were fetched
      };
    case FETCH_JOBS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        },
        // Reset page number and reachedEnd flag when filters are updated
        page: 1,
        reachedEnd: false,
      };
    default:
      return state;
  }
};

export default jobReducer;
