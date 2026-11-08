import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
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

  const isSelfUpdatingRef = useRef(false);
  const latestStateRef = useRef({
    googleFormUrl,
    festData,
    eventsData,
    scheduleData,
    announcementsData,
    contactData,
  });

  // Keep latestStateRef in sync with state changes
  useEffect(() => {
    latestStateRef.current = {
      googleFormUrl,
      festData,
      eventsData,
      scheduleData,
      announcementsData,
      contactData,
    };
  }, [googleFormUrl, festData, eventsData, scheduleData, announcementsData, contactData]);

  // 1. REAL-TIME CLOUD DATABASE SUBSCRIPTION (Firebase Firestore)
  // Connects every device (phone, laptop, visitor) to live cloud updates
  useEffect(() => {
    const unsubscribe = subscribeFestConfig(
      (cloudData) => {
        // Skip snapshot if we just initiated a local save, preventing editor wipes
        if (isSelfUpdatingRef.current) return;

        if (cloudData) {
          setIsCloudConnected(true);
          latestStateRef.current = {
            ...latestStateRef.current,
            ...cloudData,
          };
          if (cloudData.googleFormUrl) setGoogleFormUrl(cloudData.googleFormUrl);
          if (cloudData.festData) setFestData(cloudData.festData);
          if (cloudData.eventsData && Array.isArray(cloudData.eventsData)) setEventsData(cloudData.eventsData);
          if (cloudData.scheduleData) setScheduleData(cloudData.scheduleData);
          if (cloudData.announcementsData && Array.isArray(cloudData.announcementsData)) setAnnouncementsData(cloudData.announcementsData);
          if (cloudData.contactData) setContactData(cloudData.contactData);

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

  // Helper to commit state changes to localStorage and Firestore without feedback loops
  const commitUpdates = (partialPayload = {}) => {
    isSelfUpdatingRef.current = true;
    setTimeout(() => {
      isSelfUpdatingRef.current = false;
    }, 2000);

    latestStateRef.current = {
      ...latestStateRef.current,
      ...partialPayload,
    };

    const fullPayload = {
      ...latestStateRef.current,
      lastUpdated: new Date().toISOString(),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fullPayload));
      saveFestConfigToCloud(fullPayload);
    } catch (e) {
      console.error('Error committing updates to cloud:', e);
    }
  };

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
      if (isSelfUpdatingRef.current) return;
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
    commitUpdates({ googleFormUrl: newUrl });
  };

  const updateFestData = (newData) => {
    const updated = { ...festData, ...newData };
    setFestData(updated);
    commitUpdates({ festData: updated });
  };

  // Event CRUD
  const updateEvent = (eventId, updatedFields) => {
    const updatedList = eventsData.map((ev) =>
      ev.id === eventId ? { ...ev, ...updatedFields } : ev
    );
    setEventsData(updatedList);
    commitUpdates({ eventsData: updatedList });
  };

  const addEvent = (newEvent) => {
    const updatedList = [...eventsData, newEvent];
    setEventsData(updatedList);
    commitUpdates({ eventsData: updatedList });
  };

  const deleteEvent = (eventId) => {
    const updatedList = eventsData.filter((ev) => ev.id !== eventId);
    setEventsData(updatedList);
    commitUpdates({ eventsData: updatedList });
  };

  // Schedule CRUD
  const updateSchedule = (newTimeline) => {
    const updated = { ...scheduleData, timeline: newTimeline };
    setScheduleData(updated);
    commitUpdates({ scheduleData: updated });
  };

  const updateScheduleInfo = (info) => {
    const updated = { ...scheduleData, ...info };
    setScheduleData(updated);
    commitUpdates({ scheduleData: updated });
  };

  const addScheduleSlot = (newSlot) => {
    const updated = {
      ...scheduleData,
      timeline: [...scheduleData.timeline, newSlot],
    };
    setScheduleData(updated);
    commitUpdates({ scheduleData: updated });
  };

  const updateScheduleSlot = (slotId, updatedSlot) => {
    const updated = {
      ...scheduleData,
      timeline: scheduleData.timeline.map((slot) =>
        slot.id === slotId ? { ...slot, ...updatedSlot } : slot
      ),
    };
    setScheduleData(updated);
    commitUpdates({ scheduleData: updated });
  };

  const deleteScheduleSlot = (slotId) => {
    const updated = {
      ...scheduleData,
      timeline: scheduleData.timeline.filter((slot) => slot.id !== slotId),
    };
    setScheduleData(updated);
    commitUpdates({ scheduleData: updated });
  };

  // Announcements CRUD
  const addAnnouncement = (newAnnouncement) => {
    const updated = [newAnnouncement, ...announcementsData];
    setAnnouncementsData(updated);
    commitUpdates({ announcementsData: updated });
  };

  const updateAnnouncement = (id, updatedFields) => {
    const updated = announcementsData.map((ann) =>
      ann.id === id ? { ...ann, ...updatedFields } : ann
    );
    setAnnouncementsData(updated);
    commitUpdates({ announcementsData: updated });
  };

  const deleteAnnouncement = (id) => {
    const updated = announcementsData.filter((a) => a.id !== id);
    setAnnouncementsData(updated);
    commitUpdates({ announcementsData: updated });
  };

  // Contact CRUD
  const updateContactData = (newData) => {
    const updated = { ...contactData, ...newData };
    setContactData(updated);
    commitUpdates({ contactData: updated });
  };

  const addFacultyCoordinator = (coordinator) => {
    const updated = {
      ...contactData,
      facultyCoordinators: [...contactData.facultyCoordinators, coordinator],
    };
    setContactData(updated);
    commitUpdates({ contactData: updated });
  };

  const updateFacultyCoordinator = (index, updatedCoordinator) => {
    const updatedList = [...contactData.facultyCoordinators];
    updatedList[index] = updatedCoordinator;
    const updated = { ...contactData, facultyCoordinators: updatedList };
    setContactData(updated);
    commitUpdates({ contactData: updated });
  };

  const deleteFacultyCoordinator = (index) => {
    const updatedList = contactData.facultyCoordinators.filter((_, idx) => idx !== index);
    const updated = { ...contactData, facultyCoordinators: updatedList };
    setContactData(updated);
    commitUpdates({ contactData: updated });
  };

  const addStudentCoordinator = (coordinator) => {
    const updated = {
      ...contactData,
      studentCoordinators: [...contactData.studentCoordinators, coordinator],
    };
    setContactData(updated);
    commitUpdates({ contactData: updated });
  };

  const updateStudentCoordinator = (index, updatedCoordinator) => {
    const updatedList = [...contactData.studentCoordinators];
    updatedList[index] = updatedCoordinator;
    const updated = { ...contactData, studentCoordinators: updatedList };
    setContactData(updated);
    commitUpdates({ contactData: updated });
  };

  const deleteStudentCoordinator = (index) => {
    const updatedList = contactData.studentCoordinators.filter((_, idx) => idx !== index);
    const updated = { ...contactData, studentCoordinators: updatedList };
    setContactData(updated);
    commitUpdates({ contactData: updated });
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
