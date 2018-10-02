# ColumbusGoClub.github.io

This is the website for the **Columbus Go Club**

## Best Practices

- Seek to find, use, and share the best practices of other coders
- Track bugs in code and broken stuff in github issues
- Use "TODO, FIXME, CHANGED, XXX, IDEA, HACK, NOTE, REVIEW, NB, BUG, QUESTION, COMBAK, TEMP" when coding (great when combined with the todo-show package on atom)
- Leave plenty of comments for poor future coders
- Properly file css, javacript, assets (media, images, etc)
- Minify the CSS and Javascript
- Learn workflow for team github projects


## TO DO  

### overall  
- [x] get SSL/https properly set up (issue was that CNAME of the DNS wasn't pointing to 'username'.github.io)
- [x] organize java and css
- [x] minify java and css (Devin using Atom.io with package which automatically minifies .css and .js files when saving)
- [x] create some sort of navigation page that has links that I can use to navigate to all these hidden pages
- [ ] properly set meta tags for SEO
- [ ] learn and apply best practices for SEO  
- [ ] change img to assets? (seems like it might be a common thing)

### index.html  
- [ ] Integrate or Redo index page with bootstrap (to make mobile friendly)
- [ ] Recode blocks
- [ ] Properly insert meetup calendar
- [ ] Google Maps integration
- [ ] add navbar

### Library
- [ ] Change the spreadsheet to have a column called "copies"
- [ ] Change the "donated by" row to allow combinations of names (eg Devin, Tim, Devin & Tim, etc.)

### checkin.html  
- [x] have form auto-complete with names from the google sheet master contact list
- [x] validate names on checkin page
- [ ] fix the css file so that there aren't conflicting items
- [x] create a .js file and properly organize it  
- [ ] minify the checkin.js
- [x] Fix the fuzzy search dropdown for mobile
- [x] Fix the fuzzy search on computer, it won't allow you to select names from the dropdown

### norms.html  
- [ ] have the co-created norms from the google doc load the html of this page
- [ ] make this document editable by club members with approval from an admin  
- [ ] have a more official code of conduct, perhaps match the AGA

### checkin.css
- [ ] integrate the select .form-container and .custom-select CSS (or at least have the CSS match)
- [x] minified version doesn't color correctly in atom, check and see if this means there is an error in the code
  NOTE: Alex says this isn't an issue

### library.html
- [ ] create a page that allows members to browse the entire library database
- [ ] also make the date base searchable by title, author, suggested rank, etc?

### library-system.html
- [ ] create a page that displays the checkout and checking systems
- [ ] link this page to the google form LibraryForm so that it inputs data there

### youthsignup.html
- [x] check to see if it properly takes input
- [x] fix dropdown so that it matches style of the page (CSS if available in the checkin.css file)
- [x] point to min.css file

### youthgamerecords.html
- [ ] create a page in which youth can record their game results, or perhaps a teacher can record it for them
- [ ] have those inputs populate a google form, which is then analyzed in a separate sheet, and which is then shown on the site

### 404
- [ ] fix text at bottom so it says 404 (or something witty) and so that people can click on it as a link back to index page
- [ ] make video only min-height 100% **AND** centered
