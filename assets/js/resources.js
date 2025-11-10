// Resources page tab controller
(function(){
  'use strict';
  function initTabs(){
    const tabs = Array.from(document.querySelectorAll('.tab'));
    const sections = Array.from(document.querySelectorAll('.video-section'));
    if(!tabs.length || !sections.length) return;
    // default active
    if(!sections.some(s=>s.classList.contains('active'))){
      sections[0].classList.add('active');
      tabs[0].classList.add('active');
      tabs[0].setAttribute('aria-selected','true');
    }

    // activate from hash if present (#grade-5, #4th-form)
    const hash = (location.hash || '').replace('#','');
    if(hash){
      const target = document.getElementById(hash);
      if(target){
        sections.forEach(sec=>sec.classList.remove('active'));
        tabs.forEach(t=>{ t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
        target.classList.add('active');
        const tab = tabs.find(t=>{
          const g = t.getAttribute('data-grade');
          const id = g === '4th-form' ? '4th-form' : 'grade-' + g.replace(/[^0-9]/g,'');
          return id === hash;
        });
        if(tab){ tab.classList.add('active'); tab.setAttribute('aria-selected','true'); }
      }
    }
    tabs.forEach(tab=>{
      tab.setAttribute('role','tab');
      const grade = tab.getAttribute('data-grade');
      tab.addEventListener('click', function(e){
        const targetId = grade === '4th-form' ? '4th-form' : 'grade-' + grade.replace(/[^0-9]/g,'');
        const target = document.getElementById(targetId);
        if(target){
          e.preventDefault();
          sections.forEach(sec=>sec.classList.remove('active'));
          tabs.forEach(t=>{ t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
          target.classList.add('active');
          tab.classList.add('active');
          tab.setAttribute('aria-selected','true');
          // update hash for deep-linking
          history.replaceState(null, '', '#' + targetId);
          target.scrollIntoView({behavior:'smooth', block:'start'});
        }
      });
    });
    document.addEventListener('keydown', function(e){
      if(['ArrowLeft','ArrowRight'].includes(e.key) && document.activeElement.classList.contains('tab')){
        e.preventDefault();
        const idx = tabs.indexOf(document.activeElement);
        const nextIdx = e.key==='ArrowRight' ? (idx+1)%tabs.length : (idx-1+tabs.length)%tabs.length;
        tabs[nextIdx].focus();
        tabs[nextIdx].click();
      }
    });
  }

  function initPdfCards(){
    // Only decorate per-grade list links, not the summary table
    const lists = document.querySelectorAll('.pdf-lists .pdf-list-grade ul');
    lists.forEach(ul=>{
      ul.querySelectorAll('a[href]').forEach(a=>{
        a.classList.add('pdf-card');
        a.setAttribute('role','listitem');
      });
      ul.setAttribute('role','list');
    });
  }

  function initSearch(){
    const input = document.getElementById('resourceSearch');
    if(!input) return;
  const SEARCH_TARGET_SELECTOR = '.video-section .video-wrapper a, .pdf-lists a.pdf-card';
    const allTargets = Array.from(document.querySelectorAll(SEARCH_TARGET_SELECTOR));
    input.addEventListener('input', function(){
      const q = input.value.trim().toLowerCase();
      if(!q){
        allTargets.forEach(function(el){
          var wrap = el.closest('.video-wrapper');
          if(wrap){ wrap.style.display = ''; }
          // reset the link itself too for PDF cards list
          el.style.display = '';
        });
        return;
      }
      allTargets.forEach(el=>{
        const text = el.textContent.toLowerCase();
        const match = text.includes(q);
        // handle video wrapper container
        const wrapper = el.closest('.video-wrapper');
        if(wrapper){ wrapper.style.display = match? '' : 'none'; }
        else { el.style.display = match? '' : 'none'; }
      });
    });
  }

  function init(){
    initTabs();
    initPdfCards();
    initVideoDecor();
    initSearch();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();

// Add simple aria labels and rel attrs to video links
function initVideoDecor(){
  const links = document.querySelectorAll('.video-section .video-wrapper a[href]');
  links.forEach(a=>{
    const text = a.textContent.trim();
    try {
      const u = new URL(a.href, location.origin);
      if(/youtube\.com|youtu\.be/.test(u.hostname)){
        if(!a.getAttribute('aria-label')){
          a.setAttribute('aria-label', text + ' (opens on YouTube)');
        }
        // Optional: hint external
        a.setAttribute('rel','noopener');
      }
    } catch(_) {}
  });
}