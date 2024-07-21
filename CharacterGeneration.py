import os
import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai

# Setting the OpenAI key
OPENAI_API_KEY = ""
os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY 

# Initializing the client
openai.api_key = os.getenv("OPENAI_API_KEY")
# Creating the fastapi instance
app = FastAPI()

class ImageRequest(BaseModel):
    prompt: str
    image_dimension: str = "1024x1024"
    image_quality: str = "hd"
    model: str = "dall-e-3"
    nb_final_image: int = 1

# Endpoint to generate image
@app.post("/generate-image")
async def generate_image(request: ImageRequest):
    try:
        response = openai.images.generate(
            model=request.model,
            prompt=request.prompt,
            size=request.image_dimension,
            quality=request.image_quality,
            n=request.nb_final_image,
        )
        image_url = response.data[0].url
        return {"image_url": image_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/display-image")
async def display_image(url: str):
    try:
        return {"image_url": url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))