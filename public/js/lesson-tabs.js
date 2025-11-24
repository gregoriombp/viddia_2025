(function () {
    "use strict";

    var lessonList = document.getElementById("lessonStagesAccordion");
    var sidebarContainer = document.querySelector(".lesson-layout__sidebar");
    var tabContainer = document.getElementById("lesson-aulas");
    var aulasTabLink = document.getElementById("lesson-aulas-tab");
    var commentsTabLink = document.getElementById("lesson-comments-tab");

    function handleResize() {
        if (window.innerWidth < 992) {
            // Mobile/Tablet: Move to tab
            if (lessonList && tabContainer && !tabContainer.contains(lessonList)) {
                tabContainer.appendChild(lessonList);

                // Activate Aulas tab by default on mobile
                if (aulasTabLink) {
                    $(aulasTabLink).tab('show');
                }
            }
        } else {
            // Desktop: Move back to sidebar
            if (lessonList && sidebarContainer && !sidebarContainer.contains(lessonList)) {
                sidebarContainer.appendChild(lessonList);

                // If Aulas tab was active, switch to Comments
                if (aulasTabLink && aulasTabLink.classList.contains("active")) {
                    $(commentsTabLink).tab('show');
                }
            }
        }
    }

    // Initial check
    handleResize();

    // Listen for resize
    window.addEventListener("resize", handleResize);
})();
