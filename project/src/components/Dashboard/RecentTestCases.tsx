import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import Card, { CardContent, CardHeader } from '../ui/Card';
import Badge from '../ui/Badge';
import { useAppContext } from '../../context/AppContext';
import { TestCase } from '../../types';
import EmptyState from '../ui/EmptyState';

const RecentTestCases: React.FC = () => {
  const { testCases, getProjectById } = useAppContext();

  // Sort test cases by updated time (most recent first) and take the first 5
  const recentTestCases = [...testCases]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getProjectName = (projectId: string) => {
    const project = getProjectById(projectId);
    return project ? project.name : 'Unknown Project';
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Recent Test Cases</h3>
        <Link to="/projects" className="text-sm text-blue-600 hover:text-blue-800">
          View all
        </Link>
      </CardHeader>
      <CardContent>
        {recentTestCases.length > 0 ? (
          <div className="overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {recentTestCases.map((testCase: TestCase) => (
                <li key={testCase.id} className="py-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <Link 
                        to={`/projects/${testCase.projectId}/tests/${testCase.id}`}
                        className="text-sm font-medium text-gray-900 hover:text-blue-600"
                      >
                        {testCase.name}
                      </Link>
                      <p className="mt-1 text-xs text-gray-500">
                        {getProjectName(testCase.projectId)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatDate(testCase.updatedAt)}
                      </div>
                      <Badge status={testCase.status} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <EmptyState
            title="No test cases yet"
            description="Create your first test case to see it here."
            icon={<Clock className="w-12 h-12 text-gray-400" />}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default RecentTestCases;