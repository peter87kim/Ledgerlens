import json
import os
from logo_generator import generate_logo
from diffusers import StableDiffusionPipeline
import torch
import io

# Initialize your model once, outside the handler
pipe = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float16
)
pipe = pipe.to("cuda" if torch.cuda.is_available() else "cpu")

def handler(request, response):
    # 1. Parse inputs
    payload = request.json()
    industry = payload.get("industry", "")
    vibe     = payload.get("vibe", "")

    # 2. Generate logos
    # Wrap the HF adapter inline:
    def hf_generate(prompt, n, seed):
        gen = torch.Generator(device=pipe.device).manual_seed(seed or 0)
        imgs = []
        for _ in range(n):
            out = pipe(prompt, num_inference_steps=30, guidance_scale=7.5, generator=gen)
            buf = io.BytesIO()
            out.images[0].save(buf, format="PNG")
            imgs.append(buf.getvalue())
        return imgs

    # Call your abstract pipeline
    paths = generate_logo(
        industry=industry,
        vibe=vibe,
        model=type("X", (), {"generate_images": hf_generate}),
        num_variants=3,
        seed=42,
        output_dir="/tmp/outputs"
    )

    # 3. Map file paths to served URLs
    # (Vercel will serve /tmp/outputs under the same domain)
    host = os.environ.get("VERCEL_URL") or request.headers.get("host")
    protocol = "https" if request.headers.get("x-forwarded-proto") == "https" else "http"
    urls = [f"{protocol}://{host}/api/outputs/{os.path.basename(p)}" for p in paths]

    # 4. Return JSON
    response.status_code = 200
    response.set_header("Content-Type", "application/json")
    response.write(json.dumps({"images": urls}))
