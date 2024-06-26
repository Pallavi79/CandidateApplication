import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from './actions/jobAction';
import Filter from "./components/filter/Filter"
import JobList from "./components/jobList/JobList"
function App() {
  const dispatch = useDispatch();
  const { jobs} = useSelector(state => state.jobs);
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  console.log('jobs',jobs);
  return (
    <>
      <Filter />
      <JobList jobs={jobs} />
    </>
  )
}

export default App
