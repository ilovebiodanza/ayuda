/* Reproductor de la animación de registro guiado por audio.
   Cada segmento espera a que termine su MP3 antes de avanzar. */
(function () {
  'use strict';

  const root = document.querySelector('[data-audio-demo]');
  if (!root) return;

  const manifestUrl = root.dataset.manifest || 'registration.manifest.json';
  const rate = Number(root.dataset.rate || 0.9);
  const gate = root.querySelector('[data-audio-gate]');
  const playButton = root.querySelector('[data-play-audio]');
  const replay = document.querySelector('[data-replay]') ||
    (root.parentElement && root.parentElement.querySelector('[data-replay]'));
  const caption = root.querySelector('[data-caption]');
  const progress = root.querySelector('[data-progress]');
  const cursor = root.querySelector('[data-cursor]');
  const chapterMode = root.dataset.chapterMode === 'true';
  const chapterMenu =
    root.querySelector('[data-chapter-menu]') ||
    document.querySelector('[data-chapter-menu]');
  const continueButton =
    root.querySelector('[data-continue-chapter]') ||
    document.querySelector('[data-continue-chapter]');
  const chapterStatus =
    root.querySelector('[data-chapter-status]') ||
    document.querySelector('[data-chapter-status]');
  const audio = new Audio();
  audio.preload = 'auto';
  audio.playbackRate = rate;
  audio.preservesPitch = true;

  let manifest = null;
  let audioDirectory = 'audio/registration/';
  let index = 0;
  let completedSeconds = 0;
  let playing = false;
  let holdTimer = null;

  function screen(name) {
    root.querySelectorAll('[data-screen]').forEach(element => {
      element.classList.toggle('is-active', element.dataset.screen === name);
    });
  }

  function setCaption(text) {
    if (!caption) return;
    caption.innerHTML = text || '';
    caption.classList.toggle('is-visible', Boolean(text));
  }

  function chapterOf(segment) {
    return (segment && segment.chapter) || 'chapter-1';
  }

  function chapterMeta(chapterId) {
    const list = (manifest && manifest.chapters) || [];
    return list.find(chapter => chapter.id === chapterId) || null;
  }

  function chapterIndexForSegment(segmentIndex) {
    const segment = manifest && manifest.segments[segmentIndex];
    if (!segment) return -1;
    return ((manifest && manifest.chapters) || []).findIndex(
      chapter => chapter.id === chapterOf(segment),
    );
  }

  function updateChapterMenu() {
    if (!chapterMenu || !manifest) return;
    const active = chapterIndexForSegment(index);
    chapterMenu.querySelectorAll('[data-chapter-index]').forEach(button => {
      const value = Number(button.dataset.chapterIndex);
      button.classList.toggle('is-active', value === active);
    });
    if (chapterStatus) {
      const chapter = chapterMeta(chapterOf(manifest.segments[index]));
      if (chapter) {
        chapterStatus.textContent = `Capítulo ${chapter.number} de ${manifest.chapters.length} · ${chapter.title}`;
      }
    }
  }

  function showChapterContinue(nextIndex) {
    if (!continueButton) return;
    const next = manifest.segments[nextIndex];
    const chapter = chapterMeta(chapterOf(next));
    continueButton.textContent = `Continuar con el capítulo ${chapter ? chapter.number : nextIndex + 1}`;
    continueButton.hidden = false;
    updateChapterMenu();
  }

  function playChapter(chapterIndex) {
    if (!manifest || !manifest.chapters) return;
    const chapter = manifest.chapters[chapterIndex];
    if (!chapter) return;
    const first = manifest.segments.findIndex(segment => chapterOf(segment) === chapter.id);
    if (first < 0) return;
    if (holdTimer) clearTimeout(holdTimer);
    holdTimer = null;
    completedSeconds = manifest.segments
      .slice(0, first)
      .reduce((sum, segment) => sum + Number(segment.durationSeconds || 0), 0);
    index = first;
    playing = true;
    resetFocus();
    if (gate) gate.hidden = true;
    if (continueButton) continueButton.hidden = true;
    if (replay) replay.hidden = true;
    updateChapterMenu();
    playSegment();
  }

  function focus(selector) {
    root.querySelectorAll('.demo-input.is-focus').forEach(element => {
      element.classList.remove('is-focus');
    });
    const target = root.querySelector(selector);
    const input = target && target.closest('.demo-input');
    if (input) input.classList.add('is-focus');
    moveTo(selector);
    return target;
  }

  function moveTo(selector) {
    if (!cursor) return;
    const target = root.querySelector(selector);
    if (!target) return;
    const stage = root.getBoundingClientRect();
    const box = target.getBoundingClientRect();
    cursor.style.left = `${box.left - stage.left + box.width / 2}px`;
    cursor.style.top = `${box.top - stage.top + box.height / 2}px`;
  }

  function click(selector) {
    const target = focus(selector);
    if (!target) return;
    target.classList.add('is-clicked');
    if (cursor) cursor.classList.add('is-clicking');
    setTimeout(() => {
      target.classList.remove('is-clicked');
      if (cursor) cursor.classList.remove('is-clicking');
    }, 420);
  }

  function resetFocus() {
    root.querySelectorAll('.demo-input.is-focus').forEach(element => {
      element.classList.remove('is-focus');
    });
  }

  function type(selector, text, duration = 900) {
    const target = focus(selector);
    if (!target) return;
    target.textContent = '';
    const characters = [...String(text)];
    const interval = Math.max(35, duration / Math.max(1, characters.length));
    let position = 0;
    const timer = setInterval(() => {
      target.textContent += characters[position] || '';
      position += 1;
      if (position >= characters.length) clearInterval(timer);
    }, interval);
  }

  function runActions(actions = []) {
    actions.forEach(action => {
      const [name, selector] = String(action).split(':');
      if (name === 'show') screen(selector);
      if (name === 'focus') focus(selector);
      if (name === 'click') click(selector);
    });
  }

  function setSegment(segment) {
    screen(segment.scene);
    setCaption(segment.caption);
    runActions(segment.onStart);
    if (segment.type) {
      setTimeout(
        () => type(segment.type.selector, segment.type.text, 900),
        280,
      );
    }
    (segment.typing || []).forEach((item, position) => {
      setTimeout(() => type(item.selector, item.text, 650), 280 + position * 620);
    });
  }

  function updateProgress() {
    if (!progress || !manifest) return;
    const total = manifest.segments.reduce(
      (sum, segment) => sum + Number(segment.durationSeconds || 0),
      0,
    );
    const current = Math.min(audio.currentTime || 0, audio.duration || 0);
    const percent = total ? ((completedSeconds + current) / total) * 100 : 0;
    progress.style.width = `${Math.min(100, percent)}%`;
  }

  function finishAnimation() {
    playing = false;
    const last = manifest.segments[manifest.segments.length - 1];
    setCaption(
      manifest.completionCaption ||
        (last && last.caption) ||
        'Animación completada.',
    );
    if (continueButton) continueButton.hidden = true;
    if (replay) replay.hidden = false;
    updateChapterMenu();
  }

  function advanceSegment() {
    if (index + 1 >= manifest.segments.length) {
      finishAnimation();
      return;
    }
    index += 1;
    playSegment();
  }

  function nextSegment() {
    if (!manifest) return;
    const previous = manifest.segments[index];
    if (previous) runActions(previous.onEnd);
    completedSeconds += Number(previous && previous.durationSeconds) || 0;
    const hold = Number(previous && previous.holdAfterSeconds) || 0;
    const go = () => {
      if (
        chapterMode &&
        index + 1 < manifest.segments.length &&
        chapterOf(manifest.segments[index]) !==
          chapterOf(manifest.segments[index + 1])
      ) {
        index += 1;
        playing = false;
        const finished = chapterMeta(chapterOf(previous));
        setCaption(
          `Capítulo ${finished ? finished.number : ''} completado. Pulsa continuar cuando quieras seguir.`,
        );
        showChapterContinue(index);
        return;
      }
      advanceSegment();
    };
    if (holdTimer) clearTimeout(holdTimer);
    if (hold > 0) {
      holdTimer = setTimeout(go, hold * 1000);
    } else {
      go();
    }
  }

  function playSegment() {
    const segment = manifest.segments[index];
    if (!segment) return;
    setSegment(segment);
    audio.src = `${audioDirectory}${segment.audio}`;
    audio.playbackRate = rate;
    const promise = audio.play();
    if (promise && typeof promise.catch === 'function') {
      promise.catch(() => {
        playing = false;
        setCaption('No se pudo reproducir el audio. Pulsa Repetir para intentarlo de nuevo.');
      });
    }
  }

  function start() {
    if (!manifest || playing) return;
    if (holdTimer) clearTimeout(holdTimer);
    holdTimer = null;
    playing = true;
    index = 0;
    completedSeconds = 0;
    resetFocus();
    if (gate) gate.hidden = true;
    if (continueButton) continueButton.hidden = true;
    updateChapterMenu();
    playSegment();
  }

  function load() {
    fetch(manifestUrl)
      .then(response => {
        if (!response.ok) throw new Error('No se pudo cargar el manifiesto');
        return response.json();
      })
      .then(data => {
        manifest = data;
        audioDirectory = String(
          (data.audio && data.audio.directory) || 'audio/registration/',
        ).replace(/\/?$/, '/');
        screen((data.segments && data.segments[0] && data.segments[0].scene) || 'signup');
        renderChapterMenu();
        setCaption('Pulsa reproducir para ver la animación con audio.');
        if (playButton) playButton.disabled = false;
      })
      .catch(() => {
        setCaption('No se pudo cargar la guía de audio.');
        if (playButton) playButton.disabled = true;
      });
  }

  function renderChapterMenu() {
    if (!chapterMenu || !manifest || !manifest.chapters) return;
    chapterMenu.innerHTML = manifest.chapters
      .map(
        (chapter, position) =>
          `<button type="button" class="editor-chapter-button" data-chapter-index="${position}">${chapter.number}. ${chapter.title}</button>`,
      )
      .join('');
    chapterMenu.querySelectorAll('[data-chapter-index]').forEach(button => {
      button.addEventListener('click', () => {
        playChapter(Number(button.dataset.chapterIndex));
      });
    });
    updateChapterMenu();
  }

  audio.addEventListener('ended', nextSegment);
  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('loadedmetadata', updateProgress);
  if (playButton) playButton.addEventListener('click', start);
  if (continueButton) {
    continueButton.hidden = true;
    continueButton.addEventListener('click', () => {
      if (!manifest || playing) return;
      if (index >= manifest.segments.length) return;
      continueButton.hidden = true;
      playing = true;
      playSegment();
    });
  }
  if (replay) {
    replay.hidden = true;
    replay.addEventListener('click', () => {
      replay.hidden = true;
      start();
    });
  }
  load();
})();
