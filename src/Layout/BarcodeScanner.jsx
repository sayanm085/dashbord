import React, { useEffect, useRef, useState, useCallback } from "react";
import { useZxing } from "react-zxing";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CameraIcon, RefreshCw, SwitchCamera } from "lucide-react";

/* ------------------------------------------------------------
   Enhanced helper: test camera and identify available devices
------------------------------------------------------------ */
const initializeCamera = async () => {
  if (!navigator.mediaDevices?.getUserMedia || !navigator.mediaDevices?.enumerateDevices) {
    return { available: false, devices: [] };
  }
  
  try {
    // Request initial access to trigger permission prompt
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    
    // Get all video devices
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === 'videoinput');
    
    // Clean up initial stream
    stream.getTracks().forEach(track => track.stop());
    
    return { 
      available: true, 
      devices: videoDevices,
      // Find back camera by looking for environment or back/rear in label
      backCamera: videoDevices.find(device => 
        device.label.toLowerCase().includes('back') || 
        device.label.toLowerCase().includes('rear') ||
        device.label.toLowerCase().includes('environment')
      )
    };
  } catch (error) {
    console.error("Camera initialization error:", error);
    return { available: false, devices: [], error };
  }
};

export default function BarcodeScanner() {
  const videoRef = useRef(null);

  // Camera state
  const [status, setStatus] = useState("idle");
  const [code, setCode] = useState(null);
  const [error, setError] = useState("");
  const [availableCameras, setAvailableCameras] = useState([]);
  const [activeCamera, setActiveCamera] = useState(null);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);
  
  // State for tracking if we need to reinitialize camera
  const [shouldRestart, setShouldRestart] = useState(false);

  /* ------------------------------------------------------------
     1) Setup camera and permissions
  ------------------------------------------------------------ */
  useEffect(() => {
    const setup = async () => {
      const result = await initializeCamera();
      
      if (!result.available) {
        setStatus("unavailable");
        setError(result.error ? 
          `Camera error: ${result.error.message}` : 
          "No camera detected or the browser blocked access (HTTPS required)."
        );
        return;
      }
      
      setAvailableCameras(result.devices);
      
      // Set default camera to back camera if available, otherwise first camera
      if (result.backCamera) {
        setActiveCamera(result.backCamera.deviceId);
        setIsFrontCamera(false);
      } else if (result.devices.length > 0) {
        setActiveCamera(result.devices[0].deviceId);
        setIsFrontCamera(true);
      }
      
      try {
        // We've already gotten permission in initializeCamera, so just set status
        setStatus("granted");
      } catch (err) {
        setStatus("idle");
        console.error("Camera setup error:", err);
      }
    };
    
    setup();
  }, [shouldRestart]);

  /* ------------------------------------------------------------
     2) Configure react-zxing with proper camera constraints
  ------------------------------------------------------------ */
  const { ref: zxingRef } = useZxing(
    status === "granted"
      ? {
          constraints: activeCamera
            ? { 
                video: { 
                  deviceId: { exact: activeCamera },
                  // Optional width/height for better performance on mobile
                  width: { ideal: 1280 },
                  height: { ideal: 720 }
                } 
              }
            : { 
                video: { 
                  facingMode: isFrontCamera ? "user" : "environment",
                  width: { ideal: 1280 },
                  height: { ideal: 720 }
                } 
              },
          timeBetweenDecodingAttempts: 150,
          onDecodeResult(result) {
            setCode(result.getText());
            // Vibrate device if supported (helps on mobile)
            if (navigator.vibrate) {
              navigator.vibrate(100);
            }
          },
          onError(error) {
            console.warn("Scanner error:", error);
          }
        }
      : undefined,
    videoRef
  );

  /* ------------------------------------------------------------
     3) Helper functions for camera controls
  ------------------------------------------------------------ */
  const reset = useCallback(() => {
    setCode(null);
  }, []);

  const requestManualPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setStatus("granted");
      setError("");
      // Force restart to reload camera list after permission
      setShouldRestart(prev => !prev);
    } catch (e) {
      setStatus("denied");
      setError("Camera permission was denied. Check browser settings.");
    }
  };
  
  // Switch between front and back cameras
  const switchCamera = useCallback(async () => {
    // If we have a list of cameras, find one that's not current
    if (availableCameras.length > 1) {
      const currentIndex = availableCameras.findIndex(c => c.deviceId === activeCamera);
      const nextIndex = (currentIndex + 1) % availableCameras.length;
      setActiveCamera(availableCameras[nextIndex].deviceId);
      setIsFrontCamera(prevState => !prevState);
    } else {
      // Just toggle the facing mode if we don't have device IDs
      setIsFrontCamera(prevState => !prevState);
      setActiveCamera(null); // Clear device ID to use facingMode
    }
  }, [availableCameras, activeCamera, isFrontCamera]);
  
  // Toggle flashlight if available
  const toggleFlashlight = useCallback(async () => {
    if (!videoRef.current?.srcObject) return;
    
    try {
      const track = videoRef.current.srcObject.getVideoTracks()[0];
      if (!track) return;
      
      // Check if torch is supported
      const capabilities = track.getCapabilities();
      if (!capabilities.torch) {
        setError("Flashlight not supported on this device");
        return;
      }
      
      await track.applyConstraints({
        advanced: [{ torch: !isFlashlightOn }]
      });
      
      setIsFlashlightOn(!isFlashlightOn);
    } catch (err) {
      console.error("Flashlight error:", err);
      setError("Could not toggle flashlight");
    }
  }, [isFlashlightOn]);

  /* ------------------------------------------------------------
     4) Combine refs for video element
  ------------------------------------------------------------ */
  const setVideoRef = (element) => {
    videoRef.current = element;
    zxingRef.current = element;
  };

  /* ------------------------------------------------------------
     5) Render
  ------------------------------------------------------------ */
  return (
    <section className="flex flex-col items-center gap-6">
      {/* Live preview */}
      <div className="rounded-xl overflow-hidden border bg-black/10 relative">
        <video
          ref={setVideoRef}
          className="h-72 w-96 object-cover"
          playsInline
          muted
          autoPlay
        />
        
        {/* Camera controls overlay */}
        {status === "granted" && !code && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3">
            {/* Camera switch button */}
            <Button 
              onClick={switchCamera}
              variant="secondary" 
              size="sm"
              className="rounded-full bg-black/30 backdrop-blur-sm"
            >
              <SwitchCamera className="h-4 w-4 mr-1" />
              Switch
            </Button>
            
            {/* Flashlight button */}
            <Button 
              onClick={toggleFlashlight}
              variant={isFlashlightOn ? "default" : "secondary"}
              size="sm"
              className="rounded-full bg-black/30 backdrop-blur-sm"
            >
              <CameraIcon className="h-4 w-4 mr-1" />
              {isFlashlightOn ? "Flash On" : "Flash Off"}
            </Button>
          </div>
        )}
        
        {/* Scanning animation overlay */}
        {status === "granted" && !code && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="h-1 w-full bg-primary/50 animate-[scan_1.5s_ease-in-out_infinite]"></div>
          </div>
        )}
      </div>

      {/* Status messages */}
      {status === "idle" && (
        <Button onClick={requestManualPermission}>
          Grant camera access
        </Button>
      )}

      {(status === "denied" || status === "unavailable") && (
        <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm max-w-[350px] text-center">
          {error}
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2" 
            onClick={() => setShouldRestart(prev => !prev)}
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Try again
          </Button>
        </div>
      )}

      {status === "granted" && !code && (
        <p className="text-gray-500 text-sm">
          Point the camera at a barcode&hellip;
        </p>
      )}

      {/* Scanned code result */}
      {code && (
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-lg">Scanned&nbsp;Barcode</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <span className="text-center text-2xl font-semibold tracking-wide break-all">
              {code}
            </span>
            <Button onClick={reset} className="self-center">
              Scan another
            </Button>
          </CardContent>
        </Card>
      )}
      
      {/* Display error message if any */}
      {error && status !== "denied" && status !== "unavailable" && (
        <p className="text-red-500 text-xs">{error}</p>
      )}
    </section>
  );
}