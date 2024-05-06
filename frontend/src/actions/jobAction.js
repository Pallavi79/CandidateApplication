// Action types
export const FETCH_JOBS_REQUEST = 'FETCH_JOBS_REQUEST';
export const FETCH_JOBS_SUCCESS = 'FETCH_JOBS_SUCCESS';
export const FETCH_JOBS_FAILURE = 'FETCH_JOBS_FAILURE';

// Action creators
export const fetchJobsRequest = () => ({
    type: FETCH_JOBS_REQUEST,
});

export const fetchJobsSuccess = (jobs) => ({
    type: FETCH_JOBS_SUCCESS,
    payload: jobs,
});

export const fetchJobsFailure = (error) => ({
    type: FETCH_JOBS_FAILURE,
    payload: error,
});

// Modified fetchJobs action creator to support infinite scrolling
export const fetchJobs = (limit, offset) => async (dispatch) => {
    dispatch(fetchJobsRequest());
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const body = JSON.stringify({
            limit,
            offset
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body
        };

        const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
        const data = await response.json();
        const jdList = data.jdList;
        dispatch(fetchJobsSuccess(jdList));
    } catch (error) {
        dispatch(fetchJobsFailure(error.message));
    }
};
