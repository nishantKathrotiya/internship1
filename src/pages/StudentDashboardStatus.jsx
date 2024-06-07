import "../stylesheets/StudentDashboardStatus.css";

const StudentDashboardStatus = ({ data }) => {
  return (
    <div className="navbar-dashboard-main-container-data">
      <div className="papertitle">{data.paperTitle}</div>
      <div className="date">{data.createdAt.split('T')[0]}</div>
      <div className="status">Status</div>
      <div className="action">Action</div>
    </div>
  );
};

export default StudentDashboardStatus;
