'use client';

/**
 * Swagger UI Component (Client-side)
 * Renders OpenAPI spec using Swagger UI
 */

import { useEffect, useRef } from 'react';

export default function SwaggerUIComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically load Swagger UI (avoid SSR issues)
    if (typeof window !== 'undefined' && containerRef.current) {
      // Simple OpenAPI renderer without external dependencies
      renderOpenAPIDoc();
    }
  }, []);

  const renderOpenAPIDoc = async () => {
    try {
      const response = await fetch('/docs/openapi.json');
      const spec = await response.json();

      if (containerRef.current) {
        containerRef.current.innerHTML = `
          <div class="p-6">
            <div class="mb-6">
              <h2 class="text-2xl font-bold mb-2">${spec.info.title}</h2>
              <p class="text-gray-600">Version: ${spec.info.version}</p>
              <p class="text-gray-600 mt-2">${spec.info.description || ''}</p>
            </div>

            <div class="space-y-4">
              <h3 class="text-xl font-semibold">API Endpoints</h3>
              ${generateEndpointsList(spec)}
            </div>

            <div class="mt-8 p-4 bg-blue-50 rounded-lg">
              <p class="text-sm text-blue-800">
                <strong>Note:</strong> For full interactive documentation, 
                install Swagger UI or use the OpenAPI spec directly at 
                <code class="bg-blue-100 px-2 py-1 rounded">/docs/openapi.json</code>
              </p>
            </div>
          </div>
        `;
      }
    } catch (error) {
      if (containerRef.current) {
        containerRef.current.innerHTML = `
          <div class="p-6 text-red-600">
            Error loading OpenAPI specification: ${error}
          </div>
        `;
      }
    }
  };

  return <div ref={containerRef} className="min-h-screen" />;
}

function generateEndpointsList(spec: any): string {
  if (!spec.paths) return '<p>No endpoints found</p>';

  let html = '<div class="space-y-2">';

  Object.entries(spec.paths).forEach(([path, methods]: [string, any]) => {
    Object.entries(methods).forEach(([method, details]: [string, any]) => {
      const methodColor = {
        get: 'bg-blue-100 text-blue-800',
        post: 'bg-green-100 text-green-800',
        put: 'bg-yellow-100 text-yellow-800',
        delete: 'bg-red-100 text-red-800',
        patch: 'bg-purple-100 text-purple-800',
      }[method.toLowerCase()] || 'bg-gray-100 text-gray-800';

      html += `
        <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div class="flex items-center gap-3 mb-2">
            <span class="px-3 py-1 rounded text-sm font-semibold ${methodColor}">
              ${method.toUpperCase()}
            </span>
            <code class="text-sm font-mono text-gray-700">${path}</code>
          </div>
          ${details.summary ? `<p class="text-sm text-gray-600 ml-20">${details.summary}</p>` : ''}
          ${details.tags ? `<div class="ml-20 mt-2 flex gap-2">${details.tags.map((tag: string) => `<span class="text-xs bg-gray-100 px-2 py-1 rounded">${tag}</span>`).join('')}</div>` : ''}
        </div>
      `;
    });
  });

  html += '</div>';
  return html;
}
