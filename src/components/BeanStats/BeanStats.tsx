import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { styled } from 'styled-components';

const BeanStats = () => {
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  );
  const data = {
    labels: ['향', '단맛', '바디감', '쓴맛', '신맛'],
    datasets: [
      {
        label: 'Roasting Point',
        data: [100, 90, 85, 94, 75],
        fill: true,
        backgroundColor: '#FFB3871d',
        borderColor: '#FFB387',
        pointBackgroundColor: '#FFB387',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
      },
    ],
  };

  return (
    <Container>
      <Radar data={data} />
    </Container>
  );
};
export default BeanStats;

const Container = styled.div`
  width: 500px;
  max-width: 900px;
`;
