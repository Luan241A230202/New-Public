/**
 * Swagger UI Viewer Page
 * View OpenAPI documentation interactively
 */

import { Metadata } from 'next';
import SwaggerUIComponent from './SwaggerUI';

export const metadata: Metadata = {
  title: 'API Documentation - Swagger UI',
  description: 'Interactive API documentation using Swagger UI',
};

export default function SwaggerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            API Documentation
          </h1>
          <p className="text-gray-600">
            Interactive documentation for VideoShare Platform APIs
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <SwaggerUIComponent />
        </div>
      </div>
    </div>
  );
}
