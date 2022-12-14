const navItems = document.querySelector('.mobile-nav__items');
const allNavItems = document.querySelectorAll('.mobile-nav__item');
const burgerBtn = document.querySelector('.burger-btn');
const faders = document.querySelectorAll('.fade-in');

const navBtnBras = document.querySelector('.burger-btn__bars');
const allSections = document.querySelectorAll('.section');

//otwieranie nawigacji
const handleNav = () => {
	navItems.classList.toggle('mobile-nav__items--active');

	navBtnBras.classList.remove('black-bars-color');

	allNavItems.forEach((item) => {
		item.addEventListener('click', () => {
			navItems.classList.remove('mobile-nav__items--active');
			removeAnimation();
		});
	});

	handleNavItemsAnimation();
};
//usuwanie klasy animacji jesli zamykamy nawigacje linkiem
const removeAnimation = () => {
	allNavItems.forEach((item) => {
		item.classList.remove('mobile-nav-items-animation');
	});
};
//animacja
const handleNavItemsAnimation = () => {
	let delayTime = 0;

	allNavItems.forEach((item) => {
		item.classList.toggle('mobile-nav-items-animation');
		//animation-delay: .3s;
		item.style.animationDelay = '.' + delayTime + 's';
		delayTime++;
	});
};

const handleObserver = () => {
	const currentSection = window.scrollY;

	allSections.forEach((section) => {
		
		if (
			section.classList.contains('white-section') &&
			section.offsetTop <= currentSection + 60
		) {
			navBtnBras.classList.add('black-bars-color');
		} else if (
			!section.classList.contains('white-section') &&
			section.offsetTop <= currentSection + 60
		) {
			navBtnBras.classList.remove('black-bars-color');
		}
	});
};

burgerBtn.addEventListener('click', handleNav);
window.addEventListener('scroll', handleObserver);

const appearOptions = {
	threshold: 1,
	rootMargin: '300px',
};
const appearOnScroll = new IntersectionObserver(function (
	entries,
	appearOnScroll
) {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) {
			return;
		} else {
			entry.target.classList.add('fade-in--appear');
			appearOnScroll.unobserve(entry.target);
		}
	});
},
appearOptions);

faders.forEach((fader) => {
	appearOnScroll.observe(fader);
});
