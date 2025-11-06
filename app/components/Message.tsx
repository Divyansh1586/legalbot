import React from 'react';
import type { ChatMessage } from '@/app/types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MessageProps {
  message: ChatMessage;
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} message-enter`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser 
            ? 'bg-blue-500 ml-2' 
            : 'bg-gradient-to-r from-purple-500 to-pink-500 mr-2'
        }`}>
          {isUser ? (
            <span className="text-white font-bold text-sm">U</span>
          ) : (
            <span className="text-white font-bold text-sm">AI</span>
          )}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-blue-500 text-white rounded-br-md'
              : 'bg-white border border-gray-200 text-gray-900 rounded-bl-md'
          } shadow-sm`}>
            <div className={`prose prose-sm max-w-none ${isUser ? '!text-white' : '!text-gray-900'} `}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
          
          {/* Timestamp */}
          <div className={`text-xs text-gray-500 mt-1 px-2 ${
            isUser ? 'text-right' : 'text-left'
          }`}>
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
