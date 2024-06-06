import "../stylesheets/StudentDashboardStatus.css";

const StudentDashboardStatus = () => {
  return (
    <div>
      <div className="StudentDashboardStatus-main-container">
        <div className="StudentDashboardStatus-paper-title">01</div>
        <div className="StudentDashboardStatus-date">5-june-24</div>
        <div className="StudentDashboardStatus-pending-status">Pending</div>
        <div className="StudentDashboardStatus-action">
          <div className="view">View</div>
          <div className="edit"> Edit</div>
          <div className="download"> Download</div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardStatus;
