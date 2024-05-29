import random
import string

# Define character sets with more abstract and cool glitched glyphs
glyphs = "⌬≡⊖⦿⌬⧉▒★⧉✧･ﾟ:✧･ﾟ⟁⟐⟑⦻⦼⦽⧬⧭"
ascii_chars = string.printable
glitch_chars = "⩫⩥⩤⩢⩣⚝░▒▓█⧸⧹⧺⧻◜◝◞◟"

# Function to encrypt the text with glyphs, ascii and glitch characters
def encrypt_text(text):
    encrypted = ""
    for char in text:
        if char.isalpha():
            # Replace alphabetic characters with glyphs or ASCII characters
            if random.random() < 0.3:
                encrypted += random.choice(glyphs)
            else:
                encrypted += random.choice(ascii_chars)
        else:
            # Replace non-alphabetic characters with glitch characters
            encrypted += random.choice(glitch_chars)
    
    # Add additional glitch effects
    encrypted = add_glitch_effects(encrypted)
    
    return encrypted

# Function to add additional glitch effects to the text
def add_glitch_effects(text):
    glitched = ""
    for char in text:
        if random.random() < 0.1:
            glitched += random.choice(glitch_chars)
        glitched += char
    return glitched

# Example usage
original_text = "name: 'John', age: 30, phone: '123-456-7890', mail: 'Qo4nD@example.com', onchain: true."
encrypted_text = encrypt_text(original_text)
print("Original text:", original_text)
print("Encrypted text:", encrypted_text)
