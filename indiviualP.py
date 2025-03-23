import matplotlib.pyplot as plt

# Create a plot
fig, ax = plt.subplots()

# Write the letter "P" in a connected script style using LaTeX
ax.text(0.5, 0.5, r'$\mathscr{k}$', fontsize=100, ha='center', va='center')

# Remove axis
ax.axis('off')

# Save the plot as an image (e.g., in PNG format)
plt.savefig('fancy_k_image.png', bbox_inches='tight', pad_inches=0.1)

# Display the plot
plt.show()