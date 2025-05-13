import React from 'react';
import { Link } from 'react-router-dom';
import { Folder, ChevronRight } from 'lucide-react';
import Card, { CardContent } from '../ui/Card';
import { ProjectWithStats } from '../../types';

interface ProjectCardProps {
  project: ProjectWithStats;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { id, name, description, totalTests, passedTests, failedTests } = project;

  // Calculate pass percentage
  const passPercentage = totalTests > 0 ? (passedTests / totalTests) * 100 : 0;

  return (
    <Link to={`/projects/${id}`}>
      <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-blue-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 mr-3 rounded-full bg-blue-100">
                <Folder className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{name}</h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{description}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Test progress</span>
              <span className="text-sm font-medium text-gray-700">
                {passedTests}/{totalTests} passed
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ease-in-out ${
                  passPercentage === 100 
                    ? 'bg-emerald-500' 
                    : passPercentage >= 60 
                      ? 'bg-blue-500' 
                      : 'bg-amber-500'
                }`}
                style={{ width: `${passPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-4 text-sm">
              <div>
                <span className="inline-block px-2 py-1 text-xs font-medium text-emerald-800 bg-emerald-100 rounded">
                  {passedTests} passed
                </span>
              </div>
              <div>
                <span className="inline-block px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded">
                  {failedTests} failed
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProjectCard;