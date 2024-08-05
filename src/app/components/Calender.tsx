'use client';

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import { DateSelectArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';
import useTodos from '../components/Todo'; // useTodos kancasını içe aktarın
import styles from '../styles/Calender.module.css';
import { start } from 'repl';

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
        selectable = {true}
        editable = {true}
        height={"90vh"}
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
let id = 0;
const handleDateSelect = (selectInfo: DateSelectArg) => {
  let title = prompt("Enter event title: ")
  let calendarApi = selectInfo.view.calendar
  calendarApi.unselect()
  if(title){
    calendarApi.addEvent({
      id:String(id++),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay
    })
  }
}

const handleEventDelete = (clickInfo: any) => {
  if (confirm("Are you sure you want to delete this event?")) {
    clickInfo.event.remove();
    // Burada event'i silme işlemini yapabilirsiniz.
  }
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
