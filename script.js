document.addEventListener("DOMContentLoaded", function () {
  // Get all thumbnail elements for both desktop and mobile
  const desktopThumbnails = document.querySelectorAll(
    ".main-container .thumbnail"
  );
  const mobileThumbnails = document.querySelectorAll(
    ".mobile-container .thumbnail"
  );

  // Get main certificate images
  const desktopMainCertificate = document.querySelector(
    ".main-container .main-certificate img"
  );
  const mobileMainCertificate = document.querySelector(
    ".mobile-container .main-certificate img"
  );

  // Get certificate detail elements for desktop
  const desktopCertificateTitle = document.querySelector(
    ".main-container .certificate-title"
  );
  const desktopCertificateDescription = document.querySelector(
    ".main-container .certificate-description"
  );
  const desktopCertificateIssuer = document.querySelector(
    ".main-container .certificate-issuer"
  );
  const desktopCertificateDate = document.querySelector(
    ".main-container .certificate-date"
  );
  const desktopCertificateId = document.querySelector(
    ".main-container .certificate-id"
  );

  // Get certificate detail elements for mobile
  const mobileCertificateTitle = document.querySelector(
    ".mobile-container .certificate-title"
  );
  const mobileCertificateDescription = document.querySelector(
    ".mobile-container .certificate-description"
  );
  const mobileCertificateIssuer = document.querySelector(
    ".mobile-container .certificate-issuer"
  );
  const mobileCertificateDate = document.querySelector(
    ".mobile-container .certificate-date"
  );
  const mobileCertificateId = document.querySelector(
    ".mobile-container .certificate-id"
  );

  // Certificate descriptions
  const certificateDescriptions = {
    Python:
      "This certificate recognizes the successful completion of the web development course focused on building dynamic web applications using modern technologies and best practices.",
    Javascript:
      "This certificate acknowledges the completion of advanced JavaScript programming concepts, including modern ES6+ features, asynchronous programming, and web application development.",
    "Responsive Web Design":
      "This certificate validates the understanding and implementation of responsive web design principles, ensuring optimal user experience across all device sizes.",
  };

  // Function to update certificate details
  function updateCertificateDetails(thumbnail, isMobile = false) {
    const title = thumbnail.dataset.title;
    const issuer = thumbnail.dataset.issuer;
    const date = thumbnail.dataset.date;
    const id = thumbnail.dataset.id;

    if (isMobile) {
      mobileMainCertificate.src = thumbnail.querySelector("img").src;
      mobileCertificateTitle.textContent = title;
      mobileCertificateDescription.textContent = certificateDescriptions[id];
      mobileCertificateIssuer.textContent = issuer;
      mobileCertificateDate.textContent = date;
      mobileCertificateId.textContent = id;
    } else {
      desktopMainCertificate.src = thumbnail.querySelector("img").src;
      desktopCertificateTitle.textContent = title;
      desktopCertificateDescription.textContent = certificateDescriptions[id];
      desktopCertificateIssuer.textContent = issuer;
      desktopCertificateDate.textContent = date;
      desktopCertificateId.textContent = id;
    }
  }

  // Add click event listeners for desktop thumbnails
  desktopThumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      desktopThumbnails.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
      updateCertificateDetails(this, false);
    });
  });

  // Add click event listeners for mobile thumbnails
  mobileThumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      mobileThumbnails.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
      updateCertificateDetails(this, true);
    });
  });

  // Skills progress bar animation
  const skillsSection = document.querySelector(".skills-section");
  const progressBars = document.querySelectorAll(".skill-progress");

  // Store the original width values
  const originalWidths = {};
  progressBars.forEach((bar) => {
    // Get the class that contains the skill name (e.g., html-skill)
    const skillClass = Array.from(bar.classList).find((cls) =>
      cls.includes("-skill")
    );
    // Store the original width from CSS
    originalWidths[skillClass] = getComputedStyle(bar).width;
    // Set initial width to 0
    bar.style.width = "0";
  });

  // Function to check if an element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    return rect.top <= windowHeight * 0.8; // Trigger animation when element is 80% visible
  }

  // Function to animate progress bars
  function animateProgressBars() {
    if (isInViewport(skillsSection)) {
      progressBars.forEach((bar) => {
        // Get the class that contains the skill name
        const skillClass = Array.from(bar.classList).find((cls) =>
          cls.includes("-skill")
        );
        // Set the final width from our stored values
        setTimeout(() => {
          bar.style.width = originalWidths[skillClass];
        }, 100); // Small delay for better visual effect
      });
      // Remove the scroll event listener after animation
      window.removeEventListener("scroll", animateProgressBars);
    }
  }

  // Add scroll event listener
  window.addEventListener("scroll", animateProgressBars);

  // Check if skills section is already in viewport on page load
  setTimeout(animateProgressBars, 500); // Delay initial check for better browser compatibility

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      let targetElement;

      // Check if we're on mobile or desktop
      if (window.innerWidth < 992) {
        targetElement = document.querySelector(`#mobile-${targetId.slice(1)}`);
      } else {
        targetElement = document.querySelector(targetId);
      }

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Update active state in navbar
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active");
        });
        this.classList.add("active");
      }
    });
  });

  // Update active nav link on scroll
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });
});
