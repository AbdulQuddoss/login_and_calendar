import React from 'react'
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, DragAndDrop, Resize } from '@syncfusion/ej2-react-schedule';
import { useGlobalContext } from '../../Context/AppContext';

const Calendar = () => {
  const {meetings, addMeeting, updateMeeting, removeMeeting} = useGlobalContext();

  const onActionComplete = (args) => {
      if (args.requestType === 'eventCreated') {
        args.data.forEach(event => addMeeting(event));
      } else if (args.requestType === 'eventRemoved') {
        args.deletedRecords.forEach(event => removeMeeting(event.Id));
      } else if (args.requestType === 'eventChanged') {
        args.changedRecords.forEach(event => updateMeeting(event));
      }
  };

  let uniqueMeetings = [...new Set(meetings)];
  console.log(uniqueMeetings);
  
  const eventSettings = {
    dataSource: uniqueMeetings,
    allowResizing: true,
    allowDragAndDrop: true
  };
  
  return (
    <ScheduleComponent currentView='Month' height='100vh' eventSettings={eventSettings} actionComplete={onActionComplete}>
      <Inject services={[Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize]}/>
    </ScheduleComponent>
  )
}

export default Calendar