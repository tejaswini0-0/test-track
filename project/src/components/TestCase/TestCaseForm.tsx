import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import { TestCase } from '../../types';

interface TestCaseFormProps {
  projectId: string;
  testCase?: TestCase;
  onSubmit: (testCaseData: Omit<TestCase, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const TestCaseForm: React.FC<TestCaseFormProps> = ({
  projectId,
  testCase,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [expectedOutput, setExpectedOutput] = useState('');
  const [actualOutput, setActualOutput] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
    expectedOutput?: string;
    actualOutput?: string;
  }>({});

  // If editing, populate form with existing data
  useEffect(() => {
    if (testCase) {
      setName(testCase.name);
      setDescription(testCase.description);
      setExpectedOutput(testCase.expectedOutput);
      setActualOutput(testCase.actualOutput);
    }
  }, [testCase]);

  const validate = () => {
    const newErrors: {
      name?: string;
      description?: string;
      expectedOutput?: string;
      actualOutput?: string;
    } = {};
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'Test case name is required';
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = 'Test case description is required';
      isValid = false;
    }

    if (!expectedOutput.trim()) {
      newErrors.expectedOutput = 'Expected output is required';
      isValid = false;
    }

    if (!actualOutput.trim()) {
      newErrors.actualOutput = 'Actual output is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onSubmit({
        projectId,
        name,
        description,
        expectedOutput,
        actualOutput,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Test Case Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`mt-1 block w-full rounded-md border ${
            errors.name ? 'border-red-300' : 'border-gray-300'
          } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
          placeholder="Enter test case name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className={`mt-1 block w-full rounded-md border ${
            errors.description ? 'border-red-300' : 'border-gray-300'
          } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
          placeholder="Describe what this test case is validating"
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="expectedOutput" className="block text-sm font-medium text-gray-700">
            Expected Output
          </label>
          <textarea
            id="expectedOutput"
            value={expectedOutput}
            onChange={(e) => setExpectedOutput(e.target.value)}
            rows={3}
            className={`mt-1 block w-full rounded-md border ${
              errors.expectedOutput ? 'border-red-300' : 'border-gray-300'
            } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
            placeholder="What should the test result be?"
          />
          {errors.expectedOutput && (
            <p className="mt-1 text-sm text-red-600">{errors.expectedOutput}</p>
          )}
        </div>

        <div>
          <label htmlFor="actualOutput" className="block text-sm font-medium text-gray-700">
            Actual Output
          </label>
          <textarea
            id="actualOutput"
            value={actualOutput}
            onChange={(e) => setActualOutput(e.target.value)}
            rows={3}
            className={`mt-1 block w-full rounded-md border ${
              errors.actualOutput ? 'border-red-300' : 'border-gray-300'
            } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
            placeholder="What was the actual result?"
          />
          {errors.actualOutput && <p className="mt-1 text-sm text-red-600">{errors.actualOutput}</p>}
        </div>
      </div>
      
      {expectedOutput && actualOutput && (
        <div className="p-3 mt-2 border rounded-md bg-gray-50">
          <p className="text-sm text-gray-700">
            Status: {expectedOutput === actualOutput ? (
              <span className="font-medium text-emerald-600">PASS</span>
            ) : (
              <span className="font-medium text-red-600">FAIL</span>
            )}
          </p>
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : testCase ? 'Update Test Case' : 'Create Test Case'}
        </Button>
      </div>
    </form>
  );
};

export default TestCaseForm;