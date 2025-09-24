import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Play, Trash2, Check } from 'lucide-react';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';

interface VoiceRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onRecordingComplete }) => {
  const {
    isRecording,
    audioBlob,
    audioURL,
    duration,
    startRecording,
    stopRecording,
    clearRecording,
    formatDuration,
  } = useVoiceRecorder();

  const handleConfirm = () => {
    if (audioBlob) {
      onRecordingComplete(audioBlob);
      clearRecording();
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="text-center space-y-4">
          {!audioBlob ? (
            <>
              <div className="flex items-center justify-center space-x-4">
                {isRecording ? (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-destructive rounded-full animate-pulse"></div>
                      <span className="text-lg font-mono">{formatDuration(duration)}</span>
                    </div>
                    <Button onClick={stopRecording} variant="destructive" size="lg">
                      <MicOff className="h-5 w-5 mr-2" />
                      Stop Recording
                    </Button>
                  </div>
                ) : (
                  <Button onClick={startRecording} variant="hero" size="lg">
                    <Mic className="h-5 w-5 mr-2" />
                    Start Recording
                  </Button>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {isRecording 
                  ? "Recording your voice message..." 
                  : "Tap to start recording your voice message"
                }
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="text-lg font-semibold">Recording Complete</span>
                <span className="text-muted-foreground">({formatDuration(duration)})</span>
              </div>
              
              {audioURL && (
                <div className="flex justify-center mb-4">
                  <audio controls src={audioURL} className="w-full max-w-xs" />
                </div>
              )}
              
              <div className="flex justify-center gap-4">
                <Button onClick={clearRecording} variant="outline" size="lg">
                  <Trash2 className="h-5 w-5 mr-2" />
                  Delete
                </Button>
                <Button onClick={handleConfirm} variant="hero" size="lg">
                  <Check className="h-5 w-5 mr-2" />
                  Use Recording
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceRecorder;