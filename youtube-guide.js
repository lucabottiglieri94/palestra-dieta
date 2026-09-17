/* ICON RECOMP - YouTube exercise guide integration */
(function () {
  const API_BASE = 'https://palestra-ai-backend.vercel.app/api/youtube-search';
  let wrapped = false;

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>\"']/g, ch => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', "'": '&#39;'
    }[ch]));
  }

  function getVideoId(item) {
    return item?.id?.videoId || item?.videoId || item?.id || '';
  }

  function wrapGuide() {
    if (wrapped || typeof window.openExerciseGuide !== 'function') return;
    const original = window.openExerciseGuide;

    window.openExerciseGuide = async function (dayKey, exId) {
      original(dayKey, exId);

      const modal = document.getElementById('exerciseGuideModal');
      const graphic = document.getElementById('guideGraphicContainer');
      const title = document.getElementById('guideModalTitle')?.innerText || 'Esercizio';
      if (!modal || !graphic) return;

      graphic.innerHTML = `
        <div class="w-full rounded-2xl bg-black/40 border border-red-500/20 p-5 flex flex-col items-center justify-center gap-3 min-h-[230px]">
          <div class="w-8 h-8 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
          <span class="text-xs text-gray-300 font-semibold">Ricerca video YouTube in corso...</span>
        </div>`;

      try {
        const response = await fetch(`${API_BASE}?exercise=${encodeURIComponent(title)}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        const item = data?.items?.[0] || data?.videos?.[0] || data?.results?.[0];
        const videoId = getVideoId(item);

        if (!videoId) {
          graphic.innerHTML = `
            <div class="w-full min-h-[230px] flex flex-col items-center justify-center gap-3 text-center p-5">
              <span class="text-4xl">📺</span>
              <p class="text-sm text-gray-300">Video non trovato per questo esercizio.</p>
              <a class="text-xs text-red-300 underline" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${encodeURIComponent(title + ' esecuzione corretta')}">Cerca su YouTube</a>
            </div>`;
          return;
        }

        const videoTitle = item?.snippet?.title || item?.title || title;
        graphic.innerHTML = `
          <div class="w-full space-y-3">
            <div class="relative w-full overflow-hidden rounded-2xl bg-black shadow-2xl border border-white/10" style="aspect-ratio:16/10;">
              <iframe
                class="absolute inset-0 w-full h-full"
                src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0&modestbranding=1"
                title="${escapeHtml(videoTitle)}"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe>
            </div>
            <div class="flex items-center justify-between gap-2 text-[11px]">
              <span class="text-red-300 font-bold">▶ Video tecnica esercizio</span>
              <a href="https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}" target="_blank" rel="noopener" class="text-gray-400 underline">Apri su YouTube</a>
            </div>
          </div>`;
      } catch (error) {
        console.warn('YouTube guide error:', error);
        graphic.innerHTML = `
          <div class="w-full min-h-[230px] flex flex-col items-center justify-center gap-3 text-center p-5">
            <span class="text-3xl">⚠️</span>
            <p class="text-sm text-gray-300">Impossibile caricare il video in questo momento.</p>
            <a class="text-xs text-red-300 underline" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${encodeURIComponent(title + ' esecuzione corretta')}">Cerca manualmente su YouTube</a>
          </div>`;
      }
    };

    wrapped = true;
  }

  const timer = setInterval(() => {
    wrapGuide();
    if (wrapped) clearInterval(timer);
  }, 250);
})();
