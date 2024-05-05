import JobCard from "../JobCard/JobCard";
import { useSelector } from 'react-redux';
import './JobList.css';

const JobList = ({ jobs}) => {
  const filters = useSelector(state => state.jobs.filters);
  const filteredJobs = jobs.filter(job => {
    // Check if each job matches the filter criteria
    let matchesAllFilters = true;

    // Filter each field only if it's present in the filters
     // Filter each field only if it's present in the filters
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

  console.log('these arefiltered jobs',filteredJobs);
  return (
    <div className="job-list">
      {filteredJobs.map((job) => (
        <JobCard key={job.jdUid} job={job} />
      ))}
    </div>
  );
};

export default JobList;
