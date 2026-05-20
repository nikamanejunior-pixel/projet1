import React from 'react';

interface AnalysisResultProps {
  data: any;
  onReset: () => void;
}

export default function AnalysisResult({ data, onReset }: AnalysisResultProps) {
  const getAuthenticityColor = (indicator: string) => {
    switch (indicator) {
      case 'verified':
        return 'text-green-400';
      case 'questionable':
        return 'text-yellow-400';
      case 'untrusted':
        return 'text-red-400';
      default:
        return 'text-slate-400';
    }
  };

  const getAuthenticityIcon = (indicator: string) => {
    switch (indicator) {
      case 'verified':
        return '✅';
      case 'questionable':
        return '⚠️';
      case 'untrusted':
        return '❌';
      default:
        return '❓';
    }
  };

  return (
    <div className="space-y-6">
      {/* File Info */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">📋 File Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-slate-400 text-sm">Filename</p>
            <p className="text-white font-semibold truncate">{data.filename}</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">File Size</p>
            <p className="text-white font-semibold">
              {(data.file_size / 1024).toFixed(2)} KB
            </p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">MIME Type</p>
            <p className="text-white font-semibold">{data.mime_type}</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">Analyzed</p>
            <p className="text-white font-semibold">
              {new Date(data.analysis_timestamp).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>

      {/* Confidence Score */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6">⭐ Confidence Score</h2>
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <div className="relative w-48 h-48 mx-auto">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-slate-600"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={`${data.confidence_score * 2.83} 283`}
                  className={
                    data.confidence_score >= 80
                      ? 'text-green-500'
                      : data.confidence_score >= 50
                      ? 'text-yellow-500'
                      : 'text-red-500'
                  }
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-5xl font-bold text-white">
                  {data.confidence_score}
                </p>
                <p className="text-sm text-slate-400">/ 100</p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className={`text-center p-4 rounded-lg bg-slate-900`}>
              <p className="text-sm text-slate-400 mb-2">Authenticity</p>
              <p className={`text-3xl font-bold ${getAuthenticityColor(data.authenticity_indicator)}`}>
                {getAuthenticityIcon(data.authenticity_indicator)} {data.authenticity_indicator.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detection Results */}
      <div className="grid grid-cols-2 gap-4">
        {/* Watermark */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">💧 Watermark</h3>
          <div className="space-y-3">
            <div>
              <p className="text-slate-400 text-sm">Detected</p>
              <p className="text-white font-semibold">
                {data.watermark_detected ? '✅ Yes' : '❌ No'}
              </p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Confidence</p>
              <p className="text-white font-semibold">
                {(data.watermark_confidence * 100).toFixed(0)}%
              </p>
            </div>
            {data.watermark_details.image_dimensions && (
              <div>
                <p className="text-slate-400 text-sm">Image Size</p>
                <p className="text-white font-semibold">
                  {data.watermark_details.image_dimensions[0]}x{data.watermark_details.image_dimensions[1]}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* C2PA */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">📜 C2PA</h3>
          <div className="space-y-3">
            <div>
              <p className="text-slate-400 text-sm">Manifest Detected</p>
              <p className="text-white font-semibold">
                {data.c2pa_detected ? '✅ Yes' : '❌ No'}
              </p>
            </div>
            {data.c2pa_manifest && (
              <>
                <div>
                  <p className="text-slate-400 text-sm">Status</p>
                  <p className="text-white font-semibold">{data.c2pa_manifest.status}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">📊 Score Breakdown</h3>
        <div className="space-y-3">
          {Object.entries(data.score_breakdown).map(([key, value]: [string, any]) => (
            <div key={key} className="flex justify-between items-center">
              <p className="text-slate-400">{key.replace(/_/g, ' ').toUpperCase()}</p>
              <p className="text-white font-semibold">{value} pts</p>
            </div>
          ))}
        </div>
      </div>

      {/* Warnings */}
      {data.warnings.length > 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-6">
          <h3 className="text-lg font-bold text-yellow-300 mb-4">⚠️ Warnings</h3>
          <ul className="space-y-2">
            {data.warnings.map((warning: string, idx: number) => (
              <li key={idx} className="text-yellow-200">• {warning}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        🔄 Analyze Another File
      </button>
    </div>
  );
}
