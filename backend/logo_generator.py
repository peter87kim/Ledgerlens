from typing import List, Protocol
import random, os, io

class TextToImageModel(Protocol):
    def generate_images(self, prompt: str, num_images: int, seed: int = None) -> List[bytes]:
        ...

def build_prompt(industry: str, vibe: str, style: str = "flat minimalist") -> str:
    return f"{style} logo for {industry} with a {vibe} vibe"

def choose_seed(seed: int = None) -> int:
    return seed if seed is not None else random.randint(0, 2**32 - 1)

def save_images(image_bytes_list: List[bytes], output_dir: str) -> List[str]:
    os.makedirs(output_dir, exist_ok=True)
    file_paths = []
    for idx, img_bytes in enumerate(image_bytes_list):
        path = os.path.join(output_dir, f"logo_{idx+1}.png")
        with open(path, "wb") as f:
            f.write(img_bytes)
        file_paths.append(path)
    return file_paths

def generate_logo(
    industry: str,
    vibe: str,
    model: TextToImageModel,
    num_variants: int = 3,
    seed: int = None,
    output_dir: str = "outputs"
) -> List[str]:
    prompt = build_prompt(industry, vibe)
    seed = choose_seed(seed)
    images = model.generate_images(prompt, num_variants, seed)
    return save_images(images, output_dir)

