import React, { useState, useEffect } from 'react';

import { useAppState } from '@/components/AppState';
import { courseService } from '@/services';

import Chart from 'chart.js';

const PieChart = ({
  course,
  fetchCompleted,
  fetchInProgress,
  fetchNotStarted,
}) => {
  const [{ selectedOrganization }] = useAppState();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (chartData.length)
      new Chart(course.courseId, {
        type: 'doughnut',
        data: {
          labels: ['Not started', 'Completed', 'In progress'],
          datasets: [
            {
              label: 'Course state',
              data: [2, 5, 8],
              backgroundColor: ['#CB251A', '#1ACB2C', '#18A0FB'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 20,
            },
            onClick: (e, { index }) => {
              if (index) getData(index);
            },
          },
          title: {
            display: true,
            text: course.name,
          },
          onClick: onChartClick,
        },
      });
  }, [chartData]);

  const loadData = async () => {
    try {
      if (course) {
        const data = await courseService.getAllUsersJoinedCourse(
          selectedOrganization.organizationId,
          course.programId,
          course.courseId
        );

        if (data) {
          const notStarted = data.allUsers - (data.completed + data.inProgress);
          setChartData([notStarted, data.completed, data.inProgress]);
        }
      }
    } catch (err) {
      console.log({
        title: 'Error',
        message: err,
        type: 'danger',
      });
    }
  };

  const onChartClick = (event, arr) => {
    const index = arr[0]?._index;
    if (index) getData(index);
  };

  const getData = (index) => {
    if (index === 0) fetchNotStarted(course);
    if (index === 1) fetchCompleted(course);
    if (index === 2) fetchInProgress(course);
  };

  return (
    <div style={{ width: '300px', height: '300px', margin: 'auto' }}>
      <canvas id={course.courseId} width="300" height="300"></canvas>
    </div>
  );
};

export default PieChart;
