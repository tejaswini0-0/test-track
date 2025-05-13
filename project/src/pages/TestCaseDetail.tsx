import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import Button from '../components/ui/Button';
import TestCaseDetails from '../components/TestCase/TestCaseDetails';
import Modal from '../components/ui/Modal';
import TestCaseForm from '../components/TestCase/TestCaseForm';
import { useAppContext } from '../context/AppContext';

const TestCaseDetail: React.FC = () => {
  const { projectId, testId } = useParams<{ projectId: string; testId: string }>();
  const navigate = useNavigate();
  
  const {
    getProjectById,
    testCases,
    updateTestCase,
    deleteTestCase,
  } = useAppContext();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!projectId || !testId) {
    navigate('/projects');
    return null;
  }

  const project = getProjectById(projectId);
  const testCase = testCases.find((t) => t.id === testId);

  if (!project || !testCase) {
    navigate(`/projects/${projectId}`);
    return null;
  }

  const handleEditTestCase = (testCaseData: Omit<typeof testCase, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    setIsSubmitting(true);

    // Simulate a slight delay for better UX
    setTimeout(() => {
      updateTestCase({
        ...testCase,
        ...testCaseData,
      });
      
      setIsSubmitting(false);
      setIsEditModalOpen(false);
    }, 300);
  };

  const handleDeleteTestCase = () => {
    deleteTestCase(testId);
    setIsDeleteModalOpen(false);
    navigate(`/projects/${projectId}`);
  };

  return (
    <Layout>
      <Button
        variant="ghost"
        size="sm"
        className="mb-6"
        onClick={() => navigate(`/projects/${projectId}`)}
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to {project.name}
      </Button>
      
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Test Case Details</h1>
        <div className="flex space-x-2">
          <Button variant="secondary" onClick={() => setIsEditModalOpen(true)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="danger" onClick={() => setIsDeleteModalOpen(true)}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <TestCaseDetails testCase={testCase} />

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Test Case"
      >
        <TestCaseForm
          projectId={projectId}
          testCase={testCase}
          onSubmit={handleEditTestCase}
          onCancel={() => setIsEditModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Test Case"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Are you sure you want to delete this test case? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteTestCase}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default TestCaseDetail;