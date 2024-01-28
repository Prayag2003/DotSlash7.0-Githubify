from fastapi import FastAPI, HTTPException
from starlette.middleware.cors import CORSMiddleware
from langchain import PromptTemplate, LLMChain
from file_processing import clone_github_repo, load_and_index_files
from questions import ask_question
from utils import format_user_question
from questions import ask_question, QuestionContext
from config import WHITE, GREEN, RESET_COLOR, model_name
import os
import tempfile
from dotenv import load_dotenv
from fastapi.responses import RedirectResponse
from fastapi.responses import JSONResponse
from langchain.llms import OpenAI
from langchain_community.llms import OpenAI

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

app = FastAPI()

# Enable CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    # allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*", "Access-Control-Allow-Origin"],
)

g_github_url = None  # Global variable to store github_url
g_repo_name = None   # Global variable to store repo_name

@app.post('/process_repository')
async def process_repository(data: dict):
    global g_github_url, g_repo_name
    
    github_url = data.get('github_url')
    g_github_url = github_url
    repo_name = github_url.split("/")[-1]
    g_repo_name = repo_name
    
    with tempfile.TemporaryDirectory() as local_path:
        if clone_github_repo(github_url, local_path):
            index, documents, file_type_counts, filenames = load_and_index_files(local_path)
            if index is None:
                raise HTTPException(status_code=400, detail="No documents found to index.")

    frontend_url = "http://localhost:5173/explore"
    return RedirectResponse(frontend_url, status_code=202)

@app.post('/ask_question')
def ask_question_endpoint(data:JSONResponse):
    print("data: ", data)
    global g_github_url, g_repo_name
    
    if g_github_url is None:
        raise HTTPException(status_code=400, detail="GitHub URL is not available. Call /process_repository first.")
    
    with tempfile.TemporaryDirectory() as local_path:
        if clone_github_repo(g_github_url, local_path):
            index, documents, file_type_counts, filenames = load_and_index_files(local_path)
            if index is None:
                raise HTTPException(status_code=400, detail="No documents found to index.")
    
    user_input = data.get('user_input')
    print("user_input: ", user_input)
    
    llm = OpenAI(api_key=OPENAI_API_KEY, temperature=0.2)

    template = """
    Repo: {repo_name} ({repo_name}) | Conv: {conversation_history} | Docs: {numbered_documents} | Q: {user_input} | FileCount: {file_type_counts} | FileNames: {filenames}

    Instr:
    1. Answer based on context/docs.
    2. Focus on repo/code.
    3. Consider:
        a. Purpose/features - describe.
        b. Functions/code - provide details/samples.
        c. Setup/usage - give instructions.
    4. Unsure? Say "I am not sure".
    Answer:
    """

    prompt = PromptTemplate(
        template=template,
        input_variables=["g_repo_name", "g_github_url", "conversation_history", "user_input", "numbered_documents", "file_type_counts", "filenames"]
    )
    print("prompt: ", prompt)   

    llm_chain = LLMChain(prompt=prompt, llm=llm)

    conversation_history = ""
    question_context = QuestionContext(index, documents, llm_chain, model_name, g_repo_name, g_github_url, conversation_history, file_type_counts, filenames)
    print("question_context: ", question_context)
    print("\n\nThinking...")

    
    user_input = format_user_question(user_input)
    print("user_input: ", user_input)
    
    print("\n\nAfter format Thinking...")

    answer = ask_question(user_input, question_context)
    print("Answer: ", answer)
    return JSONResponse(content={"answer": answer}, status_code=200)

if __name__ == '__main__':
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)