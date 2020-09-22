import React, { useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { useAppState } from '@/components/AppState';
import { courseService } from '@/services';

const PieChart = ({ course }) => {
  const [{ selectedOrganization }] = useAppState();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

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
          setChartData([
            {
              id: 'notStarted',
              label: 'Not Started',
              value: notStarted,
              color: 'hsl(44,70%,50%)',
            },
            {
              id: 'completedUsers',
              label: 'Completed',
              value: data.completed,
              color: 'hsl(200, 70%, 50%)',
            },
            {
              id: 'inProgress',
              label: 'In Progress',
              value: data.inProgress,
              color: 'hsl(100, 70%, 50%)',
            },
          ]);
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

  return (
    <ResponsivePie
      data={chartData}
      width={300}
      height={300}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      enableRadialLabels={true}
      radialLabel="label"
      radialLabelsSkipAngle={10}
      radialLabelsTextXOffset={6}
      radialLabelsTextColor="#333333"
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={16}
      radialLabelsLinkHorizontalLength={24}
      radialLabelsLinkStrokeWidth={1}
      radialLabelsLinkColor={{ from: 'color' }}
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor="#333333"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      onClick={(e) => {
        // setSelectedSectionInPie(e.id);
        // setTotalNumberOfRecords(e.value);
        // if (e.id == 'inProgress') fetchAttemptedUsersData();
        // if (e.id == 'notStarted') fetchNotAttemptedUsersData();
        // if (e.id == 'completedUsers') fetchCompletedUsersData();
      }}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          translateY: 56,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#999',
          symbolSize: 18,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000',
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
