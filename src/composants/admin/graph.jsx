import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function EvolutionInscriptions({ profiles = [] }) {
  const MONTHS = [
    "Jan",
    "Fév",
    "Mars",
    "Avr",
    "Mai",
    "Juin",
    "Juil",
    "Aoû",
    "Sep",
    "Oct",
  ];

  const HIGHLIGHT_INDEX = new Date().getMonth();

  const monthlyData = useMemo(() => {
    const counts = new Array(MONTHS.length).fill(0);

    profiles.forEach((user) => {
      if (user?.created_at) {
        const date = new Date(user.created_at);
        if (!isNaN(date)) {
          const monthIndex = date.getMonth();
          if (monthIndex < MONTHS.length) {
            counts[monthIndex] += 1;
          }
        }
      }
    });

    return counts;
  }, [profiles, MONTHS.length]);

  const backgroundColors = MONTHS.map((_, index) =>
    index === HIGHLIGHT_INDEX ? "#00B074" : "#2563EB",
  );

  const data = {
    labels: MONTHS,
    datasets: [
      {
        label: "Inscriptions",
        data: monthlyData,
        backgroundColor: backgroundColors,
        borderRadius: {
          topLeft: 6,
          topRight: 6,
          bottomLeft: 0,
          bottomRight: 0,
        },
        borderSkipped: false,
        barThickness: 22,
        maxBarThickness: 26,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1E293B",
        titleFont: { family: "'Inter', sans-serif", size: 12 },
        bodyFont: { family: "'Inter', sans-serif", size: 12 },
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context) => ` ${context.parsed.y} inscriptions`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: (context) =>
            context.index === HIGHLIGHT_INDEX ? "#00B074" : "#94A3B8",
          font: (context) => ({
            family: "'Inter', sans-serif",
            size: 11,
            weight: context.index === HIGHLIGHT_INDEX ? "bold" : "normal",
          }),
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
          drawBorder: false,
        },
        border: {
          display: false,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-full shadow-[0px_1px_3px_rgba(0,0,0,0.04)] border border-gray-100/80">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-base font-bold text-gray-900 tracking-tight">
            Évolution des inscriptions
          </h3>
          <p className="text-xs text-gray-400 font-normal mt-0.5">
            Nouveaux utilisateurs inscrits par mois
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
          <span className="text-xs text-gray-500 font-medium">
            Inscriptions
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-gray-100 bg-[#FAFAFA]/40 p-4 pt-6">
        <div className="w-full h-64">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
