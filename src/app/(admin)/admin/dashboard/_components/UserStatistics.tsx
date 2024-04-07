'use client';

import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Tooltip } from 'chart.js';
import { Bar, ChartProps } from 'react-chartjs-2';
import { getNumOfSiteUsers } from '@/service/admin';
import { useQuery } from '@tanstack/react-query';
import { NumOfSiteUserPayload } from '@/interfaces/Dto/Admin/GetNumOfSiteUsersDto';

enum USER_STATISTICS_TITLE {
  'totalUserLength' = '전체 유저',
  'basicUserLength' = '일반 유저',
  'premiumLength' = '구독 유저',
}

const labelColors = {
  totalUserLength: 'rgba(33, 158, 79, 0.8)',
  basicUserLength: 'rgba(54, 162, 235, 0.8)',
  premiumLength: 'rgba(153, 102, 255, 0.8)',
} as const;

ChartJS.register(BarElement, Tooltip, CategoryScale, LinearScale);

function UserStatistics() {
  const { data } = useQuery(['statistics'], () => getNumOfSiteUsers(), {
    suspense: true,
    select(res) {
      return res.data.data;
    },
    refetchOnWindowFocus: false,
  });

  const labels = ['전체 유저', '일반 유저', '구독 유저'];
  const colors = [labelColors.totalUserLength, labelColors.basicUserLength, labelColors.premiumLength];

  return (
    <>
      <UserStatistics.StatisticsList numOfUsers={data!} />
      <div className="relative flex h-[360px] items-center justify-center sm:h-[440px]">
        <UserStatistics.BarChart
          labels={labels}
          colors={colors}
          numOfUsers={data ?? { totalUserLength: 0, basicUserLength: 0, premiumLength: 0 }}
        />
      </div>
    </>
  );
}

export default UserStatistics;

UserStatistics.StatisticsList = function UserStatisticsList({ numOfUsers }: { numOfUsers: NumOfSiteUserPayload }) {
  return (
    <div className="box-border flex w-full items-center gap-3">
      {Array.from(Object.entries(numOfUsers)).map(([userType, numOfUser]) => {
        return (
          <UserStatistics.StatisticsItem
            key={userType}
            userType={userType as keyof typeof USER_STATISTICS_TITLE}
            value={numOfUser}
          />
        );
      })}
    </div>
  );
};

UserStatistics.StatisticsItem = function UserStatisticsItem({
  userType,
  value,
}: {
  userType: keyof typeof USER_STATISTICS_TITLE;
  value: number;
}) {
  return (
    <div className="box-border flex flex-1 flex-col gap-3 rounded-md bg-white p-2 shadow-md">
      <h3
        className="font-bold"
        style={{
          color: labelColors[userType],
        }}
      >
        {USER_STATISTICS_TITLE[userType]}
      </h3>
      <span className="font-bold text-black">{value}명</span>
    </div>
  );
};

UserStatistics.BarChart = function UserStatisticsBarChart({
  labels,
  colors,
  numOfUsers,
}: {
  labels: string[];
  colors: string[];
  numOfUsers: NumOfSiteUserPayload;
}) {
  const data = Array.from(Object.entries(numOfUsers)).map(([userType, numOfUser]) => numOfUser);

  const barOptions: ChartProps<'bar'>['options'] = {
    responsive: true,
    layout: {
      padding: 20,
    },
    scales: {
      y: {
        ticks: {
          stepSize: numOfUsers.totalUserLength <= 10 ? 2 : undefined,
        },
        beginAtZero: true,
        afterDataLimits: (scale) => {
          scale.max = Math.round(scale.max * 1.2);
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label(tooltipItem) {
            return tooltipItem.formattedValue + '명';
          },
        },
      },
    },
  };

  const userBarData: ChartProps<'bar'>['data'] = {
    labels,
    datasets: [
      {
        label: '유저',
        data,
        backgroundColor: colors,
        barThickness: 24,
      },
    ],
  };

  return <Bar data={userBarData} options={barOptions} />;
};
