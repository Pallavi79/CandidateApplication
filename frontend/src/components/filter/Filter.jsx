import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchJobs } from '../../actions/jobAction';
import { updateFilters } from '../../actions/filterAction';
import './Filter.css'
const Filters = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    minExperience: '',
    companyName: '',
    location: '',
    remote: '',
    techStack: '',
    role: '',
    minBasePay: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateFilters(filters));
    dispatch(fetchJobs(filters));  
  };
  

  return (
    <div className="filters">
      <form onSubmit={handleSubmit}>
        <input type="text" name="minExperience" placeholder="Min Experience" value={filters.minExperience} onChange={handleChange} />
        <input type="text" name="companyName" placeholder="Company Name" value={filters.companyName} onChange={handleChange} />
        <input type="text" name="location" placeholder="Location" value={filters.location} onChange={handleChange} />
        <input type="text" name="remote" placeholder="Remote/On-site" value={filters.remote} onChange={handleChange} />
        <input type="text" name="techStack" placeholder="Tech Stack" value={filters.techStack} onChange={handleChange} />
        <input type="text" name="role" placeholder="Role" value={filters.role} onChange={handleChange} />
        <input type="text" name="minBasePay" placeholder="Min Base Pay" value={filters.minBasePay} onChange={handleChange} />
        <button type="submit">Apply Filters</button>
      </form>
    </div>
  );
};

export default Filters;
