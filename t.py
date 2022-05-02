import smile as s
from flask import Flask,jsonify,request,make_response
from flask_cors import CORS
import base64
import numpy as np
import cv2
import background
app=Flask(__name__)
CORS(app)

@app.route("/",methods=['GET'])
def helloWorld():
    return jsonify( {"data":"helloworld"})

@app.route('/smile',methods=['GET','POST'])
def smile():
    image=request.get_json()
    face_jpg_original=base64.b64decode(image["image"])
    f_jpg_as_np = np.frombuffer(face_jpg_original, dtype=np.uint8)
    frame = cv2.imdecode(f_jpg_as_np, flags=1)
    print(frame)
    img,flag=s.detection(frame)
    if(flag):
        return jsonify({"data":"smile detected"})
    else:
        return jsonify({"data":"No smile detected"})

@app.route('/passport',methods=['POST'])
def passport():
    try:
        face = request.get_json()
        face_jpg_original = base64.b64decode(face["face"])
        print("check1")

        f_jpg_as_np = np.frombuffer(face_jpg_original, dtype=np.uint8)
        frame = cv2.imdecode(f_jpg_as_np, flags=1)
        print("check2")
        i = background.bg(frame)
        i=cv2.copyMakeBorder(i, 5, 5, 5, 5, cv2.BORDER_CONSTANT, value=[255, 255, 255])
        cv2.imwrite('out.jpg',i)
        specFlag=background.specsDetection(i)
        (flag, encodedImage) = cv2.imencode(".jpg", i)  # Encode Image
        print("check3")

        base64_bytes = base64.b64encode(bytearray(encodedImage))
        print("OKAY")

        # response = make_response(base64_bytes, 200)
        return {"image":str(base64_bytes),"status":specFlag}
    except Exception as e:
        #print("error :",e)
        return {'err': str(e)}

if (__name__=="__main__"):
    app.run(port="5050")