#!/bin/bash
# Generate 10 random single color images using ImageMagick

# SIZE=512x512 # Size of the image
SIZE=1024x1024

# Check if ImageMagick is installed
if ! [ -x "$(command -v convert)" ]; then
    echo 'Error: ImageMagick is not installed.' >&2
    echo 'Install it using: sudo apt install imagemagick' >&2
    exit 1
fi

for i in {0..9}; do
    convert -size $SIZE xc:"rgb($((RANDOM%256)),$((RANDOM%256)),$((RANDOM%256)))" $i.jpg
done
