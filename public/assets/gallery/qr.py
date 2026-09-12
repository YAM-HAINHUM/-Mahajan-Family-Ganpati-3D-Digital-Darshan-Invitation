import qrcode
from PIL import Image

# ============================================================
# GOOGLE MAPS LOCATION QR CODE GENERATOR
# ============================================================

# Google Maps logo file
logo_path = "maps.png"

# Get Maps link from user
maps_link = input("Enter Google Maps location link: ").strip()

if not maps_link:
    print("Please enter a valid Google Maps link.")
    exit()

# ------------------------------------------------------------
# Create QR Code
# ------------------------------------------------------------

qr = qrcode.QRCode(
    version=None,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=12,
    border=4
)

qr.add_data(maps_link)
qr.make(fit=True)

qr_image = qr.make_image(
    fill_color="black",
    back_color="white"
).convert("RGBA")

# ------------------------------------------------------------
# Load Google Maps Logo
# ------------------------------------------------------------

logo = Image.open(logo_path).convert("RGBA")

# ------------------------------------------------------------
# Remove white background from logo
# ------------------------------------------------------------

pixels = logo.load()

for y in range(logo.height):
    for x in range(logo.width):
        r, g, b, a = pixels[x, y]

        # Make white/near-white pixels transparent
        if r > 240 and g > 240 and b > 240:
            pixels[x, y] = (255, 255, 255, 0)

# ------------------------------------------------------------
# Resize logo
# ------------------------------------------------------------

logo_size = int(qr_image.width * 0.22)

logo.thumbnail(
    (logo_size, logo_size),
    Image.Resampling.LANCZOS
)

# ------------------------------------------------------------
# Create white background behind logo
# ------------------------------------------------------------

background_size = int(logo_size * 1.20)

logo_background = Image.new(
    "RGBA",
    (background_size, background_size),
    "white"
)

# Center logo on white background
logo_x = (background_size - logo.width) // 2
logo_y = (background_size - logo.height) // 2

logo_background.alpha_composite(
    logo,
    (logo_x, logo_y)
)

# ------------------------------------------------------------
# Place logo in center of QR
# ------------------------------------------------------------

center_x = (qr_image.width - background_size) // 2
center_y = (qr_image.height - background_size) // 2

qr_image.alpha_composite(
    logo_background,
    (center_x, center_y)
)

# ------------------------------------------------------------
# Save PNG
# ------------------------------------------------------------

output_file = "google_maps_location_qr.png"

qr_image.convert("RGB").save(
    output_file,
    "PNG"
)

print("\n======================================")
print("QR CODE GENERATED SUCCESSFULLY!")
print("======================================")
print(f"Maps Link : {maps_link}")
print(f"Output    : {output_file}")
print("======================================")