// Default fallback contributors if fetch fails (e.g. opened directly via file://)
const DEFAULT_CONTRIBUTORS = [
  {
    name: "Ichsan Wahyu (ichsannnwp)",
    role: "Project Maintainer",
    github: "ichsannnwp",
    badge: "Host",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    quote: "Selamat datang di repository latihan Git! Silakan clone, modifikasi, dan bagikan via Live Share."
  },
  {
    name: "Git Explorer",
    role: "First Contributor",
    github: "octocat",
    badge: "Learner",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
    quote: "Latihan git clone pertama kali berhasil dengan lancar!"
  }
];

// Load and render contributors
async function loadContributors() {
  const container = document.getElementById('contributorsGrid');
  const countBadge = document.getElementById('contributorCount');
  
  let contributors = DEFAULT_CONTRIBUTORS;

  try {
    const response = await fetch('contributors.json');
    if (response.ok) {
      contributors = await response.json();
    }
  } catch (err) {
    console.warn("Fetch fallback used (normal if opened directly via file://):", err);
  }

  if (countBadge) {
    countBadge.textContent = `${contributors.length} Orang`;
  }

  if (container) {
    container.innerHTML = contributors.map(person => `
      <div class="glass-panel-card p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none group-hover:bg-indigo-500/20 transition-all"></div>
        
        <div>
          <div class="flex items-center space-x-3 mb-4">
            <img src="${person.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}" 
                 alt="${person.name}" 
                 class="w-12 h-12 rounded-full object-cover border-2 border-indigo-400/40"
                 onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=6366f1&color=fff'" />
            <div>
              <h4 class="font-bold text-white text-base leading-tight">${person.name}</h4>
              <p class="text-xs text-indigo-300 font-medium">${person.role || 'Contributor'}</p>
            </div>
          </div>
          
          <p class="text-slate-300 text-sm italic mb-4">
            "${person.quote || 'Halo dari Git cloning practice!'}"
          </p>
        </div>

        <div class="flex items-center justify-between pt-3 border-t border-slate-700/50 mt-auto">
          <span class="text-xs px-2.5 py-1 rounded-full font-semibold ${
            person.badge === 'Host' 
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
              : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
          }">
            <i class="fa-solid fa-tag mr-1 text-[10px]"></i> ${person.badge || 'Contributor'}
          </span>
          ${person.github ? `
            <a href="https://github.com/${person.github}" target="_blank" rel="noopener noreferrer" 
               class="text-xs text-slate-400 hover:text-white flex items-center space-x-1 transition-colors">
              <i class="fa-brands fa-github"></i>
              <span>@${person.github}</span>
            </a>
          ` : ''}
        </div>
      </div>
    `).join('');
  }
}

// Copy to clipboard utility
function copyCommand(text, buttonElement) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Disalin: ${text}`);
    if (buttonElement) {
      const originalHtml = buttonElement.innerHTML;
      buttonElement.innerHTML = `<i class="fa-solid fa-check text-green-400"></i> Disalin!`;
      setTimeout(() => {
        buttonElement.innerHTML = originalHtml;
      }, 1800);
    }
  }).catch(err => {
    showToast("Gagal menyalin perintah", true);
  });
}

// Toast notification
function showToast(message, isError = false) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  const toastIcon = document.getElementById('toastIcon');
  
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  if (isError) {
    toastIcon.className = "fa-solid fa-circle-exclamation text-rose-400";
    toast.className = toast.className.replace(/border-[a-z]+-[0-9]+/g, 'border-rose-500/50');
  } else {
    toastIcon.className = "fa-solid fa-circle-check text-emerald-400";
    toast.className = toast.className.replace(/border-[a-z]+-[0-9]+/g, 'border-emerald-500/50');
  }

  toast.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
  toast.classList.add('translate-y-0', 'opacity-100');

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 2500);
}

// Interactive checklist persistence
function initChecklist() {
  const checkboxes = document.querySelectorAll('.task-check');
  const progressText = document.getElementById('checklistProgress');
  const progressBar = document.getElementById('checklistProgressBar');

  const updateProgress = () => {
    const total = checkboxes.length;
    let completed = 0;
    checkboxes.forEach((cb, idx) => {
      const isChecked = localStorage.getItem(`git_task_${idx}`) === 'true';
      cb.checked = isChecked;
      if (isChecked) completed++;
    });

    const percent = Math.round((completed / total) * 100);
    if (progressText) progressText.textContent = `${completed}/${total} Selesai (${percent}%)`;
    if (progressBar) progressBar.style.width = `${percent}%`;
  };

  checkboxes.forEach((cb, idx) => {
    cb.addEventListener('change', () => {
      localStorage.setItem(`git_task_${idx}`, cb.checked);
      updateProgress();
      if (cb.checked) {
        showToast("Langkah berhasil diselesaikan! 🎯");
      }
    });
  });

  updateProgress();
}

// Running clock / uptime
function startClock() {
  const clockElement = document.getElementById('liveClock');
  if (!clockElement) return;

  const update = () => {
    const now = new Date();
    clockElement.textContent = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };
  update();
  setInterval(update, 1000);
}

// Detect connection info (Port & Host)
function detectConnection() {
  const hostInfo = document.getElementById('hostInfo');
  if (hostInfo) {
    const protocol = window.location.protocol;
    const host = window.location.host;
    if (protocol.startsWith('http')) {
      hostInfo.textContent = `${window.location.origin}`;
    } else {
      hostInfo.textContent = "Dibuka via File (Local Preview)";
    }
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  loadContributors();
  initChecklist();
  startClock();
  detectConnection();
});
