import os

folder_path = 'images'
output_file = './card_data.js'

cards = [f for f in os.listdir(folder_path) if f.endswith('.png')]

with open(output_file, 'w') as f:
    f.write('const cardImages = [\n')
    for card in cards:
        f.write(f' {{name:"{card}", src: "{folder_path}/{card}" }},\n')
    f.write('];\n')
print(f"Card data saved to {output_file}")