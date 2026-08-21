import os
from PIL import Image

def remove_white_background(input_path, output_path, tolerance=25):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    # Get corner pixel color
    bg_sample = img.getpixel((0, 0))
    print(f"Sample background at (0,0): {bg_sample}")
    
    newData = []
    for item in datas:
        # Check if pixel is white or near-white / light background
        # item is (r, g, b, a)
        r, g, b, a = item[:4]
        if r > 230 and g > 230 and b > 230:
            newData.append((255, 255, 255, 0)) # Fully transparent
        elif abs(r - bg_sample[0]) < tolerance and abs(g - bg_sample[1]) < tolerance and abs(b - bg_sample[2]) < tolerance:
            newData.append((r, g, b, 0)) # Fully transparent
        else:
            newData.append((r, g, b, 255))
            
    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Successfully saved transparent sprite to {output_path}")

if __name__ == "__main__":
    src = "public/assets/sprites/sigma_boss.jpg"
    dst = "public/assets/sprites/sigma_boss.png"
    if os.path.exists(src):
        remove_white_background(src, dst)
    else:
        print(f"Source {src} not found")
