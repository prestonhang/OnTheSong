#######################################################
# Flask Backend
# Used to initiate partner's microservice
# Returns new file contents
# Operates on XHTTPS fetch
#######################################################

from flask import Flask, request, jsonify
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)


######################################
# callMicroservice()
# Opens filepath and initiates request
# returns path to file
######################################
def callMicroservice():
    filepath = "C:/Users/Preston/.vscode/OnTheSong/CS361Assignment8/returned_song.txt"
    fileWrite = open(filepath, "w")
    fileWrite.write("run")
    fileWrite.close()

    return filepath


@app.route("/", methods=["GET", "POST"])
def home():
    filepath = callMicroservice()
    time.sleep(4)

    # Return data from microservice file
    file = open(filepath, "r")
    return file.read()

if __name__ == '__main__':
    app.run()