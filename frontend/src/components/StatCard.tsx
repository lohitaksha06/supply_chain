interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard = ({ title, value, icon, trend }: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="text-gray-500">{title}</div>
        <div className="text-blue-500">{icon}</div>
      </div>
      
      <div className="text-2xl font-bold text-gray-700 mb-2">
        {value}
      </div>
      
      {trend && (
        <div className="flex items-center">
          <span className={`text-sm ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
          <span className="text-gray-400 text-sm ml-2">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
