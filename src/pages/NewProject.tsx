import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
import ProjectForm from '../components/Project/ProjectForm';
import { useAppContext } from '../context/AppContext';

const NewProject: React.FC = () => {
  const { addProject } = useAppContext();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddProject = (name: string, description: string) => {
    setIsSubmitting(true);
    
    // Simulate a slight delay for better UX
    setTimeout(() => {
      const projects = addProject(name, description);
      setIsSubmitting(false);
      navigate('/projects');
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
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
        <p className="mt-1 text-sm text-gray-600">
          Create a new project to organize and track your test cases.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <ProjectForm
            onSubmit={handleAddProject}
            onCancel={() => navigate('/projects')}
            isSubmitting={isSubmitting}
          />
        </CardContent>
      </Card>
    </Layout>
  );
};

export default NewProject;