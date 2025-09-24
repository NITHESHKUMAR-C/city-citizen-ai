import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, X, RotateCcw, Check } from 'lucide-react';
import { useCamera } from '@/hooks/useCamera';

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  onClose: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onClose }) => {
  const {
    isOpen,
    capturedImage,
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
    capturePhoto,
    retakePhoto,
  } = useCamera();

  React.useEffect(() => {
    if (isOpen) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, startCamera, stopCamera]);

  const handleCapture = () => {
    const imageData = capturePhoto();
    if (imageData) {
      onCapture(imageData);
    }
  };

  const handleRetake = () => {
    retakePhoto();
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      handleClose();
    }
  };

  if (!isOpen) {
    return (
      <Button onClick={startCamera} variant="hero" size="lg" className="w-full">
        <Camera className="h-5 w-5 mr-2" />
        Take Photo
      </Button>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-4">
        <div className="relative">
          {!capturedImage ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-64 object-cover rounded-lg bg-black"
              />
              <div className="flex justify-center gap-4 mt-4">
                <Button onClick={handleClose} variant="outline" size="lg">
                  <X className="h-5 w-5 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleCapture} variant="hero" size="lg">
                  <Camera className="h-5 w-5 mr-2" />
                  Capture
                </Button>
              </div>
            </>
          ) : (
            <>
              <img
                src={capturedImage}
                alt="Captured"
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="flex justify-center gap-4 mt-4">
                <Button onClick={handleRetake} variant="outline" size="lg">
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Retake
                </Button>
                <Button onClick={handleConfirm} variant="hero" size="lg">
                  <Check className="h-5 w-5 mr-2" />
                  Use Photo
                </Button>
              </div>
            </>
          )}
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </CardContent>
    </Card>
  );
};

export default CameraCapture;