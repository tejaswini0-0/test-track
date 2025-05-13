import React, { createContext, useContext, useEffect, useState } from 'react';
import { Project, TestCase, ProjectWithStats } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface AppContextType {
  projects: Project[];
  testCases: TestCase[];
  addProject: (name: string, description: string) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  addTestCase: (testCase: Omit<TestCase, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  updateTestCase: (testCase: TestCase) => void;
  deleteTestCase: (id: string) => void;
  getProjectsWithStats: () => ProjectWithStats[];
  getProjectById: (id: string) => Project | undefined;
  getTestCasesByProjectId: (projectId: string) => TestCase[];
}

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [testCases, setTestCases] = useState<TestCase[]>([]);

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedProjects = localStorage.getItem('projects');
    const storedTestCases = localStorage.getItem('testCases');

    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }

    if (storedTestCases) {
      setTestCases(JSON.parse(storedTestCases));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('testCases', JSON.stringify(testCases));
  }, [testCases]);

  const addProject = (name: string, description: string) => {
    const newProject: Project = {
      id: uuidv4(),
      name,
      description,
      createdAt: new Date().toISOString(),
    };

    setProjects((prev) => [...prev, newProject]);
  };

  const updateProject = (project: Project) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === project.id ? project : p))
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    // Also delete all test cases for this project
    setTestCases((prev) => prev.filter((t) => t.projectId !== id));
  };

  const addTestCase = (testCase: Omit<TestCase, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const now = new Date().toISOString();
    
    // Determine status based on expected and actual output
    const status = testCase.expectedOutput === testCase.actualOutput ? 'pass' : 'fail';
    
    const newTestCase: TestCase = {
      id: uuidv4(),
      ...testCase,
      status,
      createdAt: now,
      updatedAt: now,
    };

    setTestCases((prev) => [...prev, newTestCase]);
  };

  const updateTestCase = (testCase: TestCase) => {
    // Update status based on expected and actual output
    const updatedTestCase = {
      ...testCase,
      status: testCase.expectedOutput === testCase.actualOutput ? 'pass' : 'fail',
      updatedAt: new Date().toISOString(),
    };

    setTestCases((prev) =>
      prev.map((t) => (t.id === testCase.id ? updatedTestCase : t))
    );
  };

  const deleteTestCase = (id: string) => {
    setTestCases((prev) => prev.filter((t) => t.id !== id));
  };

  const getProjectsWithStats = (): ProjectWithStats[] => {
    return projects.map((project) => {
      const projectTestCases = testCases.filter((t) => t.projectId === project.id);
      const totalTests = projectTestCases.length;
      const passedTests = projectTestCases.filter((t) => t.status === 'pass').length;
      const failedTests = projectTestCases.filter((t) => t.status === 'fail').length;
      const pendingTests = projectTestCases.filter((t) => t.status === 'pending').length;

      return {
        ...project,
        totalTests,
        passedTests,
        failedTests,
        pendingTests,
      };
    });
  };

  const getProjectById = (id: string): Project | undefined => {
    return projects.find((p) => p.id === id);
  };

  const getTestCasesByProjectId = (projectId: string): TestCase[] => {
    return testCases.filter((t) => t.projectId === projectId);
  };

  return (
    <AppContext.Provider
      value={{
        projects,
        testCases,
        addProject,
        updateProject,
        deleteProject,
        addTestCase,
        updateTestCase,
        deleteTestCase,
        getProjectsWithStats,
        getProjectById,
        getTestCasesByProjectId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};