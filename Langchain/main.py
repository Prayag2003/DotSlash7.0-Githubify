import os
import tempfile
from dotenv import load_dotenv
from langchain import PromptTemplate, LLMChain
from langchain.llms import OpenAI
from langchain_community.llms import OpenAI
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi import APIRouter

load_dotenv()

router = APIRouter()
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")


def get_openai_response(github_url: str):
    try:
        repo_name = github_url.split("/")[-1]

        with tempfile.TemporaryDirectory() as local_path:
            if clone_github_repo(github_url, local_path):
                index, documents, file_type_counts, filenames = load_and_index_files(local_path)
                if index is None:
                    raise HTTPException(status_code=500, detail="No documents were found to index.")

                llm = OpenAI(api_key=OPENAI_API_KEY, temperature=0.2)

                template = """
                Repo: {repo_name} ({github_url}) | Conv: {conversation_history} | Docs: {numbered_documents} | Q: {question} | FileCount: {file_type_counts} | FileNames: {filenames}

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
                    input_variables=["repo_name", "github_url", "conversation_history", "question", "numbered_documents", "file_type_counts", "filenames"]
                )

                llm_chain = LLMChain(prompt=prompt, llm=llm)

                conversation_history = ""
                question_context = QuestionContext(index, documents, llm_chain, model_name, repo_name, github_url, conversation_history, file_type_counts, filenames)

                user_question = "Some default question"  # You can use a default question or handle it differently
                user_question = format_user_question(user_question)

                answer = ask_question(user_question, question_context)
                print(GREEN + '\nANSWER\n' + answer + RESET_COLOR + '\n')
                conversation_history += f"Question: {user_question}\nAnswer: {answer}\n"

                openai_response_data = {"message": answer}
                print(openai_response_data)
                return openai_response_data

            else:
                raise HTTPException(status_code=500, detail="Failed to clone the repository.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving OpenAI response: {str(e)}")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=5173)
