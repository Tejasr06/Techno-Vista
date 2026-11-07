import React, { createContext, useContext, useState, useEffect } from 'react';
import { FEST_DATA as initialFestData, GOOGLE_FORM_URL as initialGoogleFormUrl } from '../data/festData';
import { EVENTS_DATA as initialEventsData } from '../data/eventsData';
import { SCHEDULE_DATA as initialScheduleData } from '../data/scheduleData';
import { ANNOUNCEMENTS_DATA as initialAnnouncementsData } from '../data/announcementsData';
import { CONTACT_DATA as initialContactData } from '../data/contactData';

const FestContext = createContext();

const STORAGE_KEY = 'techno_vista_2k26_custom_data';

export function FestProvider({ children }) {
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

  // Automatically sync all admin updates to localStorage
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
