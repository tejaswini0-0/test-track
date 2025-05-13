import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import PageHeader from '../components/Layout/PageHeader';
import Button from '../components/ui/Button';
import TestCaseList from '../components/TestCase/TestCaseList';
import Modal from '../components/ui/Modal';
import TestCaseForm from '../components/TestCase/TestCaseForm';
import { useAppContext } from '../context/AppContext';
import { TestCase } from '../types';

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  
  const {
    getProjectById,
    getTestCasesByProjectId,
    addTestCase,
    updateTestCase,
    deleteTestCase,
  } = useAppContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTestCase, setCurrentTestCase] = useState<TestCase | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [testCaseToDelete, setTestCaseToDelete] = useState<string | null>(null);

  if (!projectId) {
    navigate('/projects');
    return null;
  }

  const project = getProjectById(projectId);
  const testCases = getTestCasesByProjectId(projectId);

  if (!project) {
    navigate('/projects');
    return null;
  }

  const handleAddTestCase = () => {
    setCurrentTestCase(null);
    setIsModalOpen(true);
  };

  const handleEditTestCase = (testCase: TestCase) => {
    setCurrentTestCase(testCase);
    setIsModalOpen(true);
  };

  const handleDeleteTestCase = (testCaseId: string) => {
    setTestCaseToDelete(testCaseId);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteTestCase = () => {
    if (testCaseToDelete) {
      deleteTestCase(testCaseToDelete);
      setIsDeleteModalOpen(false);
      setTestCaseToDelete(null);
    }
  };

  const handleSubmitTestCase = (testCaseData: Omit<TestCase, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    setIsSubmitting(true);

    // Simulate a slight delay for better UX
    setTimeout(() => {
      if (currentTestCase && currentTestCase.id) {
        updateTestCase({
          ...currentTestCase,
          ...testCaseData,
        });
      } else {
        addTestCase(testCaseData);
      }
      
      setIsSubmitting(false);
      setIsModalOpen(false);
      setCurrentTestCase(null);
    }, 300);
  };

  return (
    <Layout>
      <Button
        variant="ghost"
        size="sm"
        className="mb-6"
        onClick={() => navigate('/projects')}
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
      </Button>
      
      <PageHeader
        title={project.name}
        description={project.description}
        actions={
          <Button onClick={handleAddTestCase}>
            <Plus className="w-4 h-4 mr-2" />
            Add Test Case
          </Button>
        }
      />

      <div className="mt-6">
        <TestCaseList
          projectId={projectId}
          testCases={testCases}
          onEditTestCase={handleEditTestCase}
          onDeleteTestCase={handleDeleteTestCase}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentTestCase?.id ? 'Edit Test Case' : 'Add Test Case'}
      >
        <TestCaseForm
          projectId={projectId}
          testCase={currentTestCase || undefined}
          onSubmit={handleSubmitTestCase}
          onCancel={() => setIsModalOpen(false)}
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
            <Button variant="danger" onClick={confirmDeleteTestCase}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default ProjectDetail;