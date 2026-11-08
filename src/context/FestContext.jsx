import React, { createContext, useContext, useState, useEffect } from 'react';
import { FEST_DATA as initialFestData, GOOGLE_FORM_URL as initialGoogleFormUrl } from '../data/festData';
import { EVENTS_DATA as initialEventsData } from '../data/eventsData';
import { SCHEDULE_DATA as initialScheduleData } from '../data/scheduleData';
import { ANNOUNCEMENTS_DATA as initialAnnouncementsData } from '../data/announcementsData';
import { CONTACT_DATA as initialContactData } from '../data/contactData';
import { saveFestConfigToCloud, subscribeFestConfig } from '../services/firebase';

const FestContext = createContext();

const STORAGE_KEY = 'techno_vista_2k26_custom_data';

export function FestProvider({ children }) {
  const [isCloudConnected, setIsCloudConnected] = useState(false);

  // Load saved admin customizations from localStorage, with robust fallback to file defaults
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
        if (parsed.festData) {
          return {
            ...initialFestData,
            ...parsed.festData,
            aboutFest: {
              ...initialFestData.aboutFest,
              ...(parsed.festData.aboutFest || {}),
            },
            aboutCollege: {
              ...initialFestData.aboutCollege,
              ...(parsed.festData.aboutCollege || {}),
            },
            aboutDepartment: {
              ...initialFestData.aboutDepartment,
              ...(parsed.festData.aboutDepartment || {}),
            },
            highlights: parsed.festData.highlights || initialFestData.highlights,
            takeaways: parsed.festData.takeaways || initialFestData.takeaways,
            registrationSteps: parsed.festData.registrationSteps || initialFestData.registrationSteps,
            faqs: parsed.festData.faqs || initialFestData.faqs,
            importantNotes: parsed.festData.importantNotes || initialFestData.importantNotes,
          };
        }
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
        if (parsed.eventsData && Array.isArray(parsed.eventsData)) return parsed.eventsData;
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
        if (parsed.scheduleData) {
          return {
            ...initialScheduleData,
            ...parsed.scheduleData,
            timeline: parsed.scheduleData.timeline || initialScheduleData.timeline,
          };
        }
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
        if (parsed.announcementsData && Array.isArray(parsed.announcementsData)) return parsed.announcementsData;
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
        if (parsed.contactData) {
          return {
            ...initialContactData,
            ...parsed.contactData,
            address: {
              ...initialContactData.address,
              ...(parsed.contactData.address || {}),
            },
            maps: {
              ...initialContactData.maps,
              ...(parsed.contactData.maps || {}),
            },
            generalContact: {
              ...initialContactData.generalContact,
              ...(parsed.contactData.generalContact || {}),
            },
            socialLinks: {
              ...initialContactData.socialLinks,
              ...(parsed.contactData.socialLinks || {}),
            },
            facultyCoordinators: parsed.contactData.facultyCoordinators || initialContactData.facultyCoordinators,
            studentCoordinators: parsed.contactData.studentCoordinators || initialContactData.studentCoordinators,
            travelInfo: parsed.contactData.travelInfo || initialContactData.travelInfo,
          };
        }
      }
    } catch (e) {
      console.error('Error reading localStorage:', e);
    }
    return initialContactData;
  });

  // 1. REAL-TIME CLOUD DATABASE SUBSCRIPTION (Firebase Firestore)
  // Connects every device (phone, laptop, visitor) to live cloud updates
  useEffect(() => {
    const unsubscribe = subscribeFestConfig(
      (cloudData) => {
        if (cloudData) {
          setIsCloudConnected(true);
          if (cloudData.googleFormUrl) setGoogleFormUrl(cloudData.googleFormUrl);
          if (cloudData.festData) setFestData((prev) => ({ ...prev, ...cloudData.festData }));
          if (cloudData.eventsData && Array.isArray(cloudData.eventsData)) setEventsData(cloudData.eventsData);
          if (cloudData.scheduleData) setScheduleData((prev) => ({ ...prev, ...cloudData.scheduleData }));
          if (cloudData.announcementsData && Array.isArray(cloudData.announcementsData)) setAnnouncementsData(cloudData.announcementsData);
          if (cloudData.contactData) setContactData((prev) => ({ ...prev, ...cloudData.contactData }));

          // Cache to localStorage for offline resilience
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData));
          } catch (e) {}
        }
      },
      (err) => {
        if (err === 'NOT_FOUND') {
          // Initialize Cloud Document on first run with default/existing data
          const initialPayload = {
            googleFormUrl,
            festData,
            eventsData,
            scheduleData,
            announcementsData,
            contactData,
            lastUpdated: new Date().toISOString(),
          };
          saveFestConfigToCloud(initialPayload);
          setIsCloudConnected(true);
        } else {
          setIsCloudConnected(false);
        }
      }
    );

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // 2. AUTOMATIC CLOUD SYNC & LOCAL CACHE
  // Whenever any section is edited in /admin, this automatically pushes updates to Firebase
  // so ALL phones, laptops, and attendees immediately see the fresh data
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

      // Instant local cache
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));

      // Debounced cloud push to prevent spamming while typing
      const timeoutId = setTimeout(() => {
        saveFestConfigToCloud(payload);
      }, 500);

      return () => clearTimeout(timeoutId);
    } catch (e) {
      console.error('Error syncing fest updates:', e);
    }
  }, [googleFormUrl, festData, eventsData, scheduleData, announcementsData, contactData]);

  // Helper to re-read and reload latest data from localStorage
  const reloadFromStorage = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.googleFormUrl) setGoogleFormUrl(parsed.googleFormUrl);
        if (parsed.festData) setFestData(parsed.festData);
        if (parsed.eventsData && Array.isArray(parsed.eventsData)) setEventsData(parsed.eventsData);
        if (parsed.scheduleData) setScheduleData(parsed.scheduleData);
        if (parsed.announcementsData && Array.isArray(parsed.announcementsData)) setAnnouncementsData(parsed.announcementsData);
        if (parsed.contactData) setContactData(parsed.contactData);
        return parsed;
      }
    } catch (e) {
      console.error('Error reloading from localStorage:', e);
    }
    return null;
  };

  // Cross-tab and window storage synchronization
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed.googleFormUrl) setGoogleFormUrl(parsed.googleFormUrl);
          if (parsed.festData) setFestData(parsed.festData);
          if (parsed.eventsData && Array.isArray(parsed.eventsData)) setEventsData(parsed.eventsData);
          if (parsed.scheduleData) setScheduleData(parsed.scheduleData);
          if (parsed.announcementsData && Array.isArray(parsed.announcementsData)) setAnnouncementsData(parsed.announcementsData);
          if (parsed.contactData) setContactData(parsed.contactData);
        } catch (err) {
          console.error('Cross-tab storage sync error:', err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Methods to update state from the Admin Panel
  const updateGoogleFormUrl = (newUrl) => {
    setGoogleFormUrl(newUrl);
  };

  const updateFestData = (newData) => {
    setFestData((prev) => ({ ...prev, ...newData }));
  };

  // Event CRUD
  const updateEvent = (eventId, updatedFields) => {
    setEventsData((prev) =>
      prev.map((ev) => (ev.id === eventId ? { ...ev, ...updatedFields } : ev))
    );
  };

  const addEvent = (newEvent) => {
    setEventsData((prev) => [...prev, newEvent]);
  };

  const deleteEvent = (eventId) => {
    setEventsData((prev) => prev.filter((ev) => ev.id !== eventId));
  };

  // Schedule CRUD
  const updateSchedule = (newTimeline) => {
    setScheduleData((prev) => ({ ...prev, timeline: newTimeline }));
  };

  const updateScheduleInfo = (info) => {
    setScheduleData((prev) => ({ ...prev, ...info }));
  };

  const addScheduleSlot = (newSlot) => {
    setScheduleData((prev) => ({
      ...prev,
      timeline: [...prev.timeline, newSlot],
    }));
  };

  const updateScheduleSlot = (slotId, updatedSlot) => {
    setScheduleData((prev) => ({
      ...prev,
      timeline: prev.timeline.map((slot) => (slot.id === slotId ? { ...slot, ...updatedSlot } : slot)),
    }));
  };

  const deleteScheduleSlot = (slotId) => {
    setScheduleData((prev) => ({
      ...prev,
      timeline: prev.timeline.filter((slot) => slot.id !== slotId),
    }));
  };

  // Announcements CRUD
  const addAnnouncement = (newAnnouncement) => {
    setAnnouncementsData((prev) => [newAnnouncement, ...prev]);
  };

  const updateAnnouncement = (id, updatedFields) => {
    setAnnouncementsData((prev) =>
      prev.map((ann) => (ann.id === id ? { ...ann, ...updatedFields } : ann))
    );
  };

  const deleteAnnouncement = (id) => {
    setAnnouncementsData((prev) => prev.filter((a) => a.id !== id));
  };

  // Contact CRUD
  const updateContactData = (newData) => {
    setContactData((prev) => ({ ...prev, ...newData }));
  };

  const addFacultyCoordinator = (coordinator) => {
    setContactData((prev) => ({
      ...prev,
      facultyCoordinators: [...prev.facultyCoordinators, coordinator],
    }));
  };

  const updateFacultyCoordinator = (index, updatedCoordinator) => {
    setContactData((prev) => {
      const updated = [...prev.facultyCoordinators];
      updated[index] = updatedCoordinator;
      return { ...prev, facultyCoordinators: updated };
    });
  };

  const deleteFacultyCoordinator = (index) => {
    setContactData((prev) => ({
      ...prev,
      facultyCoordinators: prev.facultyCoordinators.filter((_, idx) => idx !== index),
    }));
  };

  const addStudentCoordinator = (coordinator) => {
    setContactData((prev) => ({
      ...prev,
      studentCoordinators: [...prev.studentCoordinators, coordinator],
    }));
  };

  const updateStudentCoordinator = (index, updatedCoordinator) => {
    setContactData((prev) => {
      const updated = [...prev.studentCoordinators];
      updated[index] = updatedCoordinator;
      return { ...prev, studentCoordinators: updated };
    });
  };

  const deleteStudentCoordinator = (index) => {
    setContactData((prev) => ({
      ...prev,
      studentCoordinators: prev.studentCoordinators.filter((_, idx) => idx !== index),
    }));
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
        addEvent,
        deleteEvent,
        updateSchedule,
        updateScheduleInfo,
        addScheduleSlot,
        updateScheduleSlot,
        deleteScheduleSlot,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        updateContactData,
        addFacultyCoordinator,
        updateFacultyCoordinator,
        deleteFacultyCoordinator,
        addStudentCoordinator,
        updateStudentCoordinator,
        deleteStudentCoordinator,
        resetToDefaults,
        reloadFromStorage,
        isCloudConnected,
        saveFestConfigToCloud,
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
