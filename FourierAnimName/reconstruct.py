import numpy as np
import matplotlib.pyplot as plt

filename = "fourier_P.txt"
x_coefficients = []
y_coefficients = []

with open(filename, "r") as file:
    lines = [line.strip() for line in file.readlines() if line.strip()]

try:
    for i in range(2, len(lines), 4):
        if "X: Magnitude" in lines[i] and "Y: Magnitude" in lines[i + 1]:
            x_mag = float(lines[i].split('=')[1].split(',')[0].strip())
            x_phase = float(lines[i].split('=')[2].strip())
            y_mag = float(lines[i + 1].split('=')[1].split(',')[0].strip())
            y_phase = float(lines[i + 1].split('=')[2].strip())

            x_coeff = x_mag * np.exp(1j * x_phase)
            y_coeff = y_mag * np.exp(1j * y_phase)

            x_coefficients.append(x_coeff)
            y_coefficients.append(y_coeff)
except (IndexError, ValueError) as e:
    print("Error reading file:", e)
    exit(1)

x_coefficients = np.array(x_coefficients)
y_coefficients = np.array(y_coefficients)

def reconstruct_shape(t, coeffs):
    n_terms = len(coeffs)
    result = np.zeros_like(t, dtype=np.complex128)
    for n in range(n_terms):
        result += coeffs[n] * np.exp(1j * n * t)
    return result.real

n_points = 500
t = np.linspace(0, 2 * np.pi, n_points, endpoint=False)
x_reconstructed = reconstruct_shape(t, x_coefficients)
y_reconstructed = reconstruct_shape(t, y_coefficients)

# No mirroring, revert to original
x_reconstructed = x_reconstructed
y_reconstructed = y_reconstructed

plt.figure(figsize=(12, 8))
plt.plot(x_reconstructed, y_reconstructed, label="Reconstructed Shape (Original Shape)", color='blue', linewidth=2)
plt.xlabel("X")
plt.ylabel("Y")
plt.legend()
plt.title("Reconstructed Shape from Fourier Coefficients (Original Shape)")
plt.grid(True)
plt.axis("equal")
plt.show()
