// ===== Model satu tugas =====
class TaskItem {
  constructor({ id = Date.now() + Math.random(), title, course = 'Umum', deadline = '', priority = 'sedang', completed = false }) {
    this.id = id;
    this.title = title;
    this.course = course;
    this.deadline = deadline;
    this.priority = priority;
    this.completed = completed;
  }

  isOverdue() {
    if (!this.deadline || this.completed) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(`${this.deadline}T00:00:00`) < today;
  }

  toggle() {
    return new TaskItem({ ...this, completed: !this.completed });
  }
}

// ===== Pengelola dashboard =====
class DashboardApp {
  constructor() {
    this.STORAGE_KEY = 'studyboard-tasks';
    this.tasks = [];
    this.filter = 'all';
    this.keyword = '';
    this.listEl = document.querySelector('#task-list');
    this.form = document.querySelector('#task-form');
    this.clockEl = document.querySelector('#clock');
    this.dateEl = document.querySelector('#date-label');
    this.quoteTextEl = document.querySelector('#quote-text');
    this.quoteAuthorEl = document.querySelector('#quote-author');
    this.statusEl = document.querySelector('#list-status');
    this.editingId = null;
    this.formatDate = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    this.formatLongDate = new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }

  async init() {
    this.loadFromStorage();
    this.render();
    this.bindEvents();
    this.startClock();
    this.fetchWeather();
    this.fetchQuote();
    if (this.tasks.length === 0) {
      this.fetchInitialTasks().then(() => this.render());
    }
  }

  loadFromStorage() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      const data = raw ? JSON.parse(raw) : [];
      this.tasks = Array.isArray(data) ? data.map((item) => new TaskItem(item)) : [];
    } catch (error) {
      console.info('Data tugas lokal tidak dapat dibaca:', error);
      this.tasks = [];
      this.statusEl.textContent = 'Data tersimpan tidak dapat dibaca. Contoh tugas dimuat kembali.';
    }
  }

  saveToStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks));
  }

  async fetchInitialTasks() {
    this.statusEl.textContent = 'Memuat contoh tugas…';
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5', { signal: AbortSignal.timeout(8000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const todos = await response.json();
      if (this.tasks.length > 0) {
        this.statusEl.textContent = '';
        return;
      }
      const courses = ['Pemrograman Web', 'Basis Data', 'Matematika Diskrit', 'Jaringan Komputer', 'Sistem Operasi'];
      this.tasks = todos.map(({ id, title, completed }, index) => new TaskItem({
        id,
        title: title.charAt(0).toUpperCase() + title.slice(1),
        course: courses[index % courses.length],
        deadline: this.dateAfter(index + 1),
        priority: index === 0 ? 'tinggi' : 'sedang',
        completed,
      }));
      this.saveToStorage();
      this.statusEl.textContent = '';
    } catch (error) {
      console.info('Gagal memuat tugas awal:', error);
      this.statusEl.textContent = 'Contoh tugas gagal dimuat. Kamu tetap bisa menambahkan tugas sendiri.';
    }
  }

  async fetchWeather() {
    const tempEl = document.querySelector('#weather-temp');
    const conditionEl = document.querySelector('#weather-condition');
    const windEl = document.querySelector('#weather-wind');
    try {
      const url = 'https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current=temperature_2m,wind_speed_10m,weather_code&timezone=Asia%2FJakarta';
      const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const { current } = await response.json();
      tempEl.textContent = `${Math.round(current.temperature_2m)}°`;
      conditionEl.textContent = this.weatherDescription(current.weather_code);
      windEl.textContent = `${Math.round(current.wind_speed_10m)} km/jam`;
      document.querySelector('#weather-icon').textContent = this.weatherIcon(current.weather_code);
    } catch (error) {
      console.info('Gagal memuat cuaca:', error);
      tempEl.textContent = '—';
      conditionEl.textContent = 'Cuaca tidak tersedia';
      windEl.textContent = '—';
    }
  }

  async fetchQuote() {
    try {
      const response = await fetch('https://dummyjson.com/quotes/random', { signal: AbortSignal.timeout(8000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const { quote, author } = await response.json();
      this.quoteTextEl.textContent = quote;
      this.quoteAuthorEl.textContent = `— ${author}`;
    } catch (error) {
      console.info('Gagal memuat kutipan:', error);
      this.quoteTextEl.textContent = 'Sedikit demi sedikit, lama-lama menjadi bukit.';
      this.quoteAuthorEl.textContent = '— Semangat belajar';
    }
  }

  addTask(data) {
    this.tasks = [...this.tasks, new TaskItem(data)];
    this.commit();
  }

  updateTask(id, changes) {
    this.tasks = this.tasks.map((task) => task.id === id ? new TaskItem({ ...task, ...changes }) : task);
    this.commit();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.commit();
  }

  toggleTask(id) {
    const task = this.tasks.find((item) => item.id === id);
    if (task) this.updateTask(id, { completed: !task.completed });
  }

  commit() {
    this.saveToStorage();
    this.render();
  }

  getFilteredTasks() {
    return this.tasks.filter((task) => {
      const matchesFilter = this.filter === 'all' || (this.filter === 'active' && !task.completed) || (this.filter === 'done' && task.completed);
      const searchable = `${task.title} ${task.course} ${task.priority}`.toLocaleLowerCase('id-ID');
      return matchesFilter && searchable.includes(this.keyword);
    }).sort((first, second) => {
      if (first.completed !== second.completed) return Number(first.completed) - Number(second.completed);
      if (!first.deadline) return 1;
      if (!second.deadline) return -1;
      return first.deadline.localeCompare(second.deadline);
    });
  }

  render() {
    const tasks = this.getFilteredTasks();
    const activeCount = this.tasks.filter((task) => !task.completed).length;
    const doneCount = this.tasks.length - activeCount;
    const dueCount = this.tasks.filter((task) => {
      if (!task.deadline || task.completed) return false;
      const distance = Math.round((new Date(`${task.deadline}T00:00:00`) - new Date(new Date().toDateString())) / 86400000);
      return distance >= 0 && distance <= 3;
    }).length;

    document.querySelector('#stat-total').textContent = this.tasks.length;
    document.querySelector('#stat-active').textContent = activeCount;
    document.querySelector('#stat-done').textContent = doneCount;
    document.querySelector('#stat-due').textContent = dueCount;
    document.querySelector('#task-count').textContent = `${this.tasks.length} tugas`;

    this.listEl.innerHTML = tasks.length ? tasks.map((task) => {
      const deadlineText = task.deadline ? this.formatDate.format(new Date(`${task.deadline}T00:00:00`)) : 'Tanpa tenggat';
      const overdueClass = task.isOverdue() ? ' overdue' : '';
      const overdueLabel = task.isOverdue() ? ' · Terlambat' : '';
      return `<li class="task-item ${task.completed ? 'done' : ''}" data-id="${task.id}">
        <input class="task-check" type="checkbox" data-action="toggle" aria-label="Tandai ${this.escapeHtml(task.title)} selesai" ${task.completed ? 'checked' : ''} />
        <div class="task-content"><strong class="task-name">${this.escapeHtml(task.title)}</strong>
          <div class="task-meta"><span class="course-tag">${this.escapeHtml(task.course)}</span><span class="priority priority-${task.priority}">${task.priority}</span><span class="task-deadline${overdueClass}">${deadlineText}${overdueLabel}</span></div>
        </div>
        <div class="task-actions"><button class="icon-button" type="button" data-action="edit" aria-label="Edit ${this.escapeHtml(task.title)}" title="Edit">✎</button><button class="icon-button delete" type="button" data-action="delete" aria-label="Hapus ${this.escapeHtml(task.title)}" title="Hapus">×</button></div>
      </li>`;
    }).join('') : `<li class="empty-state"><span class="empty-art">✦</span><strong>${this.keyword ? 'Tugas tidak ditemukan' : 'Belum ada tugas di sini'}</strong><span>${this.keyword ? 'Coba kata kunci yang lain.' : 'Tambahkan tugas baru untuk mulai menyusun rencanamu.'}</span></li>`;
  }

  bindEvents() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = document.querySelector('#task-title').value.trim();
      const titleError = document.querySelector('#title-error');
      if (!title) {
        titleError.textContent = 'Nama tugas wajib diisi.';
        document.querySelector('#task-title').focus();
        return;
      }
      titleError.textContent = '';
      const data = {
        title,
        course: document.querySelector('#task-course').value.trim() || 'Umum',
        deadline: document.querySelector('#task-deadline').value,
        priority: document.querySelector('#task-priority').value,
      };
      if (this.editingId !== null) this.updateTask(this.editingId, data);
      else this.addTask(data);
      this.resetForm();
    });

    document.querySelector('#task-title').addEventListener('input', () => {
      document.querySelector('#title-error').textContent = '';
    });

    this.listEl.addEventListener('click', (event) => {
      const button = event.target.closest('[data-action]');
      if (!button) return;
      const taskElement = button.closest('[data-id]');
      const id = Number(taskElement.dataset.id);
      if (button.dataset.action === 'edit') this.beginEdit(id);
      if (button.dataset.action === 'delete') {
        const task = this.tasks.find((item) => item.id === id);
        if (task && window.confirm(`Hapus tugas “${task.title}”?`)) {
          this.deleteTask(id);
          if (this.editingId === id) this.resetForm();
        }
      }
    });

    this.listEl.addEventListener('change', (event) => {
      const checkbox = event.target.closest('[data-action="toggle"]');
      if (checkbox) this.toggleTask(Number(checkbox.closest('[data-id]').dataset.id));
    });

    document.querySelectorAll('[data-filter]').forEach((button) => {
      button.addEventListener('click', () => {
        this.filter = button.dataset.filter;
        document.querySelectorAll('[data-filter]').forEach((item) => item.classList.toggle('active', item === button));
        this.render();
      });
    });

    document.querySelector('#search-input').addEventListener('input', (event) => {
      this.keyword = event.target.value.trim().toLocaleLowerCase('id-ID');
      this.render();
    });

    document.querySelector('#cancel-edit').addEventListener('click', () => this.resetForm());
  }

  beginEdit(id) {
    const task = this.tasks.find((item) => item.id === id);
    if (!task) return;
    this.editingId = id;
    document.querySelector('#task-id').value = id;
    document.querySelector('#task-title').value = task.title;
    document.querySelector('#task-course').value = task.course;
    document.querySelector('#task-deadline').value = task.deadline;
    document.querySelector('#task-priority').value = task.priority;
    document.querySelector('#form-heading').textContent = 'Edit tugas';
    document.querySelector('#save-button').innerHTML = '<span>✓</span> Perbarui tugas';
    document.querySelector('#cancel-edit').hidden = false;
    document.querySelector('#task-title').focus();
    document.querySelector('#form-heading').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  resetForm() {
    this.form.reset();
    this.editingId = null;
    document.querySelector('#task-id').value = '';
    document.querySelector('#form-heading').textContent = 'Tugas baru';
    document.querySelector('#save-button').innerHTML = '<span>＋</span> Simpan tugas';
    document.querySelector('#cancel-edit').hidden = true;
    document.querySelector('#title-error').textContent = '';
  }

  startClock() {
    const updateClock = () => {
      const now = new Date();
      this.clockEl.textContent = new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Jakarta' }).format(now);
      this.dateEl.textContent = this.formatLongDate.format(now);
      const hour = Number(new Intl.DateTimeFormat('id-ID', { hour: '2-digit', hour12: false, timeZone: 'Asia/Jakarta' }).format(now));
      let greeting = 'Selamat malam';
      if (hour < 11) greeting = 'Selamat pagi';
      else if (hour < 15) greeting = 'Selamat siang';
      else if (hour < 18) greeting = 'Selamat sore';
      document.querySelector('#greeting').innerHTML = `${greeting}, kembali<span class="heading-dot">.</span>`;
    };
    updateClock();
    setInterval(updateClock, 1000);
  }

  dateAfter(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
  }

  escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
  }

  weatherDescription(code) {
    if (code === 0) return 'Cerah';
    if ([1, 2].includes(code)) return 'Cerah berawan';
    if (code === 3) return 'Berawan';
    if ([45, 48].includes(code)) return 'Berkabut';
    if ([51, 53, 55, 56, 57].includes(code)) return 'Gerimis';
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'Hujan';
    if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Bersalju';
    if ([95, 96, 99].includes(code)) return 'Badai petir';
    return 'Kondisi terkini';
  }

  weatherIcon(code) {
    if (code === 0) return '☀';
    if ([1, 2, 3, 45, 48].includes(code)) return '☁';
    if ([95, 96, 99].includes(code)) return '⛈';
    if (code >= 51 && code <= 82) return '🌧';
    return '☀';
  }
}

// ===== Jalankan aplikasi =====
const app = new DashboardApp();
app.init();
