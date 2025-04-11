document.addEventListener("DOMContentLoaded", function () {
  const thumbnails = document.querySelectorAll(".thumbnail");
  const mainCertificateImg = document.querySelector(".main-certificate img");
  const certificateTitle = document.querySelector(".certificate-details h3");
  const certificateIssuer = document.querySelector(
    ".certificate-meta-item:nth-child(1) span:last-child"
  );
  const certificateDate = document.querySelector(
    ".certificate-meta-item:nth-child(2) span:last-child"
  );
  const certificateId = document.querySelector(
    ".certificate-meta-item:nth-child(3) span:last-child"
  );

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      // Update main image
      const thumbnailImg = this.querySelector("img");
      mainCertificateImg.src = thumbnailImg.src;

      // Update certificate details
      certificateTitle.textContent = this.dataset.title;
      certificateIssuer.textContent = this.dataset.issuer;
      certificateDate.textContent = this.dataset.date;
      certificateId.textContent = this.dataset.id;

      // Update active state
      thumbnails.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
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

  // Add event listeners for mobile container thumbnails
  document
    .querySelectorAll(".mobile-container .thumbnail")
    .forEach((thumbnail) => {
      thumbnail.addEventListener("click", function () {
        // Remove active class from all thumbnails
        document
          .querySelectorAll(".mobile-container .thumbnail")
          .forEach((t) => t.classList.remove("active"));

        // Add active class to clicked thumbnail
        this.classList.add("active");

        // Update main certificate image
        const mainCertificate = this.querySelector("img").src;
        document.querySelector(".mobile-container .main-certificate img").src =
          mainCertificate;

        // Update certificate details
        const title = this.getAttribute("data-title");
        const issuer = this.getAttribute("data-issuer");
        const date = this.getAttribute("data-date");
        const id = this.getAttribute("data-id");

        const detailsContainer = document.querySelector(
          ".mobile-container .certificate-details"
        );
        detailsContainer.querySelector("h3").textContent = title;
        detailsContainer.querySelector(
          ".certificate-meta-item:nth-child(1) span:last-child"
        ).textContent = issuer;
        detailsContainer.querySelector(
          ".certificate-meta-item:nth-child(2) span:last-child"
        ).textContent = date;
        detailsContainer.querySelector(
          ".certificate-meta-item:nth-child(3) span:last-child"
        ).textContent = id;
      });
    });

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
