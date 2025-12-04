import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function TideChart() {
    const data = {
        labels: ["12AM", "3AM", "6AM", "9AM", "12PM", "3PM", "6PM", "9PM"],
        datasets: [
            {
                label: "Tide Height (m)",
                data: [1.2, 2.1, 3.4, 2.9, 1.8, 1.1, 2.3, 3.0],
                borderWidth: 2,
                tension: 0.4
            }
        ]
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                min: 0,
                max: 4
            }
        }
    };

    return (
        <div className="container mt-5 text-center">
            <h2>Today's Tide Chart</h2>
            <div className="mt-4">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}
