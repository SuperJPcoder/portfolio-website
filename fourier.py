import numpy as np
import matplotlib.pyplot as plt
from scipy.fft import fft, ifft
from PIL import Image
import cv2

# Step 1: Load the Image and Convert to Grayscale
img = Image.open('fancy_P_image.png')  # Load the saved image file
gray_img = img.convert('L')  # Convert image to grayscale

# Step 2: Thresholding to Create a Binary Image (Black and White)
threshold = 150
binary_img = np.array(gray_img) < threshold  # Invert colors to make "P" white on black background

# Step 3: Extract Contours (Coordinates of the "P")
contours, _ = cv2.findContours(binary_img.astype(np.uint8), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Take the largest contour (the "P")
contour = contours[0]

# Extract x, y coordinates of the contour
x = contour[:, 0, 0]
y = contour[:, 0, 1]

# Step 4: Invert the P (flip y-coordinates)
y = -y  # Invert to correct the orientation

# Normalize coordinates to fit within the unit circle
x_centered = x - np.mean(x)
y_centered = y - np.mean(y)

# Step 5: Compute Fourier Coefficients
n_points = len(x_centered)
t = np.linspace(0, 2 * np.pi, n_points, endpoint=False)

x_coefficients = fft(x_centered)
y_coefficients = fft(y_centered)

# Step 6: Fourier Series Approximation
def fourier_series(t, coeffs, n_terms=50):
    a0 = coeffs[0].real / len(coeffs)
    result = a0 * np.ones_like(t)
    for n in range(1, n_terms):
        a_n = coeffs[n].real / len(coeffs)
        b_n = coeffs[n].imag / len(coeffs)
        result += 2 * (a_n * np.cos(n * t) - b_n * np.sin(n * t))
    return result

# Use only the first 50 terms
n_terms_used = 50
x_approx = fourier_series(t, x_coefficients, n_terms=n_terms_used)
y_approx = fourier_series(t, y_coefficients, n_terms=n_terms_used)

# Step 7: Plot the Original Contour and Fourier Approximation
plt.figure(figsize=(12, 8))
plt.plot(x_centered, y_centered, label='Original Shape (Contour)', color='blue', linewidth=1)
plt.plot(x_approx, y_approx, label='Fourier Approximation', color='red', linestyle='--', linewidth=2)
plt.xlabel('X')
plt.ylabel('Y')
plt.legend()
plt.title('Fourier Series Approximation of "P" Shape')
plt.grid(True)
plt.axis('equal')
plt.show()

# Step 8: Save Fourier Series Coefficients to a File
filename = "fourier_P.txt"
with open(filename, "w") as file:
    file.write(f"Fourier Series Coefficients (First {n_terms_used} terms):\n\n")
    for n in range(n_terms_used):
        x_mag = np.abs(x_coefficients[n]) / len(x_coefficients)  # Magnitude
        x_phase = np.angle(x_coefficients[n])  # Phase
        y_mag = np.abs(y_coefficients[n]) / len(y_coefficients)
        y_phase = np.angle(y_coefficients[n])

        file.write(f"Term {n+1}:\n")
        file.write(f"  X: Magnitude = {x_mag:.4f}, Phase = {x_phase:.4f}\n")
        file.write(f"  Y: Magnitude = {y_mag:.4f}, Phase = {y_phase:.4f}\n")
        file.write("-" * 30 + "\n")

print(f"Fourier coefficients saved to {filename}")