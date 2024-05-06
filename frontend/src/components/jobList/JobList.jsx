import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobs } from '../../actions/jobAction';
import JobCard from '../JobCard/JobCard';
import './JobList.css';

const JobList = () => {
  const dispatch = useDispatch();
  const { jobs, filters, loading, error, page, reachedEnd } = useSelector(state => state.jobs);
  const jobListRef = useRef();

  //Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight &&
        !loading &&
        !reachedEnd
      ) {
        // Calculate new offset based on the current number of jobs
        const newOffset = jobs.length;
        dispatch(fetchJobs(10, newOffset)); // Fetch 10 more jobs starting from the new offset
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch, jobs.length, loading, reachedEnd]);

  //Initial Job load
  useEffect(() => {
    if (!jobs.length) {
      dispatch(fetchJobs(10, 0)); // Fetch initial page of jobs
    }
  }, [dispatch, jobs.length]);

  const filteredJobs = jobs.filter(job => {
    // Check if the job matches the filter criteria
    let matchesAllFilters = true;
    if (filters.companyName !== '') {
      matchesAllFilters = matchesAllFilters && job.companyName.toLowerCase().includes(filters.companyName.toLowerCase());
    }
    if (filters.location !== '') {
      matchesAllFilters = matchesAllFilters && job.location.toLowerCase().includes(filters.location.toLowerCase());
    }
    if (filters.remote !== '') {
      matchesAllFilters = matchesAllFilters && (job.remote.toLowerCase() === filters.remote.toLowerCase());
    }
    if (filters.techStack !== '') {
      matchesAllFilters = matchesAllFilters && job.techStack.toLowerCase().includes(filters.techStack.toLowerCase());
    }
    if (filters.role !== '') {
      matchesAllFilters = matchesAllFilters && job.jobRole.toLowerCase().includes(filters.role.toLowerCase());
    }
    if (filters.minExperience !== '') {
      matchesAllFilters = matchesAllFilters && job.minExp >= parseInt(filters.minExperience);
    }
    if (filters.minBasePay !== '') {
      matchesAllFilters = matchesAllFilters && job.minJdSalary >= parseFloat(filters.minBasePay);
    }

    return matchesAllFilters;
  });

  return (
    <div className="job-list" ref={jobListRef}>
      {filteredJobs.map((job, index) => (
        <JobCard key={`${job.jdUid}-${job.companyName}-${job.location}-${index}`} job={job} />
      ))}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {reachedEnd && <p>No more jobs to load</p>}
    </div>
  );
};

export default JobList;