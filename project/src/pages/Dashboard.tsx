import React from 'react';
import Layout from '../components/Layout/Layout';
import PageHeader from '../components/Layout/PageHeader';
import DashboardSummary from '../components/Dashboard/DashboardSummary';
import RecentTestCases from '../components/Dashboard/RecentTestCases';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Plus } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { projects } = useAppContext();
  const navigate = useNavigate();

  return (
    <Layout>
      <PageHeader
        title="Dashboard"
        description="Overview of your test cases and projects"
        actions={
          <Button onClick={() => navigate('/projects/new')}>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        }
      />

      <DashboardSummary />

      <div className="mt-6">
        <RecentTestCases />
      </div>
    </Layout>
  );
};

export default Dashboard;