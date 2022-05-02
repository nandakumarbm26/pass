import { useRef, useEffect } from "react";
import Blink from "blink-detection";
export default function App() {
  const videoRef = useRef(null);

  const init = async () => {
    // let blinkIndicator = document.getElementById('blink-indicator');
    const predict = async () => {
      let result = await Blink.getBlinkPrediction();
      // updateModelStatus();

      if (result) {
        console.log("BLINK");
        if (result.longBlink) {
          console.log("LONG BLINK");
        }
      }
      raf = requestAnimationFrame(predict);
    };
    predict();
  };
  var raf;

  useEffect(async () => {
    await Blink.loadModel();

    await Blink.setUpCamera(videoRef.current);
  }, []);
  const onLoadHandler = async () => {
    let result = await Blink.getBlinkPredictions();
    console.log(result);
  };
  return (
    <div>
      <video ref={videoRef} onPlay={init} autoPlay />
    </div>
  );
}
