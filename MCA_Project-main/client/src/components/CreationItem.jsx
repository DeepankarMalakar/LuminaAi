import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const typeColors = {
  'article': 'from-[#7C3AED] to-[#3B82F6]',
  'blog-title': 'from-[#06B6D4] to-[#3B82F6]',
  'image': 'from-[#8B5CF6] to-[#EC4899]',
  'background-removal': 'from-[#EC4899] to-[#F59E0B]',
  'object-removal': 'from-[#F59E0B] to-[#10B981]',
  'resume-review': 'from-[#10B981] to-[#06B6D4]',
};

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  const gradientClass = typeColors[item.type] || 'from-[#7C3AED] to-[#3B82F6]';

  return (
    <div
      className="glass rounded-[var(--radius-md)] border border-border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:glow-border-primary cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-text-primary font-medium mb-1">{item.prompt}</h2>
          <div className="flex items-center gap-3">
            {/* Type Badge */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${gradientClass}`}
            >
              {item.type}
            </span>
            <span className="text-text-secondary text-sm">
              {new Date(item.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-text-secondary ml-4" />
        ) : (
          <ChevronDown className="w-5 h-5 text-text-secondary ml-4" />
        )}
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div
          className="mt-4 pt-4 border-t border-border overflow-hidden transition-all duration-300"
          style={{
            maxHeight: expanded ? '1000px' : '0',
          }}
        >
          {item.type === 'image' ? (
            <div>
              <img src={item.content} alt="Generated image" className="mt-3 w-full max-w-md rounded-lg" />
            </div>
          ) : (
            <div className="mt-3 h-full overflow-y-scroll text-sm text-text-secondary">
              <div className="reset-tw">
                <ReactMarkdown>{item.content}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;
