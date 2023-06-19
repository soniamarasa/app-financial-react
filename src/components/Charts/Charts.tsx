import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';
import './Charts.scss';

export default function Charts(props: any) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [540, 325, 702],
          backgroundColor: ['#A9B663', '#D86462', ' #C18F41'],
          hoverBackgroundColor: ['#A9B663', '#D86462', ' #C18F41'],
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);
  return (
    <div className="col-12 md:col-6 ">
      <h3>Titulo Grafico</h3>
      <Card className="card-chart shadow-3">
        <Chart
          width="350px"
          type="pie"
          data={chartData}
          options={chartOptions}
          className=""
        />
      </Card>
    </div>
  );
}
