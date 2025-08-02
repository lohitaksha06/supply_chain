import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>PharmaChain</h1>
      </div>
      
      <div className="navbar-links">
        {role === 'company' && (
          <>
            <button onClick={() => navigate('/company/home')}>Home</button>
            <button onClick={() => navigate('/company/dashboard')}>Dashboard</button>
            <button onClick={() => navigate('/register')}>Register Batch</button>
          </>
        )}
        
        {role === 'hospital' && (
          <>
            <button onClick={() => navigate('/hospital/home')}>Home</button>
            <button onClick={() => navigate('/hospital/dashboard')}>Dashboard</button>
            <button onClick={() => navigate('/verify')}>Verify Batch</button>
          </>
        )}
        
        {role === 'customer' && (
          <>
            <button onClick={() => navigate('/customer/home')}>Home</button>
            <button onClick={() => navigate('/customer/dashboard')}>Dashboard</button>
            <button onClick={() => navigate('/track')}>Track Medicine</button>
          </>
        )}
      </div>

      <div className="navbar-user">
        <span>{user.name || user.email}</span>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
