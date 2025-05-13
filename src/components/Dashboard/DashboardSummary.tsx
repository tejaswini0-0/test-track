import React from 'react';
import { CheckCircle, XCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card, { CardContent, CardHeader, CardFooter } from '../ui/Card';
import { useAppContext } from '../../context/AppContext';

const DashboardSummary: React.FC = () => {
  const { getProjectsWithStats } = useAppContext();
  const projectsWithStats = getProjectsWithStats();

  // Calculate total stats
  const totalProjects = projectsWithStats.length;
  const totalTestCases = projectsWithStats.reduce((acc, p) => acc + p.totalTests, 0);
  const totalPassed = projectsWithStats.reduce((acc, p) => acc + p.passedTests, 0);
  const totalFailed = projectsWithStats.reduce((acc, p) => acc + p.failedTests, 0);
  const totalPending = projectsWithStats.reduce((acc, p) => acc + p.pendingTests, 0);

  // Calculate pass rate
  const passRate = totalTestCases > 0 ? (totalPassed / totalTestCases) * 100 : 0;

  const stats = [
    {
      label: 'Total Test Cases',
      value: totalTestCases,
      icon: <AlertCircle className="w-6 h-6 text-blue-500" />,
      className: 'bg-blue-50 border-blue-100',
    },
    {
      label: 'Passed',
      value: totalPassed,
      icon: <CheckCircle className="w-6 h-6 text-emerald-500" />,
      className: 'bg-emerald-50 border-emerald-100',
    },
    {
      label: 'Failed',
      value: totalFailed,
      icon: <XCircle className="w-6 h-6 text-red-500" />,
      className: 'bg-red-50 border-red-100',
    },
  ];

  return (
    <div className="grid gap-6 mb-8 md:grid-cols-3">
      {stats.map((stat, index) => (
        <Card key={index} className={`${stat.className} border`}>
          <CardContent className="flex items-center p-6">
            <div className="mr-4">{stat.icon}</div>
            <div>
              <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="md:col-span-3">
        <CardHeader className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Test Pass Rate</h3>
          <span className="text-sm text-gray-500">
            {totalTestCases} test cases across {totalProjects} projects
          </span>
        </CardHeader>
        <CardContent>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-500 ease-in-out"
              style={{ width: `${passRate}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className="font-medium text-gray-700">
              {passRate.toFixed(1)}% passed
            </span>
            <span className="font-medium text-gray-700">
              {totalFailed} failed
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Link
            to="/projects"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            View all projects <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DashboardSummary;