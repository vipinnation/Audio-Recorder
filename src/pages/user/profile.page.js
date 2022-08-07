import {
  VoiceRecorder,
  VoiceRecorderPlugin,
  RecordingData,
  GenericResponse,
  CurrentRecordingStatus,
} from "capacitor-voice-recorder";

import React, { useEffect, useState } from "react";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import axois from "axios";
import { API_URL } from "../../assets/config";
import getHeaders from "../../assets/scripts/getHeaders";
import { toastError } from "../../assets/scripts/toastMessage.js";
import AudioListComponent from "../../components/recording/audio-list.component";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import indexed_db from "../../assets/scripts/indexed_db";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [savedAudio, setSavedAudio] = useState([]);
  let [audioTimer, setAudioTimer] = useState(0);
  let navigate = useNavigate();
  useEffect(() => {
    VoiceRecorder.canDeviceVoiceRecord().then((result) =>
      console.log(result.value)
    );
    VoiceRecorder.requestAudioRecordingPermission().then((result) =>
      console.log(result.value)
    );
    loadFiles();
    loadUser();
    console.log("Check Network", navigator.onLine);
  }, []);

  const startRecording = () => {
    console.log("Start Recorded", isRecording);
    setIsRecording(true);

    VoiceRecorder.startRecording()
      .then((result) => {
        console.log(result.value);
        recordingTimer();
      })
      .catch((error) => console.log(error));
  };

  const stopRecording = () => {
    console.log("Stop Recording", isRecording);
    VoiceRecorder.stopRecording()
      .then((result) => {
        let audio_obj = { ...result.value };
        audio_obj.name = Date.now() + "_" + getCookie("username") + ".wav";
        setSavedAudio((prev) => [...prev, audio_obj]);
        navigator.onLine
          ? saveRecordingToDatabase(audio_obj)
          : indexed_db(audio_obj);
      })
      .catch((error) => console.log(error));
    setIsRecording(false);
  };

  const recordingTimer = () => {
    if (isRecording == false) {
      return;
    }
    setAudioTimer(audioTimer++);
    setTimeout(() => {
      recordingTimer();
    }, 1000);
  };

  const loadFiles = async function () {
    try {
      let res = await axois.get(`${API_URL}/audio`, { headers: getHeaders() });
      let data = res.data.audio;
      setSavedAudio(res.data.audio);
    } catch (error) {
      console.log(error);
    }
  };

  const loadFromIndexDB = async () => {
    let request = indexedDB.open("audio-manager", 1);
    let db;
    let data;
    request.onsuccess = async (event) => {
      db = event.target.result;
      let transaction = await db.transaction("audio", "readwrite");
      let audio = await transaction.objectStore("audio");
      let audioFiles = await audio.getAll();
      console.log("Data", await audioFiles);
    };

    request.onerror = async (error) => {
      console.log("Load Files", error);
    };
  };

  const loadUser = async () => {
    try {
      let res = await axois.get(`${API_URL}/profile`, {
        headers: getHeaders(),
      });
      setCookie("username", res.data.user.username);
    } catch (error) {
      console.log(error);
    }
  };

  const saveRecordingToDatabase = async (audioClip) => {
    try {
      let res = await axois.post(`${API_URL}/audio`, audioClip, {
        headers: getHeaders(),
      });
      await loadFiles();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = (e) => {

    if( navigator.onLine == false){
      toastError("Please connect to internet")
      return
    }
    deleteCookie("auth-token");
    deleteCookie("role");
    deleteCookie("username");
    navigate("/login");
  };
  return (
    <div>
      <div className="py-3 text-center">
        <h2 className="text-center font-semibold text-2xl">
          Welcome {getCookie("username")}
        </h2>
        <div>
          <button
            type="button"
            className="px-4 py-2 rounded-lg font-semibold text-center bg-green-400 hover:bg-green-500 hover:text-white"
          >
            Sync
          </button>
          <button
            type="button"
            onClick={(e) => {
              logout();
            }}
            className="px-4 py-2 mx-2 rounded-lg font-semibold text-center bg-red-400 hover:bg-red-500 hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 w-1/2 mx-auto py-4 my-4 select-none">
        <div>
          <div>
            {isRecording ? (
              <FaPauseCircle
                size={200}
                onClick={(e) => {
                  stopRecording();
                }}
                className="hover:outline-600"
              />
            ) : (
              <FaPlayCircle
                size={200}
                onClick={(e) => {
                  startRecording();
                }}
              />
            )}
          </div>
          <div className="w-1/2 mx-auto py-3">
            <span>{audioTimer} sec</span>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Recorded Audio</h3>
          <div>
            {savedAudio &&
              savedAudio.map((audioClip) => (
                <AudioListComponent audioClip={audioClip} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
