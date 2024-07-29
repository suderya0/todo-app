'use client';

import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import insteractionPlugin from '@fullcalendar/interaction';
import { useRouter } from 'next/navigation';
import { EventInput } from '@fullcalendar/core';
import useTodos from '../components/Todo'; // useTodos kancasını içe aktarın

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

  // Yapılacakları FullCalendar'ın `events` özelliği için dönüştür
  const transformTodosToEvents = (todos: Todo[]): EventInput[] => {
    return todos.map(todo => ({
      title: todo.text,
      start: todo.createdAt, // Tarih formatı uygun olmalıdır
      // Diğer özelleştirmeler yapılabilir
    }));
  };

  const events = transformTodosToEvents([...incompleteTodos, ...completedTodos]);

  return (
    <div>
      <h1>Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, insteractionPlugin]}
        initialView='dayGridMonth'
        headerToolbar= {{
          start: "today prev , next",
          center: "title",
          end: "dayGridMonth, timeGridWeek, timeGridDay"  

        }}
        height={"90vh"}
        weekends={false}
        events={events}
        eventContent={renderEventContent}
      />
      
    </div>
  );
};

// Custom render function for event content
function renderEventContent(eventInfo: any) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default Calendar;
