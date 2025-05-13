export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface TestCase {
  id: string;
  projectId: string;
  name: string;
  description: string;
  expectedOutput: string;
  actualOutput: string;
  status: 'pass' | 'fail' | 'pending';
  createdAt: string;
  updatedAt: string;
}

export type ProjectWithStats = Project & {
  totalTests: number;
  passedTests: number;
  failedTests: number;
  pendingTests: number;
};