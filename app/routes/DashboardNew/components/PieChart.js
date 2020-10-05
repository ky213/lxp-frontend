import React, { useState, useEffect } from 'react'

import { useAppState } from '@/components/AppState'
import { courseService } from '@/services'

import Chart from 'chart.js'
import { hot } from 'react-hot-loader'

const PieChart = ({ course, experiences, onSetExperience }) => {
  const [{ selectedOrganization }] = useAppState()
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (chartData.length)
      new Chart(course.courseId, {
        type: 'doughnut',
        data: {
          labels: experiences,
          datasets: [
            {
              label: 'Course state',
              data: chartData,
              backgroundColor: ['#EB6356', '#1ACB2C', '#18A0FB'],
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
            onClick(e, { index }) {
              onSetExperience(course, index)
            },
          },
          title: {
            display: true,
            text: course.name,
          },
          onClick: onChartClick,
        },
      })
  }, [chartData])

  const loadData = async () => {
    try {
      if (course) {
        const data = await courseService.getAllUsersJoinedCourse(
          selectedOrganization.organizationId,
          course.programId,
          course.courseId
        )

        if (data) {
          const notStarted = data.allUsers - (data.completed + data.inProgress)
          setChartData([notStarted, data.completed, data.inProgress])
        }
      }
    } catch (err) {
      console.log({
        title: 'Error',
        message: err,
        type: 'danger',
      })
    }
  }

  const onChartClick = (event, arr) => {
    const index = arr[0]?._index
    onSetExperience(course, index)
  }

  return (
    <div
      style={{
        width: '300px',
        height: '300px',
        margin: 'auto',
        cursor: 'pointer',
      }}
    >
      <canvas id={course.courseId} width="300" height="300"></canvas>
    </div>
  )
}

export default hot(module)(PieChart)
