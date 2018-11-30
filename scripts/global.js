/* Inject global HTML (header, hamburger menu, footer) */

const header =
`
<nav class="navbar navbar-light">
    <div class="brand">
        <a class="navbar-brand" href="index.html">
            <img src="img/go-stones-b&w.png" height="60px" width="55px"/>
        </a>
        <span>The Columbus Go Club</span>
    </div>
    <ul id="header-links-desktop" class="nav">
        <li class="nav-item">
            <a class="nav-link header-link" href="checkin.html">Check In</a>
        </li>
        <li class="nav-item">
            <a class="nav-link header-link" href="library.html">View Library</a>
        </li>
        <li class="nav-item">
            <a class="nav-link header-link" href="youthsignup.html">Youth Tournament Signup</a>
        </li>
    </ul>
    <div id="header-links-mobile" class="dropdown">
        <button class="navbar-toggler" type="button" data-target="#navbar-contents"
                aria-controls="navbar-contents" aria-expanded="false" aria-label="Toggle menu">
            <div class="animated-icon"><span></span><span></span><span></span></div>
        </button>
    </div>
</nav>

`;
const navmenu =
`
<div id="navbar-contents">
    <div id="header-links-navbar" class="nav" >
        <span class="nav-item">
            <a class="nav-link header-link" href="checkin.html">Check In</a>
        </span>
        <span class="nav-item">
            <a class="nav-link header-link" href="library.html">View Library</a>
        </span>
        <span class="nav-item">
            <a class="nav-link header-link" href="youthsignup.html">Youth Tournament Signup</a>
        </span>
    </div>
</div>

`;
const footer =
`
<footer>
	<div id="blackstripe">
		<div id="icon-plane">
			<img id="icon-plane-img" src="img/paper-plane-icon.png" height="37px" width="50px"/>
		</div>
		<div id="organizer-email"><a id="email" href="mailto:organizer@columbusgo.club"><i>organizer@columbusgo.club</i></a></div>
		<div id="reach-out">Questions? Reach out.</div>
		<div id="tourney-callout">Make sure you connect with our google or facebook group to hear when the next tournament will be.</div>
		<div id="icons">
			<a href="https://www.facebook.com/groups/cbusgoclub/" target="_blank"><img class="socialIcon" src="img/facebook-circle.png"/></a>
			<a href="https://groups.google.com/group/columbusgoclub/subscribe" target="_blank"><img class="socialIcon" src="img/email-circle.png"/></a>
			<a href="https://www.meetup.com/Columbus-Go-Baduk-Weiqi-Club/" target="_blank"><img class="socialIcon" src="img/meetup-circle.png"/></a>
		</div>
	</div>
</footer>

`;

const bootstrap = function(){
    const bodyTag = $('body');
    bodyTag.prepend(function(){return navmenu + header;});
    bodyTag.append(function(){return footer;});
    $('#navbar-contents').hide();
    const iconElem = $('.animated-icon');
    const entireButton = $($('#header-links-mobile')[0]);

    $('.navbar-toggler').click(function(e){
        let isOpen = iconElem.hasClass('open');

        if (isOpen) { // close!
            $('#navbar-contents').fadeOut(400, ()=>{});
            entireButton.removeClass('scroll-follow');
        } else { // open!
            $('#navbar-contents').fadeIn(400, ()=>{});
            entireButton.addClass('scroll-follow');
        }
        iconElem.toggleClass('open');
    });
};

$( bootstrap );
