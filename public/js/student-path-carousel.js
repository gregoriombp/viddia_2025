(function () {
  'use strict';

  var onReady = function (callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  };

  var updateState = function (carousel, viewport, prevBtn, nextBtn) {
    var scrollWidth = viewport.scrollWidth;
    var clientWidth = viewport.clientWidth;
    var maxScroll = Math.max(scrollWidth - clientWidth, 0);
    var scrollLeft = viewport.scrollLeft;
    var atStart = scrollLeft <= 1;
    var atEnd = scrollLeft >= maxScroll - 1;
    var noOverflow = maxScroll <= 1;

    prevBtn.disabled = atStart || noOverflow;
    nextBtn.disabled = atEnd || noOverflow;

    carousel.classList.toggle('has-left-overflow', !(atStart || noOverflow));
    carousel.classList.toggle('has-right-overflow', !(atEnd || noOverflow));
  };

  var getStep = function (viewport) {
    return Math.max(viewport.clientWidth * 0.7, 240);
  };

  onReady(function () {
    var carousels = document.querySelectorAll('[data-module-carousel]');
    if (!carousels.length) {
      return;
    }

    var resizeObserver;
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(function (entries) {
        entries.forEach(function (entry) {
          var carousel = entry.target.closest('[data-module-carousel]');
          if (!carousel) {
            return;
          }
          var viewport = carousel.querySelector('[data-carousel-viewport]');
          var prevBtn = carousel.querySelector('[data-carousel-prev]');
          var nextBtn = carousel.querySelector('[data-carousel-next]');
          if (viewport && prevBtn && nextBtn) {
            updateState(carousel, viewport, prevBtn, nextBtn);
          }
        });
      });
    }

    carousels.forEach(function (carousel) {
      var viewport = carousel.querySelector('[data-carousel-viewport]');
      var prevBtn = carousel.querySelector('[data-carousel-prev]');
      var nextBtn = carousel.querySelector('[data-carousel-next]');

      if (!viewport || !prevBtn || !nextBtn) {
        return;
      }

      var scrollByStep = function (direction) {
        var step = getStep(viewport) * direction;
        viewport.scrollBy({ left: step, behavior: 'smooth' });
      };

      prevBtn.addEventListener('click', function () {
        scrollByStep(-1);
      });

      nextBtn.addEventListener('click', function () {
        scrollByStep(1);
      });

      var ticking = false;
      viewport.addEventListener('scroll', function () {
        if (ticking) {
          return;
        }
        ticking = true;
        window.requestAnimationFrame(function () {
          updateState(carousel, viewport, prevBtn, nextBtn);
          ticking = false;
        });
      }, { passive: true });

      if (resizeObserver) {
        resizeObserver.observe(viewport);
      } else {
        window.addEventListener('resize', function () {
          updateState(carousel, viewport, prevBtn, nextBtn);
        });
      }

      updateState(carousel, viewport, prevBtn, nextBtn);
    });
  });
})();
