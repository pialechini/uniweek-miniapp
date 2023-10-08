import * as types from "@/types/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function decodeObject<T>(encoded: string): T {
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const string = String.fromCharCode(...new Uint16Array(bytes.buffer));
  return JSON.parse(string);
}

function useDeserializedCourseSchedule() {
  const [searchParams] = useSearchParams();
  const [schedule, setSchedule] = useState<types.CourseSchedule[] | null>(null);

  useEffect(() => {
    if (searchParams.has("schedule")) {
      const encoded = atob(searchParams.get("schedule")!);

      try {
        setSchedule(decodeObject(encoded));
      } catch (error) {
        console.error(`Error while decoding schedule search param`);
      }
    }
  }, [searchParams]);

  return schedule;
}

export default useDeserializedCourseSchedule;
