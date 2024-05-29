import brotli
import zlib
import base64

def convert_woff_to_woff2(input_file, output_file):
    # Read the WOFF file content
    with open(input_file, 'rb') as f:
        woff_data = f.read()
    
    # Decode the WOFF data (remove WOFF header)
    woff_data_decoded = base64.b64decode(woff_data[44:])
    
    # Compress the decoded WOFF data using zlib
    compressed_data = zlib.compress(woff_data_decoded)
    
    # Compress the zlib-compressed data using Brotli
    woff2_data = brotli.compress(compressed_data)
    
    # Write the WOFF2 data to the output file
    with open(output_file, 'wb') as f:
        f.write(woff2_data)

if __name__ == "__main__":
    # Specify the input and output file paths
    input_file = 'arcade3.woff'  # Change this to the path of your input WOFF file
    output_file = 'arcade3.woff2'  # Change this to the desired output WOFF2 file path
    
    # Call the conversion function
    convert_woff_to_woff2(input_file, output_file)
