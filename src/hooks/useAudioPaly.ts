import { useEffect, useRef, useState } from "react";
import { Audio, AVPlaybackStatus, AVPlaybackStatusSuccess } from "expo-av";

export default function useAudioPlay() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const lastRecording = useRef<Audio.Sound | null>(null);

  const playAudio = async (recordingUri: string) => {
    const sound = new Audio.Sound();
    await sound.loadAsync({ uri: recordingUri });
    await sound.replayAsync();
    setIsPlaying(true);
    sound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
      const playbackStatusSuccess = status as AVPlaybackStatusSuccess;
      if (playbackStatusSuccess.didJustFinish) {
        setIsPlaying(false);
      }
    });
    lastRecording.current = sound;
  };

  const stopAudio = async () => {
    if (lastRecording.current) {
      await lastRecording.current.stopAsync();
    }
  };

  const getStatus = async () => {
    if (lastRecording.current) {
      const status = await lastRecording.current.getStatusAsync();
      return status;
    }
    return null;
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return {
    isPlaying,
    playAudio,
    stopAudio,
    getStatus
  };
};
