// Top navigation bar: mobile drawer toggle, brand, and right-side actions.
export default function Navbar() {
  return (
    <nav class="navbar bg-base-300 w-full sticky top-0 z-10">
      <div class="flex-none lg:hidden">
        <label for="admin-drawer" class="btn btn-square btn-ghost" aria-label="open sidebar">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
      </div>
      <div class="flex-1 px-2 text-lg font-bold">solid-admin</div>
      <div class="flex-none gap-2">
        <button class="btn btn-ghost btn-circle" aria-label="notifications">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 1 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9" />
          </svg>
        </button>
        <div class="avatar placeholder">
          <div class="bg-neutral text-neutral-content w-9 rounded-full">
            <span class="text-sm">SA</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
