'use client';

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';
import useTodos from '../components/Todo'; // useTodos kancasını içe aktarın
import styles from '../styles/Calender.module.css';

interface Todo {
  id: string;
  text: string;        //Todo items
  completed: boolean;
  createdAt: Date;
}

const Calendar: React.FC = () => {
  const {
    incompleteTodos,
    completedTodos,
    handleCalenderRedirect
  } = useTodos();

  const transformTodosToEvents = (todos: Todo[]): EventInput[] => {
    return todos.map(todo => ({
      title: todo.text,
      start: todo.createdAt, 
      
    }));
  };

  const events = transformTodosToEvents([...incompleteTodos, ...completedTodos]);

  return (
    <div className={styles.calendarContainer}>
      <h1 className={styles.calendarTitle}>Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        headerToolbar= {{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay"  
        }}
        height={"90vh"}
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        firstDay={1} 
      />
    </div>
  );
};

function renderEventContent(eventInfo: any) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default Calendar;
