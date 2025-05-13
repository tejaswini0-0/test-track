import React from 'react';
import { Clock } from 'lucide-react';
import Card, { CardContent, CardHeader } from '../ui/Card';
import Badge from '../ui/Badge';
import { TestCase } from '../../types';

interface TestCaseDetailsProps {
  testCase: TestCase;
}

const TestCaseDetails: React.FC<TestCaseDetailsProps> = ({ testCase }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{testCase.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{testCase.description}</p>
          </div>
          <div className="mt-2 sm:mt-0 flex items-center space-x-2">
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="w-3 h-3 mr-1" />
              {formatDate(testCase.updatedAt)}
            </div>
            <Badge status={testCase.status} />
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <h3 className="text-md font-medium text-gray-900">Expected Output</h3>
          </CardHeader>
          <CardContent>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md font-mono text-sm whitespace-pre-wrap">
              {testCase.expectedOutput}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-md font-medium text-gray-900">Actual Output</h3>
          </CardHeader>
          <CardContent>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md font-mono text-sm whitespace-pre-wrap">
              {testCase.actualOutput}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-md font-medium text-gray-900">Comparison</h3>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-md border">
            {testCase.expectedOutput === testCase.actualOutput ? (
              <div className="flex items-center text-emerald-700 bg-emerald-50 p-3 rounded">
                <span className="text-sm font-medium">
                  ✓ The expected and actual outputs match exactly.
                </span>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center text-red-700 bg-red-50 p-3 rounded">
                  <span className="text-sm font-medium">
                    ✗ The expected and actual outputs do not match.
                  </span>
                </div>
                <div className="p-3 border border-gray-200 rounded-md bg-gray-50">
                  <p className="text-xs text-gray-500 mb-2">Differences:</p>
                  <div className="font-mono text-sm">
                    {compareStrings(testCase.expectedOutput, testCase.actualOutput)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Simple string difference highlighter
const compareStrings = (expected: string, actual: string) => {
  if (expected === actual) return <div className="text-emerald-600">{expected}</div>;

  // For simplicity, we'll just highlight the entire strings
  return (
    <div className="space-y-2">
      <div>
        <span className="text-xs font-medium text-gray-500">Expected: </span>
        <span className="text-emerald-600">{expected}</span>
      </div>
      <div>
        <span className="text-xs font-medium text-gray-500">Actual: </span>
        <span className="text-red-600">{actual}</span>
      </div>
    </div>
  );
};

export default TestCaseDetails;