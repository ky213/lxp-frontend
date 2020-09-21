import React, {useState} from 'react';
import { ResponsivePie } from '@nivo/pie';
import { useAppState } from '@/components/AppState'
import { programService, courseService } from '@/services';

const PieChart = ({selectedProgramId, selectedCourseId}) => {
  const [{ selectedOrganization }] = useAppState();
  const [chartData, setChartData] = useState([
        {
          id: 'selectCourse',
          label: 'Select Course', 
          value: 1,
          color: 'hsl(166, 70%, 50%)',
        },
      ]);

  const loadData = () => {
    try {
        const data = await courseService.getAllUsersJoinedCourse(
          selectedOrganization.organizationId,
          selectedProgramId,
          selectedCourseId
        );

        if (data) {
          let notStarted = data.allUsers - (data.completed + data.inProgress);
          setChartData([
            {
              id: 'notStarted',
              label: 'Not Started',
              value: notStarted,
              color: '#CB251A',
            },
            {
              id: 'completedUsers',
              label: 'Completed',
              value: data.completed,
              color: '#1ACB2C',
            },
            {
              id: 'inProgress',
              label: 'In Progress',
              value: data.inProgress,
              color: '#18A0FB',
            },
          ]);
        }
      } catch (err) {
        showAlertMessage({
          title: 'Error',
          message: err,
          type: 'danger',
        });
      }
  } 


  return (
    <div style={{ height: 400 }}>
      <ResponsivePie
        data={chartData}
        margin={{}}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
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
          setSelectedSectionInPie(e.id);
          setTotalNumberOfRecords(e.value);
          if (e.id == 'inProgress') fetchAttemptedUsersData();
          if (e.id == 'notStarted') fetchNotAttemptedUsersData();
          if (e.id == 'completedUsers') fetchCompletedUsersData();
        }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: 'ruby',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'c',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'go',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'python',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'scala',
            },
            id: 'lines',
          },
          {
            match: {
              id: 'lisp',
            },
            id: 'lines',
          },
          {
            match: {
              id: 'elixir',
            },
            id: 'lines',
          },
          {
            match: {
              id: 'javascript',
            },
            id: 'lines',
          },
        ]}
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
    </div>
  )
};

export default PieChart;
