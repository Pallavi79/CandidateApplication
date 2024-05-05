import React, { useState } from 'react';
import './JobCard.css';

const JobCard = ({ job }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.slice(0, maxLength) + '...';
  };

  return (
    <div className="job-card">
      <div className="job-details">
        <div className='top-section'>
          <div className='job-logo'>
            <img src={job.logoUrl} alt={job.companyName} className="company-logo" />
          </div>
          <div className='job-info'>
            <h2 className="job-title">{job.companyName}</h2>
            <p><strong>Job Role:</strong> {job.jobRole}</p>
            <p><strong>Location:</strong> {job.location}</p>
          </div>

        </div>
        <div>
          <p><strong>Max Experience:</strong> {job.maxExp}</p>
          <p><strong>Min Experience:</strong> {job.minExp}</p>
          <p className="job-description">
            <strong>Job Description:</strong> {expanded ? job.jobDetailsFromCompany : truncateDescription(job.jobDetailsFromCompany, 100)}
            {!expanded && <a href="#" onClick={toggleDescription}>Read more</a>}
          </p>
          <p><strong>Salary:</strong> {job.minJdSalary && job.maxJdSalary ? `${job.minJdSalary} - ${job.maxJdSalary} ${job.salaryCurrencyCode}` : "Salary not specified"}</p>
          <p><strong>Job Link:</strong> <a href={job.jdLink}>{job.jdLink}</a></p>
        </div>
      </div>
      <div className="job-actions">
        <button className="easy-apply-button">Easy Apply</button>
        <button className="unlock-referral-button">Unlock Referral</button>
      </div>
    </div>
  );
};

export default JobCard;