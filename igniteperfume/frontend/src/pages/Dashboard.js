// import React from "react";
// import Navbar from "../components/Navbar";

// const Dashboard = ({ user, logout }) => {
//   return (
//     <>
//       <Navbar user={user} logout={logout} />
//       <div className="container mt-4">
//         <h2>Dashboard</h2>
//         <p>Welcome to IgnitePerfume Dashboard!</p>
//       </div>
//     </>
//   );
// };

// export default Dashboard;
import React from "react";
import Navbar from "../components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import './Dashboard.css';

const Dashboard = ({ user, logout }) => {
  // Sample data
  const stats = [
    { icon: "🛒", title: "Total Orders", value: "1,245", trend: "+12%", color: "primary" },
    { icon: "👥", title: "New Customers", value: "324", trend: "+8%", color: "success" },
    { icon: "⭐", title: "Customer Rating", value: "4.8/5", trend: "+0.2", color: "warning" },
    { icon: "⏳", title: "Pending Orders", value: "28", trend: "-3%", color: "info" }
  ];

  const recentOrders = [
    { id: "#ORD-001", customer: "Sarah Johnson", date: "May 15, 2023", status: "Delivered", amount: "$89.99" },
    { id: "#ORD-002", customer: "Michael Brown", date: "May 14, 2023", status: "Shipped", amount: "$124.50" },
    { id: "#ORD-003", customer: "Emily Davis", date: "May 14, 2023", status: "Processing", amount: "$59.99" },
    { id: "#ORD-004", customer: "Robert Wilson", date: "May 13, 2023", status: "Delivered", amount: "$199.99" }
  ];

  return (
    <>
      <Navbar user={user} logout={logout} />
      
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header animate__animated animate__fadeIn">
          <div>
            <h2>Welcome back, {user?.name || 'Admin'}!</h2>
            <p className="text-muted">Here's what's happening with your store today</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-light me-2">
              <span className="me-1">🔔</span> Notifications
            </button>
            <button className="btn btn-light">
              <span className="me-1">✉️</span> Messages
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-4">
          {stats.map((stat, index) => (
            <div key={index} className="col-md-3 animate__animated animate__fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={`stat-card bg-${stat.color} bg-gradient text-white`}>
                <div className="stat-icon">
                  {stat.icon}
                </div>
                <div className="stat-content">
                  <h3>{stat.value}</h3>
                  <p>{stat.title}</p>
                  <span className="badge bg-white text-dark">{stat.trend}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="row g-4">
          {/* Sales Chart */}
          <div className="col-lg-8 animate__animated animate__fadeIn">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-white">
                <h5 className="mb-0">Sales Overview</h5>
              </div>
              <div className="card-body">
                <div className="chart-placeholder">
                  <span className="fs-4">📊</span>
                  <p>Sales chart will appear here</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="col-lg-4 animate__animated animate__fadeIn animate__delay-1s">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-white">
                <h5 className="mb-0">Quick Actions</h5>
              </div>
              <div className="card-body">
                <button className="quick-action-btn btn btn-outline-primary mb-3">
                  <span className="me-2">🛒</span> Add New Order
                </button>
                <button className="quick-action-btn btn btn-outline-success mb-3">
                  <span className="me-2">👥</span> Manage Customers
                </button>
                <button className="quick-action-btn btn btn-outline-warning mb-3">
                  <span className="me-2">⭐</span> View Reviews
                </button>
                <button className="quick-action-btn btn btn-outline-info">
                  <span className="me-2">⚙️</span> Store Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="card shadow-sm mt-4 animate__animated animate__fadeIn">
          <div className="card-header bg-white">
            <h5 className="mb-0">Recent Orders</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={index}>
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.date}</td>
                      <td>
                        <span className={`badge bg-${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{order.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Helper function for status colors
function getStatusColor(status) {
  switch(status) {
    case 'Delivered': return 'success';
    case 'Shipped': return 'info';
    case 'Processing': return 'warning';
    default: return 'secondary';
  }
}

export default Dashboard;