// Load up the events module, fetching event data w/ Tabletop
const __tabletop = (() => {
    return {
        tabletop: undefined,
        events: {},
        publicSpreadsheetUrl: 'https://docs.google.com/spreadsheets/d/1X6zE0Lq4qS9sodQOP0QX-ZyzCG6njhi7WIC-Z3uV4GY/edit?usp=sharing',

        init: ()  => {
            this.tabletop = Tabletop.init( { key: __tabletop.publicSpreadsheetUrl,
                callback: __tabletop.showInfo,
                orderby: "FullName"
            } );
        },

        showInfo: (data, tabletop) => {
            const sheetData = this.tabletop.sheets("Events Widget");
            if (sheetData) {
                this.events = sheetData.elements;
                __tabletop.populateEventsList();
            } else {
                __tabletop.displayNoEvents();
            }
        },
        populateEventsList: () => {
            $("#loading").remove();
            $("#loading-desktop").remove();
            const eventList = $("#events-list");
            let i = 0;
            while (i < this.events.length){
                const thisEvent = this.events[i];
                const eventDate = thisEvent['event_date'];
                const daysInWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
                const eventDay = daysInWeek[new Date(eventDate).getDay()];
                const eventName = thisEvent['event_name'];
                const eventDescription = thisEvent['event_description'];
                eventList.append(`<div class='event'><div class='event-date'><span class='spandate'>${eventDate}</span><span class='spandayofweek'>${eventDay}</span></div><div class="event-text"><div class="event-name">${eventName}</div><div class="event-description">${eventDescription}</div></div></div>`);
                i++;
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