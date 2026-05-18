import numpy as np
from PIL import Image
import io
from typing import Tuple

class WatermarkService:
    """Service for detecting digital watermarks in images"""
    
    @staticmethod
    def detect_watermark(image_bytes: bytes) -> dict:
        """
        Detect watermarks using multiple techniques:
        - FFT (Fourier Transform) analysis
        - Color distribution analysis
        - Edge detection
        """
        try:
            image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
            image_array = np.array(image)
            
            # FFT Analysis
            fft_score = WatermarkService._fft_analysis(image_array)
            
            # Color Distribution Analysis
            color_score = WatermarkService._color_analysis(image_array)
            
            # Edge Detection
            edge_score = WatermarkService._edge_analysis(image_array)
            
            # Calculate average confidence
            avg_confidence = (fft_score + color_score + edge_score) / 3
            
            return {
                "detected": avg_confidence > 0.5,
                "confidence": round(avg_confidence, 2),
                "fft_score": round(fft_score, 2),
                "color_score": round(color_score, 2),
                "edge_score": round(edge_score, 2),
                "details": {
                    "image_dimensions": image.size,
                    "image_mode": image.mode,
                    "analysis_methods": ["FFT", "Color Distribution", "Edge Detection"]
                }
            }
        except Exception as e:
            return {
                "detected": False,
                "confidence": 0.0,
                "error": str(e)
            }
    
    @staticmethod
    def _fft_analysis(image_array: np.ndarray) -> float:
        """Analyze frequency domain for watermark patterns"""
        gray = np.mean(image_array, axis=2)
        fft = np.fft.fft2(gray)
        magnitude = np.abs(fft)
        
        # Check for anomalous frequency patterns
        high_freq = np.sum(magnitude[magnitude > np.percentile(magnitude, 95)])
        total_energy = np.sum(magnitude)
        
        return min(high_freq / total_energy, 1.0)
    
    @staticmethod
    def _color_analysis(image_array: np.ndarray) -> float:
        """Analyze color patterns that might indicate watermarks"""
        r, g, b = image_array[:,:,0], image_array[:,:,1], image_array[:,:,2]
        
        # Check color consistency (lower = more anomalies = likely watermark)
        r_std = np.std(r) / 255
        g_std = np.std(g) / 255
        b_std = np.std(b) / 255
        
        avg_std = (r_std + g_std + b_std) / 3
        return min(avg_std, 1.0)
    
    @staticmethod
    def _edge_analysis(image_array: np.ndarray) -> float:
        """Detect edge patterns typical of watermarks"""
        gray = np.mean(image_array, axis=2)
        
        # Sobel edge detection approximation
        gx = np.gradient(gray, axis=0)
        gy = np.gradient(gray, axis=1)
        edges = np.sqrt(gx**2 + gy**2)
        
        edge_percentage = np.sum(edges > 10) / edges.size
        return min(edge_percentage * 2, 1.0)
