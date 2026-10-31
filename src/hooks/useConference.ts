import { useState, useEffect } from 'react';
import { ConferenceConfig, getConferenceInfo } from '../data/content';

/**
 * Custom hook providing reactive access to current Conference schedule & deadline settings.
 * Automatically synchronizes when admin updates dates or deadline in the dashboard.
 */
export const useConference = (): ConferenceConfig => {
  const [conference, setConference] = useState<ConferenceConfig>(getConferenceInfo);

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<ConferenceConfig>;
      if (customEvent.detail) {
        setConference(customEvent.detail);
      } else {
        setConference(getConferenceInfo());
      }
    };

    window.addEventListener('rtoc_conference_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('rtoc_conference_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return conference;
};
