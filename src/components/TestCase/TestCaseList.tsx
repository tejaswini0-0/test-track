import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Edit, Trash2 } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { TestCase } from '../../types';
import EmptyState from '../ui/EmptyState';

interface TestCaseListProps {
  projectId: string;
  testCases: TestCase[];
  onEditTestCase: (testCase: TestCase) => void;
  onDeleteTestCase: (testCaseId: string) => void;
}

const TestCaseList: React.FC<TestCaseListProps> = ({
  projectId,
  testCases,
  onEditTestCase,
  onDeleteTestCase,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pass' | 'fail'>('all');

  // Apply filters
  const filteredTestCases = testCases.filter((testCase) => {
    const matchesSearch = testCase.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          testCase.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || testCase.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search test cases"
            className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">Filter:</span>
          </div>
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button
              className={`px-3 py-1 text-xs font-medium ${
                statusFilter === 'all'
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setStatusFilter('all')}
            >
              All
            </button>
            <button
              className={`px-3 py-1 text-xs font-medium ${
                statusFilter === 'pass'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setStatusFilter('pass')}
            >
              Pass
            </button>
            <button
              className={`px-3 py-1 text-xs font-medium ${
                statusFilter === 'fail'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setStatusFilter('fail')}
            >
              Fail
            </button>
          </div>
        </div>
      </div>

      {filteredTestCases.length > 0 ? (
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Last Updated
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTestCases.map((testCase) => (
                <tr key={testCase.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/projects/${projectId}/tests/${testCase.id}`}
                      className="text-sm font-medium text-gray-900 hover:text-blue-600"
                    >
                      {testCase.name}
                    </Link>
                    <p className="mt-1 text-xs text-gray-500 line-clamp-1">{testCase.description}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge status={testCase.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(testCase.updatedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onEditTestCase(testCase)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onDeleteTestCase(testCase.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          title="No test cases found"
          description={searchTerm || statusFilter !== 'all' ? 
            "No test cases match your current filters. Try adjusting your search or filters." : 
            "Get started by adding your first test case for this project."}
          action={
            !searchTerm && statusFilter === 'all' && (
              <Button 
                onClick={() => onEditTestCase({
                  id: '',
                  projectId,
                  name: '',
                  description: '',
                  expectedOutput: '',
                  actualOutput: '',
                  status: 'pending',
                  createdAt: '',
                  updatedAt: ''
                })}
              >
                Add Test Case
              </Button>
            )
          }
        />
      )}
    </div>
  );
};

export default TestCaseList;