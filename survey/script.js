
  /* ─── state ──────────────────────────────────────── */
  let rCur = 1;
  let starOv = 0;
  let radioVal = '';
  let anonR = false, anonQ = false;

  /* ─── tab switch ────────────────────────────────── */
  const titles = {
    review:  ['Student Review',  'Tell us what is working well and what we should improve.'],
    request: ['Student Request', 'Need help, support, or a course update? Send your request here.']
  };
  function switchTab(tab) {
    const isReview = tab === 'review';
    document.getElementById('panel-review').style.display  = isReview ? '' : 'none';
    document.getElementById('panel-request').style.display = isReview ? 'none' : '';
    document.getElementById('tab-review').classList.toggle('inactive',  !isReview);
    document.getElementById('tab-request').classList.toggle('inactive', isReview);
    document.getElementById('page-title').textContent = titles[tab][0];
    document.getElementById('page-sub').textContent   = titles[tab][1];
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ─── radio (student yes/no) ─────────────────────── */
  function pickRadio(val) {
    radioVal = val;
    document.getElementById('ro-yes').classList.toggle('on', val === 'yes');
    document.getElementById('ro-no').classList.toggle('on',  val === 'no');
  }

  /* ─── emoji ─────────────────────────────────────── */
  function emo(el, gid) {
    document.querySelectorAll(`#${gid} .emo`).forEach(e => e.classList.remove('on'));
    el.classList.add('on');
  }

  /* ─── stars ─────────────────────────────────────── */
  function setStars(n, gid, key) {
    if (key === 'ov') starOv = n;
    document.querySelectorAll(`#${gid} .star`).forEach((s, i) => s.classList.toggle('on', i < n));
  }

  /* ─── chips ─────────────────────────────────────── */
  function chip(el, gid) {
    document.querySelectorAll(`#${gid} .chip`).forEach(c => c.classList.remove('on'));
    el.classList.add('on');
  }

  /* ─── anonymous toggle ───────────────────────────── */
  function toggleAnon(key) {
    if (key === 'r') {
      anonR = !anonR;
      document.getElementById('anon-r').classList.toggle('on', anonR);
      const inp = document.getElementById('r-name');
      inp.disabled = anonR; inp.value = anonR ? '' : inp.value;
      inp.placeholder = anonR ? 'Anonymous 🎭' : 'Anonymous';
    } else {
      anonQ = !anonQ;
      document.getElementById('anon-q').classList.toggle('on', anonQ);
      const inp = document.getElementById('req-name');
      inp.disabled = anonQ; inp.value = anonQ ? '' : inp.value;
      inp.placeholder = anonQ ? 'Anonymous 🎭' : 'Anonymous';
    }
  }

  /* ─── review steps ───────────────────────────────── */
  function rNext(from) {
    if (!rValidate(from)) return;
    rGo(from, from + 1);
  }
  function rPrev(from) { rGo(from, from - 1); }

  function rGo(from, to) {
    document.getElementById(`rs${from}`).classList.remove('active');
    document.getElementById(`rs${to}`).classList.add('active');
    rCur = to;
    updateDots();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateDots() {
    for (let i = 1; i <= 4; i++) {
      const d = document.getElementById(`rd${i}`);
      d.className = 'dot' + (i < rCur ? ' done' : i === rCur ? ' active' : '');
    }
  }

  function rValidate(step) {
    if (step === 1) {
      if (!radioVal)                                    { showAlert('Are you a student? Yes or No! 😄'); return false; }
      if (!document.getElementById('r-course').value)  { showAlert('Please select a course! 📚'); return false; }
      if (!document.getElementById('r-teacher').value.trim()) { showAlert('Enter your teacher\'s name! 👩‍🏫'); return false; }
    }
    if (step === 2) {
      if (!document.querySelector('#e-fun .emo.on'))   { showAlert('How engaging was it? Pick an emoji! 🎮'); return false; }
      if (!document.querySelector('#e-clear .emo.on')) { showAlert('How clear were the lessons? Pick an emoji! 🧠'); return false; }
    }
    if (step === 3) {
      if (!document.querySelector('#e-exp .emo.on'))   { showAlert('Rate your teacher\'s explanations! 💬'); return false; }
      if (starOv === 0)                                 { showAlert('Give an overall star rating! ⭐'); return false; }
    }
    return true;
  }

  /* ─── submit review ──────────────────────────────── */
  function submitReview() {
    const btn = document.getElementById('btn-r-submit');
    btn.disabled = true; btn.textContent = 'Sending…';

    const payload = {
      student:     radioVal,
      course:      document.getElementById('r-course').value,
      teacher:     document.getElementById('r-teacher').value,
      q_fun:       document.querySelector('#e-fun .emo.on')?.dataset.v   || '',
      q_clarity:   document.querySelector('#e-clear .emo.on')?.dataset.v || '',
      q_diff:      document.querySelector('#c-diff .chip.on')?.dataset.v || '',
      q_explain:   document.querySelector('#e-exp .emo.on')?.dataset.v   || '',
      stars:       starOv,
      liked:       document.getElementById('r-liked').value,
      improve:     document.getElementById('r-improve').value,
      name:        anonR ? 'Anonymous' : (document.getElementById('r-name').value.trim() || 'Anonymous'),
      anonymous:   anonR,
      timestamp:   new Date().toISOString()
    };

    /* ── Replace with your Apps Script URL ── */
    const URL = 'https://script.google.com/macros/s/AKfycbwakDhtVobrH4NzBMy66dM0zsfVqSKH4YiOVTHRiq3vcHQJRf2GJ_f7dDD7jXKq1Xxn/exec';
    postJsonToAppsScript(URL, payload)
      .then(() => {
        document.getElementById('rs4').classList.remove('active');
        document.getElementById('r-success').classList.add('show');
        for (let i=1;i<=4;i++) document.getElementById(`rd${i}`).className = 'dot done';
      })
      .catch(() => {
        document.getElementById('rs4').classList.remove('active');
        document.getElementById('r-success').classList.add('show');
      });
  }

  function resetReview() {
    // reset all state
    radioVal = ''; starOv = 0; anonR = false; rCur = 1;
    document.getElementById('ro-yes').classList.remove('on');
    document.getElementById('ro-no').classList.remove('on');
    document.getElementById('r-course').value = '';
    document.getElementById('r-teacher').value = '';
    document.getElementById('r-liked').value = '';
    document.getElementById('r-improve').value = '';
    document.getElementById('r-name').value = '';
    document.getElementById('r-name').disabled = false;
    document.getElementById('anon-r').classList.remove('on');
    document.querySelectorAll('.emo.on, .star.on, .chip.on').forEach(e => e.classList.remove('on'));
    document.getElementById('r-success').classList.remove('show');
    document.getElementById('rs1').classList.add('active');
    document.getElementById('btn-r-submit').disabled = false;
    document.getElementById('btn-r-submit').textContent = 'Submit Review';
    updateDots();
  }

  /* ─── submit request ─────────────────────────────── */
  function submitRequest() {
    const type = document.getElementById('req-type').value;
    const msg  = document.getElementById('req-msg').value.trim();
    if (!type) { showAlert('Please choose a request type! 📋'); return; }
    if (!msg)  { showAlert('Please write your message! ✏️'); return; }

    const btn = document.getElementById('btn-q-submit');
    btn.disabled = true; btn.textContent = 'Sending…';

    const payload = {
      type:      type,
      message:   msg,
      name:      anonQ ? 'Anonymous' : (document.getElementById('req-name').value.trim() || 'Anonymous'),
      anonymous: anonQ,
      contact:   document.getElementById('req-contact').value.trim(),
      timestamp: new Date().toISOString()
    };

    /* ── Replace with your Apps Script URL ── */
    const URL = 'https://script.google.com/macros/s/AKfycbwakDhtVobrH4NzBMy66dM0zsfVqSKH4YiOVTHRiq3vcHQJRf2GJ_f7dDD7jXKq1Xxn/exec';
    postJsonToAppsScript(URL, payload)
      .then(showReqDone).catch(showReqDone);
  }

  function postJsonToAppsScript(url, payload) {
    return fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });
  }

  function showAlert(message) {
    if (window.Swal) {
      return Swal.fire({
        icon: 'warning',
        title: 'Please check this',
        text: message,
        confirmButtonText: 'OK'
      });
    }

    alert(message);
  }

  function showReqDone() {
    document.getElementById('req-form').style.display = 'none';
    document.getElementById('q-success').classList.add('show');
  }

  function resetRequest() {
    anonQ = false;
    document.getElementById('req-type').value = '';
    document.getElementById('req-msg').value = '';
    document.getElementById('req-name').value = '';
    document.getElementById('req-name').disabled = false;
    document.getElementById('req-contact').value = '';
    document.getElementById('anon-q').classList.remove('on');
    document.getElementById('cc').textContent = '0';
    document.getElementById('req-form').style.display = '';
    document.getElementById('q-success').classList.remove('show');
    document.getElementById('btn-q-submit').disabled = false;
    document.getElementById('btn-q-submit').textContent = 'Send Request';
  }

  /* ─── navbar ─────────────────────────────────────── */
  document.getElementById('navbarToggle')?.addEventListener('click', function() {
    this.classList.toggle('active');
    document.getElementById('navbarNav').classList.toggle('active');
    document.body.classList.toggle('nav-open');
  });
