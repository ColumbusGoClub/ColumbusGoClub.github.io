// Load up the events module, fetching event data w/ Tabletop
const __tabletop = (() => {
    return {
        tabletop: undefined,
        events: {},
        publicSpreadsheetUrl: 'https://docs.google.com/spreadsheets/d/1X6zE0Lq4qS9sodQOP0QX-ZyzCG6njhi7WIC-Z3uV4GY/edit?usp=sharing',
        daysOfWeek: ["sun", "mon", "tue", "wed", "thurs", "fri", "sat"],
        msInOneDay: 86400000,

        init: ()  => {
            this.tabletop = Tabletop.init( { key: __tabletop.publicSpreadsheetUrl,
                callback: __tabletop.loadInfo,
                orderby: "FullName"
            } );
        },

        loadInfo: (data, tabletop) => {
            const sheetData = this.tabletop.sheets("Sheet14_conflict1228477965");
            if (sheetData && sheetData.elements && sheetData.elements.length > 0) {
                __tabletop.events = sheetData.elements;
                __tabletop.filterOldEvents();
                __tabletop.populateEventsList();
            } else {
                __tabletop.displayNoEvents();
            }
        },
        filterOldEvents: () => {
            const futureOrReoccuringEvents = [];
            for(let event of Array.from(__tabletop.events)) {
                const eventDate = new Date(event['event_date']);
                const eventReoccurring = event['event_reoccurring'].toLowerCase() === 'true';
                const eventReoccurrence = event['event_reoccurrence'].toLowerCase();
                const today = new Date();
                today.setHours(0);
                today.setMinutes(1);
                today.setSeconds(0);
                if (eventDate >= today || (eventReoccurring && eventReoccurrence !== '')) {
                    
                    // It's reoccurring, so show the next natural occurrence of it on the calendar
                    if (eventReoccurring) {
                        const todaysDayOfWeek = today.getDay();
                        const recDayOfWeek = __tabletop.daysOfWeek.indexOf(eventReoccurrence);
                        
                        let daysAway = 0;
                        if (todaysDayOfWeek === recDayOfWeek) {
                            futureOrReoccuringEvents.push(event);
                            return;
                        }
                        if (todaysDayOfWeek > recDayOfWeek) {
                            daysAway = (7 + recDayOfWeek) - todaysDayOfWeek;
                        } else if (todaysDayOfWeek < recDayOfWeek) {
                            daysAway = recDayOfWeek - todaysDayOfWeek;
                        }
                        const nextOccurrence = new Date(today.valueOf() + (__tabletop.msInOneDay * daysAway));
                        event['event_date'] = nextOccurrence.toDateString().slice(4);
                      futureOrReoccuringEvents.push(event);
                    } else {
                      // It's not reoccurring, it's just in the future
                      futureOrReoccuringEvents.push(event);
                    }
                }
            }
            futureOrReoccuringEvents.sort((eventA, eventB)=>{
                const aDate = new Date(eventA['event_date']);
                const bDate = new Date(eventB['event_date']);
                
                return aDate.valueOf() >= bDate.valueOf() ? 1 : -1;
            });
            __tabletop.events = futureOrReoccuringEvents;
        },
        populateEventsList: () => {
            $("#loading").remove();
            const eventList = $("#events-list");
            let i = 0;
            while (i < __tabletop.events.length){
                const thisEvent = __tabletop.events[i];
                const eventDate = thisEvent['event_date'];
                const eventDay = __tabletop.daysOfWeek[new Date(eventDate).getDay()];
                const eventName = thisEvent['event_name'];
                const eventDescription = thisEvent['event_description'];
                eventList.append(`<div class='event'><div class='event-date'><span class='spandate'>${eventDate}</span><span class='spandayofweek'>${eventDay}</span></div><div class="event-text"><div class="event-name">${eventName}</div><div class="event-description">${eventDescription}</div></div></div>`);
                i++;
            }
            if(__tabletop.events.length < 1) {
                $("#events-list").remove();
            }
        },
        displayNoEvents: () => {
            const eventsList = $("#events-list");
            eventsList.innerText = "Oops! We had trouble loading the events :(";
            eventsList.style = "text-align: center; font-weight: bold; font-size: 2rem; padding-top: 35px;";
        }
    };
})();

window.addEventListener('DOMContentLoaded', __tabletop.init);