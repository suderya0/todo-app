'use client';

import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';
import useTodos from '../components/Todo';
import styles from '../styles/Calender.module.css';
import { DateSelectArg } from '@fullcalendar/core';

const Calendar: React.FC = () => {
  const { incompleteTodos, completedTodos, handleDeleteTodo, handleAddTodo } = useTodos();
  const [events, setEvents] = useState<EventInput[]>([]);

  useEffect(() => {
    const formatTodosForCalendar = () => {
      const allTodos = [...incompleteTodos, ...completedTodos];
      const formattedEvents = allTodos.map(todo => ({
        id: todo.id,
        title: todo.text,
        start: todo.createdAt.toISOString().split('T')[0], // Ensure it's a Date object
        end: todo.createdAt.toISOString().split('T')[0],   // Ensure it's a Date object
      }));
      setEvents(formattedEvents);
    };

    formatTodosForCalendar();
  }, [incompleteTodos, completedTodos]);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = prompt('Enter event title:');
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    

    if (title) {
      calendarApi.addEvent({
        id: String(Date.now()),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });

      
    }
  };

  const handleEventDelete = async (clickInfo: any) => {
    if (confirm('Are you sure you want to delete this event?')) {
      const todoId = clickInfo.event.id; // get to do id

      clickInfo.event.remove();  //delete from calender

      await handleDeleteTodo(todoId);   //delete from database
    }
  };

  const renderEventContent = (eventInfo: any) => (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );

  return (
    <div className={styles.calendarContainer}>
      <h1 className={styles.calendarTitle}>Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'today prev,next',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        selectable={true}
        editable={true}
        height={'90vh'}
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        firstDay={1}
        select={handleDateSelect}
        eventClick={handleEventDelete} 
      />
    </div>
  );
};

export default Calendar;
