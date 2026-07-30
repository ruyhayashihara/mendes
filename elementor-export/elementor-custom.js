/**
 * ============================================================
 * ESCOLA DE SOLDA NO JAPÃO — Custom JavaScript para Elementor
 * ============================================================
 * 
 * Este arquivo contém:
 * 1. Simulador de Salário (Salary Calculator)
 * 2. Scroll-to-Section suave
 * 3. Scroll Animations (fade-in on viewport)
 * 4. WhatsApp redirect helper
 * 
 * Instruções: Enfileire este arquivo via functions.php do tema filho
 * ou adicione via Elementor > Custom Code (Header/Footer script)
 * ============================================================
 */

(function () {
  'use strict';

  // ===================== 1. SALARY CALCULATOR =====================
  function initSalaryCalculator() {
    const calculator = document.getElementById('esj-salary-calculator');
    if (!calculator) return;

    const currentWageSlider = document.getElementById('esj-current-wage');
    const weeklyHoursSlider = document.getElementById('esj-weekly-hours');
    const overtimeHoursSlider = document.getElementById('esj-overtime-hours');

    const currentWageDisplay = document.getElementById('esj-current-wage-display');
    const weeklyHoursDisplay = document.getElementById('esj-weekly-hours-display');
    const overtimeHoursDisplay = document.getElementById('esj-overtime-hours-display');

    const currentMonthlyEl = document.getElementById('esj-current-monthly');
    const welderMonthlyEl = document.getElementById('esj-welder-monthly');
    const monthlyIncreaseEl = document.getElementById('esj-monthly-increase');
    const annualIncreaseEl = document.getElementById('esj-annual-increase');

    const WELDER_WAGE = 1950;
    const WEEKS_PER_MONTH = 4.33;

    function formatJPY(amount) {
      return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(Math.round(amount));
    }

    function calculate() {
      const currentWage = parseInt(currentWageSlider.value);
      const weeklyHours = parseInt(weeklyHoursSlider.value);
      const overtimeHours = parseInt(overtimeHoursSlider.value);

      // Current calculations
      const currentRegularPay = currentWage * weeklyHours * WEEKS_PER_MONTH;
      const currentOvertimePay = (currentWage * 1.25) * overtimeHours * WEEKS_PER_MONTH;
      const currentTotalMonthly = currentRegularPay + currentOvertimePay;

      // Welder calculations
      const welderRegularPay = WELDER_WAGE * weeklyHours * WEEKS_PER_MONTH;
      const welderOvertimePay = (WELDER_WAGE * 1.25) * overtimeHours * WEEKS_PER_MONTH;
      const welderTotalMonthly = welderRegularPay + welderOvertimePay;

      const monthlyIncrease = welderTotalMonthly - currentTotalMonthly;
      const annualIncrease = monthlyIncrease * 12;

      // Update displays
      currentWageDisplay.textContent = formatJPY(currentWage) + '/h';
      weeklyHoursDisplay.textContent = weeklyHours + ' horas';
      overtimeHoursDisplay.textContent = overtimeHours + ' horas';

      currentMonthlyEl.textContent = formatJPY(currentTotalMonthly);
      welderMonthlyEl.textContent = formatJPY(welderTotalMonthly);
      monthlyIncreaseEl.textContent = '+' + formatJPY(monthlyIncrease);
      annualIncreaseEl.textContent = '+' + formatJPY(annualIncrease);
    }

    // Attach event listeners
    [currentWageSlider, weeklyHoursSlider, overtimeHoursSlider].forEach(slider => {
      if (slider) {
        slider.addEventListener('input', calculate);
      }
    });

    // Initial calculation
    calculate();
  }

  // ===================== 2. SMOOTH SCROLL =====================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"], [data-scroll-to]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        const targetId = el.getAttribute('href') || el.getAttribute('data-scroll-to');
        if (!targetId || targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ===================== 3. SCROLL ANIMATIONS =====================
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.esj-fade-in, .esj-fade-in-left, .esj-fade-in-right');
    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('esj-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ===================== 4. WHATSAPP REDIRECT HELPER =====================
  // Called from Elementor Form "After Submit" action via custom redirect URL
  window.esjWhatsAppRedirect = function (formData) {
    var schoolPhone = '818012345678';
    var name = formData.name || '';
    var whatsapp = formData.whatsapp || '';
    var province = formData.province || '';
    var currentJob = formData.currentJob || '';
    var timeInJapan = formData.timeInJapan || '';
    var hasExperience = formData.hasExperience ? 'Sim' : 'Não';
    var notes = formData.notes || '';

    var message = 'Olá Professor William! Gostaria de falar com um consultor da Escola de Solda no Japão sobre vagas e matrículas.\n\n' +
      'Aqui estão os meus dados para agilizar o atendimento:\n' +
      '• Nome: ' + name + '\n' +
      '• Telefone: ' + whatsapp + '\n' +
      '• Província: ' + province + '\n' +
      '• Trabalho Atual: ' + currentJob + '\n' +
      '• Tempo de Japão: ' + timeInJapan + '\n' +
      '• Tem experiência: ' + hasExperience + '\n' +
      (notes ? '• Observações: ' + notes + '\n' : '') +
      '\nFico no aguardo do contato! Obrigado.';

    var encodedMessage = encodeURIComponent(message);
    var whatsappUrl = 'https://wa.me/' + schoolPhone + '?text=' + encodedMessage;
    window.open(whatsappUrl, '_blank');
  };

  // ===================== 5. ELEMENTOR FORM WHATSAPP INTEGRATION =====================
  // Listen for Elementor form submission success and redirect to WhatsApp
  function initElementorFormWhatsApp() {
    if (typeof jQuery !== 'undefined') {
      jQuery(document).on('submit_success', '.elementor-form', function (event, response) {
        var form = jQuery(this);
        var formData = {};

        form.find('input, select, textarea').each(function () {
          var name = jQuery(this).attr('name');
          var value = jQuery(this).val();
          if (name) {
            // Elementor form fields have format: form_fields[field_id]
            var cleanName = name.replace('form_fields[', '').replace(']', '');
            formData[cleanName] = value;
          }
        });

        // Check checkbox
        form.find('input[type="checkbox"]').each(function () {
          var name = jQuery(this).attr('name');
          if (name) {
            var cleanName = name.replace('form_fields[', '').replace(']', '');
            formData[cleanName] = jQuery(this).is(':checked');
          }
        });

        // Redirect to WhatsApp after a short delay
        setTimeout(function () {
          window.esjWhatsAppRedirect(formData);
        }, 1500);
      });
    }
  }

  // ===================== INITIALIZE EVERYTHING =====================
  function init() {
    initSalaryCalculator();
    initSmoothScroll();
    initScrollAnimations();
    initElementorFormWhatsApp();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Also run after Elementor frontend init (for editor preview)
  if (typeof jQuery !== 'undefined') {
    jQuery(window).on('elementor/frontend/init', function () {
      setTimeout(init, 500);
    });
  }
})();
