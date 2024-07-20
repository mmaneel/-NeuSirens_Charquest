from backend.model import get_response
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

app = FastAPI()

@app.post("/api/chat")
async def chat_endpoint(request: Request):
    user_message = await request.json()
    message = user_message["message"]
    response = get_response(message)
    return JSONResponse({"response": response})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)




