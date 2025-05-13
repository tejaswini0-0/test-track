import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import PageHeader from '../components/Layout/PageHeader';
import Button from '../components/ui/Button';
import ProjectCard from '../components/Project/ProjectCard';
import Modal from '../components/ui/Modal';
import ProjectForm from '../components/Project/ProjectForm';
import { useAppContext } from '../context/AppContext';
import EmptyState from '../components/ui/EmptyState';

const ProjectList: React.FC = () => {
  const { getProjectsWithStats, addProject } = useAppContext();
  const projectsWithStats = getProjectsWithStats();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddProject = (name: string, description: string) => {
    setIsSubmitting(true);
    
    // Simulate a slight delay for better UX
    setTimeout(() => {
      addProject(name, description);
      setIsSubmitting(false);
      setIsModalOpen(false);
    }, 300);
  };

  return (
    <Layout>
      <PageHeader
        title="Projects"
        description="Manage your test case projects"
        actions={
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        }
      />

      {projectsWithStats.length > 0 ? (
        <div className="grid gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
          {projectsWithStats.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No projects yet"
          description="Create your first project to start tracking test cases."
          action={
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          }
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Project"
      >
        <ProjectForm
          onSubmit={handleAddProject}
          onCancel={() => setIsModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </Modal>
    </Layout>
  );
};

export default ProjectList;