interface DashboardWelcomeProps {
  userName: string;
  role: string;
  stats: {
    label: string;
    value: string | number;
  }[];
}

const DashboardWelcome = ({ userName, role, stats }: DashboardWelcomeProps) => {
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getRoleEmoji = () => {
    switch (role.toLowerCase()) {
      case 'company':
        return '🏢';
      case 'hospital':
        return '🏥';
      case 'customer':
        return '👤';
      default:
        return '👋';
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {getTimeBasedGreeting()}, {userName} {getRoleEmoji()}
          </h1>
          <p className="text-blue-100">
            Welcome to your {role.toLowerCase()} dashboard. Here's your overview for today.
          </p>
        </div>
        
        <div className="text-sm text-blue-100">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-4 transition-transform hover:transform hover:scale-105"
          >
            <div className="text-blue-100">{stat.label}</div>
            <div className="text-2xl font-bold mt-2">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardWelcome;
