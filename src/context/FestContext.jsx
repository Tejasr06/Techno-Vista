import React, { createContext, useContext, useState, useEffect } from 'react';
import { FEST_DATA as initialFestData, GOOGLE_FORM_URL as initialGoogleFormUrl } from '../data/festData';
import { EVENTS_DATA as initialEventsData } from '../data/eventsData';
import { SCHEDULE_DATA as initialScheduleData } from '../data/scheduleData';
import { ANNOUNCEMENTS_DATA as initialAnnouncementsData } from '../data/announcementsData';
import { CONTACT_DATA as initialContactData } from '../data/contactData';

const FestContext = createContext();

const STORAGE_KEY = 'techno_vista_2k26_custom_data';

export function FestProvider({ children }) {
  // Load saved admin customizations from localStorage, with fallback to file defaults
  const [googleFormUrl, setGoogleFormUrl] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.googleFormUrl) return parsed.googleFormUrl;
      }
    } catch (e) {
      console.error('Error reading localStorage:', e);
    }
    return initialGoogleFormUrl;
  });

  const [festData, setFestData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.festData) return parsed.festData;
      }
    } catch (e) {
      console.error('Error reading localStorage:', e);
    }
    return initialFestData;
  });

  const [eventsData, setEventsData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.eventsData) return parsed.eventsData;
      }
    } catch (e) {
      console.error('Error reading localStorage:', e);
    }
    return initialEventsData;
  });

  const [scheduleData, setScheduleData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.scheduleData) return parsed.scheduleData;
      }
    } catch (e) {
      console.error('Error reading localStorage:', e);
    }
    return initialScheduleData;
  });

  const [announcementsData, setAnnouncementsData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.announcementsData) return parsed.announcementsData;
      }
    } catch (e) {
      console.error('Error reading localStorage:', e);
    }
    return initialAnnouncementsData;
  });

  const [contactData, setContactData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.contactData) return parsed.contactData;
      }
    } catch (e) {
      console.error('Error reading localStorage:', e);
    }
    return initialContactData;
  });

  // Automatically sync updates to localStorage
  useEffect(() => {
    try {
      const payload = {
        googleFormUrl,
        festData,
        eventsData,
        scheduleData,
        announcementsData,
        contactData,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error('Error persisting to localStorage:', e);
    }
  }, [googleFormUrl, festData, eventsData, scheduleData, announcementsData, contactData]);

  // Methods to update state from the Admin Panel
  const updateGoogleFormUrl = (newUrl) => {
    setGoogleFormUrl(newUrl);
  };

  const updateFestData = (newData) => {
    setFestData((prev) => ({ ...prev, ...newData }));
  };

  const updateEvent = (eventId, updatedFields) => {
    setEventsData((prev) =>
      prev.map((ev) => (ev.id === eventId ? { ...ev, ...updatedFields } : ev))
    );
  };

  const updateSchedule = (newTimeline) => {
    setScheduleData((prev) => ({ ...prev, timeline: newTimeline }));
  };

  const addAnnouncement = (newAnnouncement) => {
    setAnnouncementsData((prev) => [newAnnouncement, ...prev]);
  };

  const deleteAnnouncement = (id) => {
    setAnnouncementsData((prev) => prev.filter((a) => a.id !== id));
  };

  const updateContactData = (newData) => {
    setContactData((prev) => ({ ...prev, ...newData }));
  };

  const resetToDefaults = () => {
    setGoogleFormUrl(initialGoogleFormUrl);
    setFestData(initialFestData);
    setEventsData(initialEventsData);
    setScheduleData(initialScheduleData);
    setAnnouncementsData(initialAnnouncementsData);
    setContactData(initialContactData);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getEventById = (id) => {
    return eventsData.find((e) => e.id === id);
  };

  return (
    <FestContext.Provider
      value={{
        googleFormUrl,
        festData,
        eventsData,
        scheduleData,
        announcementsData,
        contactData,
        updateGoogleFormUrl,
        updateFestData,
        updateEvent,
        updateSchedule,
        addAnnouncement,
        deleteAnnouncement,
        updateContactData,
        resetToDefaults,
        getEventById,
      }}
    >
      {children}
    </FestContext.Provider>
  );
}

export function useFest() {
  const context = useContext(FestContext);
  if (!context) {
    throw new Error('useFest must be used within a FestProvider');
  }
  return context;
}
