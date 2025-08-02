import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface BatchChartProps {
  data: {
    labels: string[];
    values: number[];
  };
  type: 'line' | 'bar' | 'pie';
  title: string;
}

const BatchChart = ({ data, type, title }: BatchChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type,
      data: {
        labels: data.labels,
        datasets: [
          {
            label: title,
            data: data.values,
            backgroundColor: [
              'rgba(59, 130, 246, 0.5)', // blue-500
              'rgba(16, 185, 129, 0.5)', // green-500
              'rgba(239, 68, 68, 0.5)',  // red-500
              'rgba(245, 158, 11, 0.5)', // yellow-500
              'rgba(139, 92, 246, 0.5)', // purple-500
            ],
            borderColor: [
              'rgb(59, 130, 246)', // blue-500
              'rgb(16, 185, 129)', // green-500
              'rgb(239, 68, 68)',  // red-500
              'rgb(245, 158, 11)', // yellow-500
              'rgb(139, 92, 246)', // purple-500
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: title
          }
        },
        scales: type !== 'pie' ? {
          y: {
            beginAtZero: true
          }
        } : undefined
      }
    });

    // Cleanup
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, type, title]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default BatchChart;
