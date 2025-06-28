/**
 * Current Date and Time (UTC): 2025-06-27 18:35:15
 * Current User's Login: sayanm085
 */

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useZxing } from "react-zxing";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertCircle,
  Camera,
  RefreshCw,
  SwitchCamera,
  Zap,
  ZapOff,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const BarcodeScanner = ({ 
  onCodeScanned, 
  onClose, 
  autoStart = true,
  className
}) => {
  const videoRef = useRef(null);
  
  // Camera and scanner state
  const [cameraStatus, setCameraStatus] = useState("initializing"); // initializing, ready, denied, unavailable
  const [isScanning, setIsScanning] = useState(autoStart);
  const [code, setCode] = useState(null);
  const [error, setError] = useState(null);
  
  // Camera device management
  const [availableCameras, setAvailableCameras] = useState([]);
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [torchEnabled, setTorchEnabled] = useState(false);
  
  // To prevent multiple scans of the same barcode
  const [hasScanned, setHasScanned] = useState(false);
  const lastScannedCode = useRef(null);
  const toastIdRef = useRef(null);

  // Initialize and detect available cameras
  useEffect(() => {
    const initializeCamera = async () => {
      // Reset state for clean initialization
      setError(null);
      setCameraStatus("initializing");
      
      try {
        // Check if mediaDevices API is available
        if (!navigator.mediaDevices?.getUserMedia || !navigator.mediaDevices?.enumerateDevices) {
          setCameraStatus("unavailable");
          setError("Camera API not available on this device or browser");
          return;
        }
        
        // Get initial camera access to trigger permission prompt
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        
        // Get all video input devices
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        
        // Clean up initial stream
        stream.getTracks().forEach(track => track.stop());
        
        if (videoDevices.length === 0) {
          setCameraStatus("unavailable");
          setError("No camera detected on this device");
          return;
        }
        
        // Store available cameras
        setAvailableCameras(videoDevices);
        
        // Try to find and select back camera
        const backCameraIndex = videoDevices.findIndex(device => 
          device.label.toLowerCase().includes('back') || 
          device.label.toLowerCase().includes('rear') ||
          device.label.toLowerCase().includes('environment')
        );
        
        if (backCameraIndex >= 0) {
          setCurrentCameraIndex(backCameraIndex);
          setIsFrontCamera(false);
        } else {
          // Default to first camera if no back camera is explicitly found
          setCurrentCameraIndex(0);
          setIsFrontCamera(true);
        }
        
        setCameraStatus("ready");
      } catch (error) {
        console.error("Camera initialization error:", error);
        
        // Handle different error types
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
          setCameraStatus("denied");
          setError("Camera permission was denied. Please allow camera access in your browser settings.");
        } else {
          setCameraStatus("unavailable");
          setError(`Camera error: ${error.message}`);
        }
      }
    };
    
    initializeCamera();
    
    // Cleanup function
    return () => {
      // Stop any active video streams when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
      
      // Dismiss any active toast when unmounting
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
      }
    };
  }, []);

  // Clear hasScanned state when restarting the scan
  useEffect(() => {
    if (isScanning) {
      setHasScanned(false);
      lastScannedCode.current = null;
    }
  }, [isScanning]);

  // Set up ZXing barcode scanner with proper constraints
  const { ref: zxingRef } = useZxing(
    (cameraStatus === "ready" && isScanning && !hasScanned) ? {
      constraints: {
        video: {
          // Use deviceId if available, otherwise use facingMode
          ...(availableCameras.length > 0 && availableCameras[currentCameraIndex]?.deviceId
            ? { deviceId: { exact: availableCameras[currentCameraIndex].deviceId } }
            : { facingMode: isFrontCamera ? "user" : "environment" }
          ),
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 15 }
        }
      },
      timeBetweenDecodingAttempts: 200,
      onDecodeResult(result) {
        const scannedValue = result.getText();
        
        // Check if this is the same code as the last one scanned
        if (lastScannedCode.current === scannedValue) {
          // Skip if we've already scanned this code
          return;
        }
        
        // Set the code and mark as scanned
        setCode(scannedValue);
        setHasScanned(true); // This will stop the scanner immediately
        lastScannedCode.current = scannedValue;
        
        // Provide haptic feedback if available
        if (navigator.vibrate) {
          navigator.vibrate(100);
        }
        
        // If callback provided, call it
        if (onCodeScanned) {
          onCodeScanned(scannedValue);
        }
        
        // Show success toast - display only once
        if (toastIdRef.current) {
          toast.dismiss(toastIdRef.current);
        }
        
        // Store the toast ID so we can dismiss it if needed
        toastIdRef.current = toast.success(`Barcode scanned: ${scannedValue}`);
      },
      onError(error) {
        // Don't set errors for normal "not found" errors during scanning
        if (error.name !== "NotFoundException") {
          console.warn("Scanner error:", error);
          setError(`Scanning error: ${error.message}`);
        }
      }
    } : undefined,
    videoRef
  );

  // Combine refs for video element
  const setVideoRef = (element) => {
    videoRef.current = element;
    zxingRef.current = element;
  };

  // Reset scanner
  const handleReset = useCallback(() => {
    setCode(null);
    setError(null);
    setHasScanned(false);
    lastScannedCode.current = null;
    setIsScanning(true);
    
    // Clear any existing toast
    if (toastIdRef.current) {
      toast.dismiss(toastIdRef.current);
      toastIdRef.current = null;
    }
  }, []);

  // Request permission manually if initially denied
  const requestCameraPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStatus("ready");
      setError(null);
      setIsScanning(autoStart);
    } catch (error) {
      setCameraStatus("denied");
      setError("Camera permission was denied. Please check your browser settings.");
    }
  };

  // Switch between available cameras
  const switchCamera = useCallback(() => {
    if (availableCameras.length <= 1) return;
    
    // Stop current video stream
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    
    // Reset torch state when switching cameras
    setTorchEnabled(false);
    
    // Update camera index
    const nextIndex = (currentCameraIndex + 1) % availableCameras.length;
    setCurrentCameraIndex(nextIndex);
    
    // Update front/back camera state based on label
    const newCamera = availableCameras[nextIndex];
    const isNewCameraFront = !(
      newCamera.label.toLowerCase().includes('back') || 
      newCamera.label.toLowerCase().includes('rear') ||
      newCamera.label.toLowerCase().includes('environment')
    );
    setIsFrontCamera(isNewCameraFront);
    
    // Reset scan state
    setHasScanned(false);
    lastScannedCode.current = null;
    
    // Brief delay to allow previous stream to stop
    setTimeout(() => {
      setIsScanning(true);
    }, 100);
  }, [availableCameras, currentCameraIndex]);

  // Toggle flashlight
  const toggleTorch = useCallback(async () => {
    if (!videoRef.current || !videoRef.current.srcObject) return;
    
    try {
      const track = videoRef.current.srcObject.getVideoTracks()[0];
      if (!track) return;
      
      // Check if torch is supported
      const capabilities = track.getCapabilities();
      if (!capabilities.torch) {
        toast.error("Your device or browser doesn't support flashlight control");
        return;
      }
      
      const newTorchState = !torchEnabled;
      await track.applyConstraints({ advanced: [{ torch: newTorchState }] });
      setTorchEnabled(newTorchState);
      
      // Don't show toast for torch toggle to avoid more toasts
    } catch (error) {
      console.error("Torch control error:", error);
    }
  }, [torchEnabled]);

  return (
    <div className={cn("flex flex-col items-center w-full", className)}>
      {/* Camera Preview */}
      <div className="relative rounded-xl overflow-hidden border bg-black/10 w-full aspect-[4/3] mb-4">
        {/* Video Element */}
        <video
          ref={setVideoRef}
          className="h-full w-full object-cover"
          playsInline
          muted
          autoPlay
        />
        
        {/* Scanning Animation Overlay */}
        {isScanning && !hasScanned && cameraStatus === "ready" && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="relative h-full w-full">
              {/* Scanning line animation */}
              <div className="absolute left-0 right-0 h-0.5 bg-primary/70 animate-[scanner_2s_ease-in-out_infinite]"></div>
              
              {/* Corner markers for scan area */}
              <div className="absolute inset-[15%] pointer-events-none">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/70"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/70"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/70"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/70"></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Status Badge Overlay */}
        <div className="absolute top-2 left-2">
          {cameraStatus === "ready" && isScanning && !hasScanned && (
            <Badge 
              variant="secondary" 
              className="bg-green-100 text-green-800 border-green-200 animate-pulse"
            >
              Scanning...
            </Badge>
          )}
          
          {cameraStatus === "ready" && hasScanned && code && (
            <Badge 
              variant="secondary" 
              className="bg-blue-100 text-blue-800 border-blue-200"
            >
              <Check className="h-3 w-3 mr-1" />
              Captured
            </Badge>
          )}
          
          {cameraStatus === "initializing" && (
            <Badge 
              variant="secondary" 
              className="bg-yellow-100 text-yellow-800 border-yellow-200"
            >
              <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
              Initializing...
            </Badge>
          )}
          
          {(cameraStatus === "denied" || cameraStatus === "unavailable") && (
            <Badge 
              variant="secondary" 
              className="bg-red-100 text-red-800 border-red-200"
            >
              <AlertCircle className="h-3 w-3 mr-1" />
              {cameraStatus === "denied" ? "Access Denied" : "Camera Unavailable"}
            </Badge>
          )}
        </div>
        
        {/* Camera Controls */}
        {cameraStatus === "ready" && !hasScanned && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {/* Camera Switch Button - only show if multiple cameras available */}
            {availableCameras.length > 1 && (
              <Button 
                size="sm" 
                variant="secondary" 
                onClick={switchCamera} 
                className="rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white"
              >
                <SwitchCamera className="h-4 w-4 mr-1" />
                Switch
              </Button>
            )}
            
            {/* Torch Toggle Button */}
            <Button 
              size="sm" 
              variant={torchEnabled ? "default" : "secondary"}
              onClick={toggleTorch} 
              className={cn(
                "rounded-full backdrop-blur-sm text-white",
                torchEnabled 
                  ? "bg-yellow-500/80 hover:bg-yellow-600/80" 
                  : "bg-black/30 hover:bg-black/50"
              )}
            >
              {torchEnabled ? (
                <>
                  <Zap className="h-4 w-4 mr-1" />
                  On
                </>
              ) : (
                <>
                  <ZapOff className="h-4 w-4 mr-1" />
                  Off
                </>
              )}
            </Button>
          </div>
        )}
        
        {/* Camera Unavailable Overlay */}
        {(cameraStatus === "denied" || cameraStatus === "unavailable") && (
          <div className="absolute inset-0 bg-black/5 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center">
            <AlertCircle className="h-10 w-10 text-red-500 mb-2" />
            <h3 className="text-lg font-semibold mb-1">Camera Not Available</h3>
            <p className="text-sm text-gray-600 mb-4 max-w-xs">{error}</p>
            
            {cameraStatus === "denied" ? (
              <Button onClick={requestCameraPermission}>
                Grant Camera Access
              </Button>
            ) : (
              <Button variant="outline" onClick={() => window.location.reload()}>
                <RefreshCw className="h-4 w-4 mr-1" />
                Retry
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Scanned Result */}
      {code && hasScanned && (
        <Card className="w-full mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              Scanned Barcode
              <Badge variant="outline" className="ml-2 font-normal">
                {new Date().toLocaleTimeString()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-3 bg-muted rounded-md">
              <p className="font-mono text-center text-lg break-all select-all">{code}</p>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleReset}
            >
              Scan Again
            </Button>
            <Button 
              variant="default" 
              className="flex-1"
              onClick={() => onCodeScanned && onCodeScanned(code)}
            >
              Use This Code
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Prompt when ready */}
      {!code && cameraStatus === "ready" && isScanning && !hasScanned && (
        <p className="text-center text-sm text-muted-foreground mb-4">
          Position barcode within the frame to scan
        </p>
      )}

      {/* Error display */}
      {error && cameraStatus === "ready" && (
        <div className="bg-red-50 text-red-800 p-2 rounded-md text-sm mb-4">
          {error}
        </div>
      )}

      {/* Control buttons */}
      <div className="flex gap-2 w-full">
        {!isScanning && !code && cameraStatus === "ready" && (
          <Button 
            className="flex-1" 
            onClick={handleReset}
          >
            <Camera className="mr-2 h-4 w-4" />
            Start Scanning
          </Button>
        )}
        
        {(hasScanned || code) && (
          <Button 
            variant="default" 
            className="flex-1"
            onClick={handleReset}
          >
            <Camera className="mr-2 h-4 w-4" />
            Scan Another Code
          </Button>
        )}
        
        {onClose && (
          <Button 
            variant="outline" 
            className={(hasScanned || code) ? "flex-1" : "w-full"}
            onClick={onClose}
          >
            Close Scanner
          </Button>
        )}
      </div>
    </div>
  );
};

export default BarcodeScanner;