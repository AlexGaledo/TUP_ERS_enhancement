from google import genai
from google.genai import types
from dotenv import load_dotenv
import os

load_dotenv()

class chatConfig():
    def __init__(self):
        self.client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        self.chat = self.client.chats.create(model="gemini-2.5-flash",
                                             config=types.GenerateContentConfig(
                                                 system_instruction="you are a helpful assistant"
                                             ))
        


def generate_response(message):
    chat_service = chatConfig()
    response = chat_service.chat.send_message(message)
    return response.text